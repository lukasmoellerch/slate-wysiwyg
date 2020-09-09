import { Editor as SlateEditor } from "slate";
import { ElementType } from "../components/Element";
import { arraysEqual } from "./path-utils";

export const isHeadingHotkey = (editor: SlateEditor, block: ElementType) => {
  const [match] = SlateEditor.nodes(editor, {
    match: n => n.type === block,
  });
  if (match === undefined) return;
  if (
    editor.selection &&
    arraysEqual(editor.selection.anchor.path, editor.selection.focus.path) &&
    editor.selection.anchor.offset === 0 &&
    editor.selection.anchor.offset === editor.selection.focus.offset &&
    editor.selection.anchor.path.slice(match[1].length).every(a => a === 0)
  ) {
    return true;
  }
  return false;
};
