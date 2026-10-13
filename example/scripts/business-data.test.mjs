import assert from 'node:assert/strict';
import test from 'node:test';
import { tsImport } from 'tsx/esm/api';

const { moveWorkItem, applyWorkItemOrder, workItemKeyboardTarget } = await tsImport('../src/business/components/reorder-work-items.ts', import.meta.url);
const { pagerState } = await tsImport('../src/business/components/pager-state.ts', import.meta.url);
const { selectLocalFiles, LOCAL_FILE_MAX_BYTES } = await tsImport('../src/business/components/local-file-selection.ts', import.meta.url);
const tasks = ['a', 'b', 'c', 'd'].map(id => ({ id, title: id, category: 'task', quantity: 1 }));
const ids = items => items.map(item => item.id);

test('task drag order is a complete permutation that preserves task objects and source order', () => {
  const reordered = applyWorkItemOrder(tasks, ['c', 'a', 'd', 'b']);
  assert.deepEqual(ids(reordered), ['c', 'a', 'd', 'b']);
  assert.equal(reordered[0], tasks[2]);
  assert.equal(reordered[3], tasks[1]);
  assert.deepEqual(ids(tasks), ['a', 'b', 'c', 'd']);
});

test('stale, partial, duplicate or foreign drag orders cannot drop or duplicate a task', () => {
  for (const order of [['a', 'b'], ['a', 'b', 'c', 'x'], ['a', 'b', 'c', 'c'], ['a', 'b', 'c', 'd', 'e']]) {
    assert.equal(applyWorkItemOrder(tasks, order), tasks);
  }
  assert.equal(applyWorkItemOrder(tasks, ids(tasks)), tasks);
});

test('keyboard sorting uses task identity and reaches either end without wrapping', () => {
  let ordered = [...tasks];
  ordered = moveWorkItem(ordered, 'b', workItemKeyboardTarget('End', 1, ordered.length));
  assert.deepEqual(ids(ordered), ['a', 'c', 'd', 'b']);
  ordered = moveWorkItem(ordered, 'b', workItemKeyboardTarget('ArrowUp', 3, ordered.length));
  assert.deepEqual(ids(ordered), ['a', 'c', 'b', 'd']);
  ordered = moveWorkItem(ordered, 'b', workItemKeyboardTarget('Home', 2, ordered.length));
  assert.deepEqual(ids(ordered), ['b', 'a', 'c', 'd']);
  assert.equal(moveWorkItem(ordered, 'b', workItemKeyboardTarget('ArrowUp', 0, ordered.length)), ordered);
  assert.equal(workItemKeyboardTarget('ArrowDown', 3, 4), 3);
  assert.equal(workItemKeyboardTarget('Enter', 1, 4), null);
  assert.equal(workItemKeyboardTarget('Home', 0, 0), null);
});

test('invalid sorting requests preserve data and valid moves do not mutate the input', () => {
  for (const target of [NaN, Infinity, 0.5]) assert.equal(moveWorkItem(tasks, 'a', target), tasks);
  assert.equal(moveWorkItem(tasks, 'unknown', 2), tasks);
  assert.deepEqual(ids(moveWorkItem(tasks, 'a', 99)), ['b', 'c', 'd', 'a']);
  assert.deepEqual(ids(moveWorkItem(tasks, 'd', -99)), ['d', 'a', 'b', 'c']);
  assert.deepEqual(ids(tasks), ['a', 'b', 'c', 'd']);
});

test('pagination includes an empty page and keeps page boundaries within the valid range', () => {
  assert.deepEqual(pagerState(0, 3, 0), { pages: 1, current: 0, pageSize: 3, total: 0, start: 0, end: 0, first: 0, pageNumbers: [0] });
  assert.deepEqual(pagerState(0, 2, 6), { pages: 3, current: 0, pageSize: 2, total: 6, start: 0, end: 2, first: 1, pageNumbers: [0, 1, 2] });
  assert.equal(pagerState(99, 2, 6).current, 2);
  assert.equal(pagerState(-1, 2, 6).current, 0);
  assert.equal(pagerState(2, 3, 6).current, 1);
});

test('out-of-range DIY page selects the same last records and page bounds in content and Pager', () => {
  const records = ['a', 'b', 'c', 'd', 'e', 'f'];
  for (const size of [2, 3]) {
    const page = pagerState(99, size, records.length);
    assert.equal(page.current, page.pages - 1);
    assert.deepEqual(records.slice(page.start, page.end), records.slice(-size));
    assert.equal(page.first, records.length - size + 1);
    assert.equal(page.end, records.length);
    assert.deepEqual(pagerState(page.current, page.pageSize, page.total), page);
  }
});

test('zero or invalid DIY capacity has a valid content range and idempotent normalized controls', () => {
  const records = ['a', 'b', 'c', 'd', 'e', 'f'];
  for (const size of [0, -2, NaN, Infinity]) {
    const page = pagerState(99, size, records.length);
    assert.equal(page.pageSize, 1);
    assert.deepEqual(records.slice(page.start, page.end), ['f']);
    assert.equal(page.first, 6);
    assert.equal(page.end, 6);
    assert.equal(page.current, 5);
    assert.deepEqual(pagerState(page.current, page.pageSize, page.total), page);
  }
  const empty = pagerState(99, 0, 0);
  assert.equal(empty.current, 0);
  assert.equal(empty.first, 0);
  assert.equal(empty.end, 0);
});

test('capacity changes and filtering produce data slices, ranges and Pager bounds from one state', () => {
  const records = ['a', 'b', 'c', 'd', 'e', 'f'];
  const last = pagerState(1, 3, records.length);
  assert.deepEqual(records.slice(last.start, last.end), ['d', 'e', 'f']);
  const reset = pagerState(0, 6, records.length);
  assert.deepEqual(records.slice(reset.start, reset.end), records);
  assert.equal(reset.first, 1);
  assert.equal(reset.end, 6);
  assert.equal(reset.current, 0);
  assert.equal(reset.pages, 1);
  const externalSizeChange = pagerState(last.current, 6, records.length);
  assert.deepEqual(externalSizeChange, reset);
  const filtered = records.filter(id => ['a', 'd'].includes(id));
  const afterFilter = pagerState(last.current, 3, filtered.length);
  assert.equal(afterFilter.current, 0);
  assert.deepEqual(filtered.slice(afterFilter.start, afterFilter.end), ['a', 'd']);
  assert.equal(afterFilter.first, 1);
  assert.equal(afterFilter.end, 2);
  assert.deepEqual(pagerState(afterFilter.current, afterFilter.pageSize, filtered.length), afterFilter);
});

test('large pagination windows stay bounded and include current, first and last pages', () => {
  for (const page of [0, 1, 20, 98, 99]) {
    const { current, pageNumbers } = pagerState(page, 10, 1000);
    assert.ok(pageNumbers.length <= 7);
    assert.ok(pageNumbers.includes(current));
    assert.equal(pageNumbers[0], 0);
    assert.equal(pageNumbers.at(-1), 99);
    assert.equal(new Set(pageNumbers).size, pageNumbers.length);
  }
});

const file = (name, size = 128, type = '', lastModified = 42) => ({ name, size, type, lastModified });

test('local file selection preserves the original image or TXT/CSV rule and the exact 1 MiB boundary', () => {
  const incoming = [file('scan', 5, 'image/png'), file('notes.TXT', LOCAL_FILE_MAX_BYTES), file('data.CSV'), file('large.txt', LOCAL_FILE_MAX_BYTES + 1), file('app.exe'), file('text', 5, 'text/plain')];
  const result = selectLocalFiles([], incoming);
  assert.deepEqual(result.files, incoming.slice(0, 3));
  assert.equal(result.added, 3);
  assert.equal(result.rejected, 3);
});

test('file identity uses name, byte size and modification time, across picker and drop batches', () => {
  const original = file('data.csv');
  const changed = file('data.csv', 128, '', 43);
  const result = selectLocalFiles([original], [file('data.csv'), changed, file('data.csv', 129), changed]);
  assert.equal(result.files[0], original);
  assert.deepEqual(result.files, [original, changed, file('data.csv', 129)]);
  assert.equal(result.added, 2);
  assert.equal(result.duplicates, 2);
});

test('file capacity retains the first five and removing a file makes room for the next batch', () => {
  const incoming = Array.from({ length: 7 }, (_, index) => file(`${index}.txt`));
  const result = selectLocalFiles([], incoming);
  assert.deepEqual(result.files, incoming.slice(0, 5));
  assert.equal(result.added, 5);
  assert.equal(result.overflow, 2);
  const remaining = result.files.filter(item => item !== incoming[2]);
  const next = selectLocalFiles(remaining, [incoming[5]]);
  assert.deepEqual(next.files, [...remaining, incoming[5]]);
  assert.equal(next.added, 1);
  assert.deepEqual(incoming.map(item => item.name), Array.from({ length: 7 }, (_, index) => `${index}.txt`));
});
