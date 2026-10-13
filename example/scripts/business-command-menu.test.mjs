import assert from 'node:assert/strict';
import test from 'node:test';
import { tsImport } from 'tsx/esm/api';

const { commandIndexForKey, commandSelectionIndex, filterCommandEntries } = await tsImport('../src/business/components/command-menu-state.ts', import.meta.url);
const commands = [
  { id: 'tasks', label: '查看任务', category: 'tasks' },
  { id: 'files', label: '查看资料', category: 'files' },
  { id: 'settings', label: '查看设置', category: 'settings' }
];

test('command categories and query intersect while keeping the executable identity', () => {
  assert.deepEqual(filterCommandEntries(commands, '', 'all'), commands);
  assert.deepEqual(filterCommandEntries(commands, '查看', 'files'), [commands[1]]);
  assert.deepEqual(filterCommandEntries(commands, '任务', 'files'), []);
  assert.deepEqual(filterCommandEntries(commands, '  设置  ', 'all'), [commands[2]]);
  assert.equal(filterCommandEntries(commands, '资料', 'files')[0], commands[1]);
  assert.deepEqual(filterCommandEntries(commands, '', 'unknown'), []);
});

test('an empty search or category intersection never produces an executable keyboard selection', () => {
  for (const visible of [filterCommandEntries(commands, '不存在', 'all'), filterCommandEntries(commands, '任务', 'files')]) {
    assert.equal(visible[0], undefined);
    for (const key of ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End']) assert.equal(commandIndexForKey(0, visible.length, key), null);
  }
});

test('command and category keyboard navigation wraps and handles the endpoints', () => {
  assert.equal(commandIndexForKey(2, 3, 'ArrowDown'), 0);
  assert.equal(commandIndexForKey(0, 3, 'ArrowUp'), 2);
  assert.equal(commandIndexForKey(3, 4, 'ArrowRight'), 0);
  assert.equal(commandIndexForKey(0, 4, 'ArrowLeft'), 3);
  assert.equal(commandIndexForKey(2, 4, 'Home'), 0);
  assert.equal(commandIndexForKey(0, 4, 'End'), 3);
  assert.equal(commandIndexForKey(-1, 3, 'ArrowDown'), 0);
  assert.equal(commandIndexForKey(8, 3, 'ArrowUp'), 2);
  assert.equal(commandIndexForKey(0, 1, 'ArrowDown'), 0);
  assert.equal(commandIndexForKey(0, 3, 'Enter'), null);
});

test('a third-command selection resolves to the sole match after an external query or category change', () => {
  assert.equal(commands[commandSelectionIndex(2, commands.length)].id, 'settings');
  for (const visible of [filterCommandEntries(commands, '资料', 'all'), filterCommandEntries(commands, '', 'files')]) {
    const selected = commandSelectionIndex(2, visible.length);
    assert.equal(selected, 0);
    assert.equal(visible[selected].id, 'files');
    assert.equal(visible[selected].label, '查看资料');
    assert.equal(commandIndexForKey(selected, visible.length, 'ArrowDown'), 0);
    assert.equal(commandIndexForKey(selected, visible.length, 'ArrowUp'), 0);
  }
});

test('an empty result has no selection and a recovered result always has a bounded selection', () => {
  const empty = filterCommandEntries(commands, '不存在', 'all');
  assert.equal(commandSelectionIndex(2, empty.length), null);
  for (const staleIndex of [-1, 3, Number.NaN, .5]) assert.equal(commandSelectionIndex(staleIndex, commands.length), 0);
  assert.equal(commandSelectionIndex(0, commands.length), 0);
  assert.equal(commandSelectionIndex(1, commands.length), 1);
  assert.equal(commandSelectionIndex(2, commands.length), 2);
});

test('an unknown controlled category retains a focusable first tab when categories exist', () => {
  const values = ['all', 'tasks', 'files', 'settings'];
  const selected = commandSelectionIndex(values.indexOf('unknown'), values.length);
  assert.equal(selected, 0);
  assert.equal(values[selected], 'all');
  assert.equal(commandSelectionIndex(-1, 0), null);
});
