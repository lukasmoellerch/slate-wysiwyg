import { ElementType } from "../components/Element";
import { Editor, Transforms } from "slate";
import { LeafProps } from "../components/Leaf";

export const LIST_TYPES = ["numbered-list", "bulleted-list"] as const;
export const isList = (format: string): format is typeof LIST_TYPES[number] =>
  LIST_TYPES.includes(format as typeof LIST_TYPES[number]);

export const toggleBlock = (editor: Editor, format: ElementType) => {
  Editor.withoutNormalizing(editor, () => {
    const isActive = isBlockActive(editor, format);

    Transforms.unwrapNodes(editor, {
      match: n => isList(n.type as ElementType),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList(format) ? "list-item" : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  });
};

export const toggleMark = (editor: Editor, format: keyof LeafProps["leaf"]) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: Editor, format: ElementType) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

export const isMarkActive = (
  editor: Editor,
  format: keyof LeafProps["leaf"]
) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
