import { Editor, Transforms } from "slate";
import { isList } from "./slate-utils";

export const withLayout = <T extends Editor>(editor: T) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      const lastChild = editor.children[editor.children.length - 1];
      if (lastChild === undefined || lastChild.type !== "paragraph") {
        const paragraph = { type: "paragraph", children: [{ text: "" }] };
        Transforms.insertNodes(editor, paragraph, {
          at: path.concat(editor.children.length),
        });
      }
    }

    if (node.type === "list-item") {
      const [parent] = Editor.parent(editor, path);
      const parentType = parent.type as string;
      if (parentType === undefined || !isList(parentType)) {
        Transforms.setNodes(editor, { at: path, type: "paragraph" });
      }
    }

    if (isList(node.type as string)) {
      const children = node.children;
      if (Array.isArray(children)) {
        for (let child of children) {
          console.log(child);
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
