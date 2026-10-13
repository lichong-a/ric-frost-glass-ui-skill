import assert from 'node:assert/strict';
import test from 'node:test';
import { tsImport } from 'tsx/esm/api';

const { parseCalendarDate, calendarDateValue, moveCalendarDays, moveCalendarMonths, calendarMonthDays, constrainCalendarDate, isCalendarDateDisabled } = await tsImport('../src/business/date-utils.ts', import.meta.url);
const parse = value => {
  const date = parseCalendarDate(value);
  assert.ok(date, `Expected a valid calendar date: ${value}`);
  return date;
};

test('calendar rejects malformed and impossible dates, including non-leap February', () => {
  for (const value of ['', '2026-2-01', '2026-02-29', '2026-04-31', '2026-13-01', '2026-00-01', '2026-01-00', '2026-10-12T00:00:00Z']) assert.equal(parseCalendarDate(value), null);
  assert.equal(calendarDateValue(parse('2024-02-29')), '2024-02-29');
});

test('calendar round-trips civil dates and preserves years below 100', () => {
  for (const value of ['0099-10-12', '2026-10-12', '2024-02-29', '2026-12-31']) assert.equal(calendarDateValue(parse(value)), value);
});

test('keyboard day movement crosses month and year boundaries without UTC shifts', () => {
  assert.equal(calendarDateValue(moveCalendarDays(parse('2026-12-31'), 1)), '2027-01-01');
  assert.equal(calendarDateValue(moveCalendarDays(parse('2024-03-01'), -1)), '2024-02-29');
  const original = parse('2026-10-12');
  moveCalendarDays(original, 7);
  assert.equal(calendarDateValue(original), '2026-10-12');
});

test('month navigation clamps the day instead of spilling into another month', () => {
  assert.equal(calendarDateValue(moveCalendarMonths(parse('2026-01-31'), 1)), '2026-02-28');
  assert.equal(calendarDateValue(moveCalendarMonths(parse('2024-03-31'), -1)), '2024-02-29');
  assert.equal(calendarDateValue(moveCalendarMonths(parse('2024-02-29'), 12)), '2025-02-28');
});

test('calendar has six complete Monday-first weeks, including adjacent months', () => {
  const dates = calendarMonthDays(parse('2026-10-12'));
  assert.equal(dates.length, 42);
  assert.equal(dates[0].getDay(), 1);
  assert.equal(calendarDateValue(dates[0]), '2026-09-28');
  assert.equal(calendarDateValue(dates.at(-1)), '2026-11-08');
  assert.equal(new Set(dates.map(calendarDateValue)).size, 42);
});

test('date range constraints include the endpoints and clamp keyboard navigation', () => {
  assert.equal(isCalendarDateDisabled('2026-10-11', '2026-10-12', '2026-10-19'), true);
  assert.equal(isCalendarDateDisabled('2026-10-12', '2026-10-12', '2026-10-19'), false);
  assert.equal(isCalendarDateDisabled('2026-10-19', '2026-10-12', '2026-10-19'), false);
  assert.equal(isCalendarDateDisabled('2026-10-20', '2026-10-12', '2026-10-19'), true);
  assert.equal(calendarDateValue(constrainCalendarDate(parse('2026-10-01'), '2026-10-12')), '2026-10-12');
  assert.equal(calendarDateValue(constrainCalendarDate(parse('2026-11-01'), undefined, '2026-10-19')), '2026-10-19');
});
