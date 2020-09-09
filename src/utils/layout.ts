import { Editor, Node, Path, Transforms } from "slate";
import { isList } from "./slate-utils";

/**
 * Ensures that there is always a paragraph element at the end of the document
 * because otherwise a custom node such as a math or code node at the end of the
 * document cannot be removed because there is no cursor position
 * @param editor An Editor instance
 * @param _node The node that should be normalized (Currently unused)
 * @param path The path at which node was found
 */
function normalizeTopLevel(editor: Editor, _node: Node, path: Path) {
  if (path.length === 0) {
    const lastChild = editor.children[editor.children.length - 1];
    if (lastChild === undefined || lastChild.type !== "paragraph") {
      const paragraph = { type: "paragraph", children: [{ text: "" }] };
      Transforms.insertNodes(editor, paragraph, {
        at: path.concat(editor.children.length),
      });
    }
  }
}

/**
 * Ensures that the document follows two invariants:
 * - All list-items are direct descendants of a list type (tested using `isList`)
 * - Lists only have `list-items` as children
 * If the invariant doesn't hold this function will fix the mistake using an Editor
 * transform.
 * @param editor An Editor instance
 * @param node The node that should be normalized
 * @param path The path at which node was found
 */
function normalizeLists(editor: Editor, node: Node, path: Path) {
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
      let i = 0;
      for (let child of children) {
        if (child.type !== "list-item") {
          const element = { type: "list-item", children: [] };
          Transforms.wrapNodes(editor, element, { at: [...path, i] });
        }
        i++;
      }
    }
  }
}

export const withLayout = <T extends Editor>(editor: T) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    normalizeTopLevel(editor, node, path);
    normalizeLists(editor, node, path);

    return normalizeNode([node, path]);
  };

  return editor;
};
