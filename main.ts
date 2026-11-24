import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line for Two Days of Excuses: one line, max 200 characters.
const line =
  "Day 1: I was going to finish the report. Day 2: I was still going to finish the report. Technically, the plan never changed.";

// The grader mounts the repo read-only, so everything goes to the
// output directory it provides and nothing is written next to this file.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it back and make sure the file holds exactly the line, byte for byte:
// no trailing newline, no extra whitespace, nothing added or dropped.
const written = readFileSync(target);
const expected = Buffer.from(line, "utf8");
if (!written.equals(expected)) {
  throw new Error(
    `entry.txt mismatch: got ${written.length} bytes, expected ${expected.length} bytes`,
  );
}
if (written.length === 0 || written[written.length - 1] === 0x0a) {
  throw new Error("entry.txt must not end with a newline");
}
console.log(`Wrote entry.txt (${line.length} characters, ${expected.length} bytes) to ${outDir}`);
