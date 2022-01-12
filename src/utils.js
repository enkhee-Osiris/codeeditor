import { setCDN, getHighlighter, FontStyle, BUNDLED_LANGUAGES } from "shiki";

const newlineRe = /\r\n|\r|\n/;

export async function highlight({ code, lang, theme }) {
  if (lang === "text") {
    const lines = code ? code.split(newlineRe) : [""];

    return {
      lang,
      lines: lines.map((line) => ({ tokens: [{ content: line, props: {} }] })),
    };
  }

  setCDN("https://unpkg.com/shiki/");
  const highlighter = await getHighlighter({
    theme,
    langs: [BUNDLED_LANGUAGES.find((language) => language.id === "javascript")],
  });

  const tokenizedLines = highlighter.codeToThemedTokens(
    code,
    lang,
    theme.name,
    { includeExplanation: false }
  );

  const lines = tokenizedLines.map((line) => ({
    tokens: line.map((token) => ({
      content: token.content,
      props: { style: getStyle(token) },
    })),
  }));

  const result = { lines, lang };

  console.log(JSON.stringify(result));

  return { lines, lang };
}

const FONT_STYLE_TO_CSS = {
  [FontStyle.NotSet]: {},
  [FontStyle.None]: {},
  [FontStyle.Italic]: { fontStyle: "italic" },
  [FontStyle.Bold]: { fontWeight: "bold" },
  [FontStyle.Underline]: { textDecoration: "underline" },
};

function getStyle(token) {
  const fontStyle = token.fontStyle ? FONT_STYLE_TO_CSS[token.fontStyle] : {};

  return {
    color: token.color,
    ...fontStyle,
  };
}
