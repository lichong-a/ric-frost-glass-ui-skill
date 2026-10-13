/** Wait for an observed state with a monotonic time bound, independent of scheduler turn count. */
export async function waitForCondition(condition, { description, timeoutMs = 5000, yieldTurn, now = () => performance.now() }) {
  const deadline = now() + timeoutMs;
  for (;;) {
    if (now() >= deadline) throw new Error(`Timed out after ${timeoutMs} ms waiting for ${description}.`);
    if (condition()) return;
    await yieldTurn();
  }
}
