import React from "react";
import { Editor, Transforms, Point, Path, Range, Node } from "slate";
import { ReactEditor, useEditor, useSelected } from "slate-react";
import { ElementProps } from "./Element";
import TeX from "@matejmazur/react-katex";

export type OnEditMath = React.Dispatch<
  React.SetStateAction<
    | {
        path: Path;
        code: string;
        block: boolean;
      }
    | {
        range: Range | null;
        code: undefined;
        block: boolean;
      }
    | undefined
  >
>;

export const withMath = <T extends Editor>(editor: T) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: ElementProps["element"]) => {
    return element.type === "math" && element.block === false
      ? true
      : isInline(element);
  };

  editor.isVoid = (element: ElementProps["element"]) => {
    return element.type === "math" ? true : isVoid(element);
  };

  return editor;
};

export const insertMath = (
  editor: Editor,
  code: string,
  block: boolean = false,
  at: Path | Point | Range | undefined = undefined
) => {
  const math = {
    type: "math",
    data: code,
    block,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, math, { at });
  Transforms.move(editor);
};

interface Props {
  data: string;
  attributes: ElementProps["attributes"];
  onEditMath: OnEditMath;
  element: Node;
  block: boolean;
}
const Math: React.FC<Props> = ({
  data,
  attributes,
  children,
  onEditMath,
  element,
  block,
}) => {
  const editor = useEditor();
  const Tag = block ? "div" : "span";
  const selected = useSelected();
  return (
    <Tag {...attributes}>
      <Tag
        contentEditable={false}
        onDoubleClick={() => {
          const path = ReactEditor.findPath(editor, element);
          onEditMath({ code: data, path, block });
        }}
        style={{
          outline: selected ? "2px solid rgba(90, 90, 200, 0.3)" : undefined,
        }}
      >
        <TeX math={data} block={block} />
        {children}
      </Tag>
    </Tag>
  );
};
export default Math;
