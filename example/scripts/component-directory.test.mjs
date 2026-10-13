import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { createComponentDirectory, loadComponentDirectory, validateDirectorySources, componentMetadataFor, demoPathFor, categoryCountsFor, relativeModuleSpecifier, demoIdentityFromBuildSource, isAllowedRootSharedName } from './component-directory.mjs';

const root = new URL('../', import.meta.url);
const metadata = JSON.parse(await readFile(new URL('catalog/use-categories.json', root), 'utf8'));
const effects = JSON.parse(await readFile(new URL('catalog/upstream-manifest.json', root), 'utf8')).components;
const business = JSON.parse(await readFile(new URL('catalog/business-catalog.json', root), 'utf8')).components;
const directory = await loadComponentDirectory(root);

test('all 303 source identities have exactly one functional category and retain their providers', () => {
  validateDirectorySources(directory, effects, business);
  assert.equal(directory.total, 303);
  assert.equal(directory.byId.size, 303);
  assert.equal(directory.categories.length, 13);
  assert.equal(directory.components.filter(component => component.provider === 'react-bits').length, 215);
  assert.equal(directory.components.filter(component => component.provider === 'business').length, 88);
  assert.equal(categoryCountsFor(directory).reduce((count, category) => count + category.count, 0), 303);
  assert.ok(categoryCountsFor(directory).every(category => category.count > 0));
  for (const component of directory.components) {
    assert.ok(component.tags.includes(component.sourceCategory));
    assert.ok(component.tags.includes(component.provider));
    assert.match(demoPathFor(directory, component.id), new RegExp(`/demos/${component.category}/${component.id}\\.tsx$`));
  }
});

test('media alternatives share one category and same-name carousels remain distinguishable', () => {
  for (const id of ['carousel', 'circular-carousel', 'flex-carousel', 'depth-carousel', 'morph-slider', 'circular-gallery', 'accordion-gallery', 'dome-gallery', 'masonry', 'flying-posters', 'business-carousel', 'business-gallery', 'business-compare']) assert.equal(componentMetadataFor(directory, id).category, 'media', id);
  assert.equal(componentMetadataFor(directory, 'carousel').name, 'Carousel · React Bits');
  assert.equal(componentMetadataFor(directory, 'business-carousel').name, 'Carousel · 基础轮播');
  assert.equal(componentMetadataFor(directory, 'carousel').sourceName, 'Carousel');
  assert.equal(componentMetadataFor(directory, 'business-carousel').sourceName, 'Carousel');
  for (const id of ['branched-menu', 'bubble-menu', 'staggered-menu', 'flowing-menu', 'infinite-menu', 'business-menu', 'business-contextmenu', 'business-commandmenu']) assert.equal(componentMetadataFor(directory, id).category, 'navigation', id);
});

test('source categories and micro/component labels remain available after regrouping', () => {
  assert.equal(componentMetadataFor(directory, 'glide-select').sourceCategory, 'micro');
  assert.ok(componentMetadataFor(directory, 'glide-select').tags.includes('微交互'));
  assert.equal(componentMetadataFor(directory, 'carousel').sourceCategory, 'components');
  assert.ok(componentMetadataFor(directory, 'carousel').tags.includes('组合组件'));
  assert.equal(componentMetadataFor(directory, 'business-carousel').sourceCategory, 'business-media');
});

test('duplicate, missing, unknown or reassigned identities fail instead of changing coverage', () => {
  const duplicate = structuredClone(metadata);
  duplicate.components.push(duplicate.components[0]);
  duplicate.total++;
  assert.throws(() => createComponentDirectory(duplicate), /duplicate component identity/);
  const missing = structuredClone(metadata);
  missing.components.pop(); missing.total--;
  assert.throws(() => validateDirectorySources(createComponentDirectory(missing), effects, business), /Missing functional category assignment/);
  const extra = structuredClone(metadata);
  extra.components.push({ ...extra.components[0], id: 'unlisted-component' }); extra.total++;
  assert.throws(() => validateDirectorySources(createComponentDirectory(extra), effects, business), /unknown source identity/);
  const reassigned = structuredClone(metadata);
  reassigned.components[0].provider = 'business'; reassigned.components[0].tags.push('business');
  assert.throws(() => validateDirectorySources(createComponentDirectory(reassigned), effects, business), /provider differs/);
  const invalidCategory = structuredClone(metadata);
  invalidCategory.components[0].category = 'invented';
  assert.throws(() => createComponentDirectory(invalidCategory), /Unknown functional category/);
});

test('provider subset counts and generated module paths use the same assignments', () => {
  assert.equal(categoryCountsFor(directory, effects.map(component => component.slug)).reduce((count, category) => count + category.count, 0), 215);
  assert.equal(categoryCountsFor(directory, business.map(component => component.id)).reduce((count, category) => count + category.count, 0), 88);
  assert.equal(relativeModuleSpecifier('src/demo-loaders.ts', demoPathFor(directory, 'carousel')), './demos/media/carousel');
  assert.equal(relativeModuleSpecifier('src/business/demo-loaders.generated.ts', demoPathFor(directory, 'business-carousel')), './demos/media/business-carousel');
  assert.throws(() => demoPathFor(directory, '../unknown'), /Missing/);
  assert.throws(() => categoryCountsFor(directory, ['carousel', 'carousel']), /Duplicate category count/);
});

test('the emitted real module and raw source are separate recursive build identities', () => {
  const real = demoIdentityFromBuildSource(directory, 'src/demos/media/carousel.tsx');
  const raw = demoIdentityFromBuildSource(directory, 'src/demos/media/carousel.tsx?raw');
  assert.equal(real.id, 'carousel'); assert.equal(real.kind, 'real');
  assert.equal(raw.id, 'carousel'); assert.equal(raw.kind, 'usage');
  assert.equal(real.actualPath, real.expectedPath);
  const legacy = demoIdentityFromBuildSource(directory, 'src/demos/carousel.tsx?raw');
  assert.notEqual(legacy.actualPath, legacy.expectedPath);
  const wrong = demoIdentityFromBuildSource(directory, 'src/demos/cards/carousel.tsx');
  assert.notEqual(wrong.actualPath, wrong.expectedPath);
  assert.equal(demoIdentityFromBuildSource(directory, 'src/shared/helper.tsx'), null);
  assert.equal(demoIdentityFromBuildSource(directory, 'src/business/demos/media/business-carousel.tsx?raw').provider, 'business');
});

test('new root helpers do not permit eager parameter panels, definitions or effect libraries', () => {
  for (const name of ['gallery-catalog', 'validation', 'usage', 'load', 'DemoConfig', 'assets']) assert.equal(isAllowedRootSharedName(name), true, name);
  for (const name of ['ParametersPanel', 'spring-check', 'business-button', 'gsap', 'three', 'ogl', 'definitions', 'morph-slider']) assert.equal(isAllowedRootSharedName(name), false, name);
});

test('the lightweight demo status context may be shared without permitting GPU effects', () => {
  assert.equal(isAllowedRootSharedName('DemoStatus'), true);
  for (const name of ['backend', 'canvas-loop', 'aero-canvas', 'shape-canvas', 'useWebGPUCompatibility', 'vgpu']) {
    assert.equal(isAllowedRootSharedName(name), false, name);
  }
});
