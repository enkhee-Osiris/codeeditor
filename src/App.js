import React from "react";

import { EditorSpring } from "@code-hike/mini-editor";
import theme from "shiki/themes/one-dark-pro.json";
// import { highlight } from "@code-hike/highlighter";

import { highlight } from "./utils";

import "@code-hike/mini-editor/dist/index.css";

const moreCode = `
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
`.trim();
const evenMoreCode = `
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
`.trim();

function App() {
  return (
    <div>
      <EditorTest code="console.log(1)" contentHeight={true} />
      <EditorTest code={moreCode} contentHeight={true} />
      <EditorTest code={evenMoreCode} contentHeight={true} />
    </div>
  );
}

function EditorTest({
  code: inputCode,
  lang = "js",
  focus = "",
  annotations = [],
  style,
  ...rest
}) {
  const [code, setCode] = React.useState(null);

  React.useEffect(() => {
    highlight({
      code: inputCode,
      lang,
      theme,
    }).then((code) => setCode(code));
  }, [inputCode]);

  const step = {
    files: [
      {
        name: "index.js",
        code,
        focus,
        annotations,
      },
    ],
    northPanel: {
      tabs: ["index.js"],
      active: "index.js",
      heightRatio: 1,
    },
  };
  return code ? (
    <EditorSpring
      {...step}
      codeConfig={{ theme }}
      frameProps={{}}
      style={style}
      {...rest}
    />
  ) : (
    <div style={style}>"Loading..."</div>
  );
}

export default App;
