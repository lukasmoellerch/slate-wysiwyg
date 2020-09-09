import "react-app-polyfill/ie11";
import Container from "../src/components/Container";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Node } from "slate";
import Editor from "../src/";
import { css, styled } from "../src/utils/stitches.config";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-coy.css";

css.global({
  body: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji"`,
  },
});

const Header = styled("div", {
  paddingTop: "4rem",
  paddingBottom: "5rem",
  textAlign: "center",
  h1: {
    fontSize: "2.8rem",
    fontWeight: 800,
    marginBottom: "0.4rem",
  },
  h2: {
    fontWeight: 400,
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
  },
});

const doc: Node[] = JSON.parse(
  '[{"type":"heading-1","children":[{"text":"A Large Title"}]},{"type":"heading-2","children":[{"text":"This Heading is a "},{"text":"bit","underline":true},{"text":" smaller"}]},{"type":"numbered-list","children":[{"type":"list-item","children":[{"text":"Monday"}]},{"type":"list-item","children":[{"text":"Tuesday"}]},{"type":"list-item","children":[{"text":"Wednesday"}]},{"type":"list-item","children":[{"text":"Thursday"}]},{"type":"list-item","children":[{"text":"Friday"}]}]},{"type":"paragraph","children":[{"text":"Important equations:"}]},{"type":"bulleted-list","children":[{"type":"list-item","children":[{"text":""},{"type":"math","data":"F = m \\\\cdot a","block":false,"children":[{"text":""}]},{"text":""}]},{"type":"list-item","children":[{"text":""},{"type":"math","data":"W = F \\\\cdot s","block":false,"children":[{"text":""}]},{"text":""}]},{"type":"list-item","children":[{"text":""},{"type":"math","data":"E = m c^2","block":false,"children":[{"text":""}]},{"text":""}]},{"type":"list-item","children":[{"text":"..."}]}]},{"type":"paragraph","children":[{"text":"Dies "},{"text":"ist","underline":true},{"text":" "},{"text":"ein","italic":true},{"text":" "},{"text":"Test","bold":true}]},{"type":"paragraph","children":[{"text":"Beweis 12:","bold":true},{"text":" Sei "},{"type":"math","data":"a = \\\\pi","block":false,"children":[{"text":""}]},{"text":" so ist es offensichtlich, dass gilt:"}]},{"type":"math","data":"2 \\\\cdot a = 2 \\\\cdot \\\\pi","block":true,"children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Damit sei gezeigt, dass Satz 3.2.1 aus dem Skript auch hier angewendet werden kann."}]},{"type":"paragraph","children":[{"text":"Eine "},{"text":"tsconfig.json","code":true},{"text":" Datei:"}]},{"type":"code","data":"{\\n \\"compilerOptions\\": {\\n \\"allowJs\\": true,\\n \\"alwaysStrict\\": true,\\n \\"esModuleInterop\\": true,\\n \\"forceConsistentCasingInFileNames\\": true,\\n \\"isolatedModules\\": true,\\n \\"jsx\\": \\"preserve\\",\\n \\"lib\\": [\\"dom\\", \\"es2017\\"],\\n \\"module\\": \\"esnext\\",\\n \\"moduleResolution\\": \\"node\\",\\n \\"noEmit\\": true,\\n \\"noFallthroughCasesInSwitch\\": true,\\n \\"noUnusedLocals\\": true,\\n \\"noUnusedParameters\\": true,\\n \\"resolveJsonModule\\": true,\\n \\"skipLibCheck\\": true,\\n \\"strict\\": true,\\n \\"target\\": \\"esnext\\"\\n },\\n \\"exclude\\": [\\"node_modules\\"],\\n \\"include\\": [\\"**/*.ts\\", \\"**/*.tsx\\"]\\n}","language":"js","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Java Code:"}]},{"type":"code","data":"public class Main {\\n  public static void main(String[] args) {\\n    System.out.println(\\"Hello World!\\");\\n  }\\n}","language":"java","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]}]'
);

const App = () => {
  const [value, setValue] = useState<Node[]>(doc);

  return (
    <Container>
      <Header>
        <h1>WYSIWYG Editor</h1>
        <h2>
          Based on <a href="https://github.com/ianstormtaylor/slate">Slate</a>
        </h2>
        <small>Double-click on a math / code element to edit it.</small>
      </Header>
      <Editor value={value} setValue={setValue} />
      <div style={{ marginTop: "3rem" }}>
        <code>{JSON.stringify(value)}</code>
      </div>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
