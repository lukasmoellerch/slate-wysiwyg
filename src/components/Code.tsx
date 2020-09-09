import React from "react";
import {
  Editor as SlateEditor,
  Node,
  Path,
  Point,
  Range,
  Transforms,
} from "slate";
import { ReactEditor, useEditor, useSelected } from "slate-react";
import { ElementProps } from "./Element";
import HighlightedCode from "./HighlightedCode";

export type OnEditCode = React.Dispatch<
  React.SetStateAction<
    | {
        path: Path;
        code: string;
        language: string;
      }
    | {
        range: Range | null;
        code: undefined;
        language: undefined;
      }
    | undefined
  >
>;

export const withCode = <T extends SlateEditor>(editor: T) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: ElementProps["element"]) => {
    return element.type === "code" ? false : isInline(element);
  };

  editor.isVoid = (element: ElementProps["element"]) => {
    return element.type === "code" ? true : isVoid(element);
  };

  return editor;
};

export const insertCode = (
  editor: SlateEditor,
  code: string,
  language: string,
  at: Path | Point | Range | undefined = undefined
) => {
  const math = {
    type: "code",
    data: code,
    language,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, math, { at });
  Transforms.move(editor);
};

interface Props {
  data: string;
  language: string;
  attributes: ElementProps["attributes"];
  onEditCode: OnEditCode;
  element: Node;
}
const Code: React.FC<Props> = React.memo(
  ({ data, attributes, children, onEditCode, element, language }) => {
    const editor = useEditor();
    const selected = useSelected();
    return (
      <div {...attributes}>
        <div
          contentEditable={false}
          onDoubleClick={() => {
            const path = ReactEditor.findPath(editor, element);
            onEditCode({ code: data, path, language });
          }}
          style={{
            outline: selected ? "2px solid rgba(90, 90, 200, 0.3)" : undefined,
          }}
        >
          <HighlightedCode code={data} language={language} />

          {children}
        </div>
      </div>
    );
  }
);

export default Code;
