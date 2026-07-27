// ---------------------------------------------------------------------------
// Safe JSON-LD serialization for embedding inside a <script> tag.
//
// `JSON.stringify` does NOT escape `<`, `>`, `&`, or the U+2028/U+2029 line/
// paragraph separators. A value containing the sequence `</script>` would break
// out of the surrounding <script> element and execute as markup — a classic
// stored-XSS sink the moment any embedded value stops being static.
//
// Escaping those characters to their `\uXXXX` forms keeps the payload inert
// while remaining byte-for-byte valid JSON that crawlers parse identically.
// Use this everywhere structured data is rendered via dangerouslySetInnerHTML.
// ---------------------------------------------------------------------------

// U+2028 / U+2029 are referenced by code point (not typed literally) to keep
// this source file pure ASCII — invisible separator chars are easily mangled.
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .split(LINE_SEPARATOR)
    .join("\\u2028")
    .split(PARAGRAPH_SEPARATOR)
    .join("\\u2029");
}
