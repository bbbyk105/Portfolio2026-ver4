/**
 * A deliberately tiny syntax highlighter for the curated snippets in
 * content.ts — not a general tokenizer. It recognises the five things those
 * snippets contain: comments, strings, numbers, keywords, and call names.
 * Anything else passes through untouched. Token colours live in globals.css
 * (.tok-*) and follow the palette Daytona uses in its own code windows.
 */

export type Token = {
  text: string;
  cls?: "kw" | "str" | "com" | "num" | "fn";
};

const KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "return",
  "await",
  "async",
  "func",
  "package",
  "new",
  "export",
  "true",
  "false",
  "nil",
  "null",
  "None",
  "if",
  "else",
  "for",
  "in",
  "type",
  "struct",
]);

/* Order matters: comments and strings win over everything at their start
   position, so a `//` or `#` inside quotes is never seen as a comment. */
const PATTERN =
  /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(.)/g;

export function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  for (const m of line.matchAll(PATTERN)) {
    const [, com, str, num, fn, ident, rest] = m;
    const text = m[0];
    if (com) tokens.push({ text, cls: "com" });
    else if (str) tokens.push({ text, cls: "str" });
    else if (num) tokens.push({ text, cls: "num" });
    else if (fn) tokens.push({ text, cls: "fn" });
    else if (ident)
      tokens.push(KEYWORDS.has(ident) ? { text, cls: "kw" } : { text });
    else tokens.push({ text: rest });
  }
  return tokens;
}
