import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import postcss from 'postcss';
import { preprocessCSS } from 'vite';

const source = fileURLToPath(new URL('../src/', import.meta.url));

test('merging layout styles retains the button component own CSS namespace', async () => {
  const directory = path.join(source, 'business/components');
  const compile = async name => {
    const filename = path.join(directory, `${name}.module.css`);
    return (await preprocessCSS(await readFile(filename, 'utf8'), filename, {})).modules;
  };
  const [button, layout] = await Promise.all([compile('Button'), compile('DemoLayout')]);
  const merged = { ...button, ...layout };
  assert.ok(button['aw-button']);
  assert.equal(merged['aw-button'], button['aw-button'], 'layout references must not replace the button skin with an unrelated module class');
});

test('business component modules never inject page selectors or universal motion rules', async () => {
  const directory = path.join(source, 'business/components');
  const files = (await readdir(directory)).filter(name => name.endsWith('.module.css'));
  assert.ok(files.length > 0);
  for (const file of files) {
    const css = postcss.parse(await readFile(path.join(directory, file), 'utf8'));
    css.walkRules(rule => {
      if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
      assert.doesNotMatch(rule.selector, /(?:^|[\s,>])(?:html|body|\*)(?:$|[\s,:.>])|:global/, `${file}: ${rule.selector}`);
      assert.match(rule.selector, /\.[\w-]+/, `${file} must target an owned module class`);
    });
  }
});

test('micro demo control skins only style explicitly opted-in native controls', async () => {
  const text = await readFile(path.join(source, 'shared/micro-demos.module.css'), 'utf8');
  assert.doesNotMatch(text, /\.aw-micro-controls\s+(?:button|input|select|label)\b/);
  assert.match(text, /\.aw-micro-action/);
});

test('dropdown reading surfaces use an opaque existing palette token', async () => {
  for (const name of ['DropdownSurface', 'Popover']) {
    const css = postcss.parse(await readFile(path.join(source, `business/components/${name}.module.css`), 'utf8'));
    const backgrounds = [];
    css.walkDecls(/^(background|background-color)$/, declaration => backgrounds.push(declaration.value));
    assert.ok(backgrounds.length > 0);
    assert.ok(backgrounds.every(value => value === 'var(--aw-palette-ivory)'), `${name} must not expose underlying text`);
  }
});
