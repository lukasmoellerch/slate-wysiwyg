import React, { useCallback, useMemo, useState } from "react";
import {
  Bold,
  Code,
  DollarSign,
  Hash,
  Italic,
  List,
  Menu,
  Underline,
} from "react-feather";
import {
  createEditor,
  Editor as SlateEditor,
  Node,
  Path,
  Range,
  Transforms,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import { isHeadingHotkey } from "../utils/hotkey-utils";
import { withLayout } from "../utils/layout";
import { arraysEqual } from "../utils/path-utils";
import {
  isBlockActive,
  isList,
  toggleBlock,
  toggleMark,
} from "../utils/slate-utils";
import BlockButton from "./BlockButton";
import { insertCode, withCode } from "./Code";
import EditableContainer from "./EditableContainer";
import EditCodeModal from "./EditCodeModal";
import EditMathModal from "./EditMathModal";
import EditorContainer from "./EditorContainer";
import Element from "./Element";
import Flex from "./Flex";
import Leaf, { LeafProps } from "./Leaf";
import MarkButton from "./MarkButton";
import { insertMath, withMath } from "./Math";
import Toolbar, { ToolbarButton, ToolbarDivider } from "./Toolbar";

type MathEditing =
  | {
      path: Path;
      code: string;
      block: boolean;
    }
  | {
      range: Range | null;
      code: undefined;
      block: boolean;
    };

type CodeEditing =
  | {
      path: Path;
      code: string;
      language: string;
    }
  | {
      range: Range | null;
      code: undefined;
      language: undefined;
    };

const H1: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ fontSize: size, display: "inline-flex" }}>
    <Hash size={size} />1
  </span>
);
const H2: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ fontSize: size, display: "inline-flex" }}>
    <Hash size={size} />2
  </span>
);
const H3: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ fontSize: size, display: "inline-flex" }}>
    <Hash size={size} />3
  </span>
);
const H4: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ fontSize: size, display: "inline-flex" }}>
    <Hash size={size} />4
  </span>
);

interface Props {
  value: Node[];
  setValue: (newValue: Node[]) => void;
}

const Editor: React.FC<Props> = ({ value, setValue }) => {
  const editor = useMemo(
    () =>
      withHistory(withLayout(withCode(withMath(withReact(createEditor()))))),
    []
  );
  const [editingMath, setEditingMath] = useState<MathEditing | undefined>();
  const [editingCode, setEditingCode] = useState<CodeEditing | undefined>();

  const renderElement = useCallback(
    (props: RenderElementProps) => (
      <Element
        {...props}
        onEditMath={setEditingMath}
        onEditCode={setEditingCode}
      />
    ),
    []
  );
  const renderLeaf = useCallback((props: LeafProps) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Toolbar>
        <Flex direction="row" alignItems="baseline">
          <BlockButton format="heading-1" Icon={H1} />
          <BlockButton format="heading-2" Icon={H2} />
          <BlockButton format="heading-3" Icon={H3} />
          <BlockButton format="heading-4" Icon={H4} />
          <BlockButton format="bulleted-list" Icon={Menu} />
          <BlockButton format="numbered-list" Icon={List} />
        </Flex>
        <Flex direction="row" alignItems="baseline">
          <ToolbarDivider style={{ height: 16 }} />
          <MarkButton format="bold" Icon={Bold} />
          <MarkButton format="code" Icon={Code} />
          <MarkButton format="italic" Icon={Italic} />
          <MarkButton format="underline" Icon={Underline} />
        </Flex>
        <Flex direction="row" alignItems="baseline">
          <ToolbarDivider style={{ height: 16 }} />
          <ToolbarButton
            color="inactiveBlue"
            onMouseDown={() => {
              setEditingMath({
                code: undefined,
                range: editor.selection,
                block: false,
              });
            }}
          >
            <DollarSign size={16} />
          </ToolbarButton>
          <ToolbarButton
            color="inactiveBlue"
            onMouseDown={() => {
              setEditingCode({
                code: undefined,
                language: undefined,
                range: editor.selection,
              });
            }}
          >
            <Code size={16} />
          </ToolbarButton>
        </Flex>
      </Toolbar>
      <EditorContainer>
        <EditableContainer>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={e => {
              if (
                e.key === "Enter" &&
                editor.selection &&
                arraysEqual(
                  editor.selection.anchor.path,
                  editor.selection.focus.path
                ) &&
                editor.selection.anchor.offset === 0 &&
                editor.selection.anchor.offset === editor.selection.focus.offset
              ) {
                const point = editor.selection.anchor;
                const levels = SlateEditor.levels(editor, {
                  at: point,
                  reverse: true,
                });
                let listItemContent: Node | undefined = undefined;
                let emptyListItem: Path | undefined = undefined;
                for (let level of levels) {
                  const [node, path] = level;
                  const nodeType = node.type as string;
                  if (
                    emptyListItem === undefined &&
                    SlateEditor.isBlock(editor, node) &&
                    node.type === "list-item" &&
                    SlateEditor.isEmpty(editor, node)
                  ) {
                    emptyListItem = path;
                    listItemContent = node;
                  } else if (
                    listItemContent !== undefined &&
                    emptyListItem !== undefined &&
                    SlateEditor.isBlock(editor, node) &&
                    isList(nodeType)
                  ) {
                    toggleBlock(editor, nodeType);
                    e.preventDefault();
                  }
                }
              } else if (e.metaKey && e.key === "b") {
                toggleMark(editor, "bold");
                e.preventDefault();
              } else if (e.metaKey && e.key === "i") {
                toggleMark(editor, "italic");
                e.preventDefault();
              } else if (e.metaKey && e.key === "u") {
                toggleMark(editor, "underline");
                e.preventDefault();
              } else if (e.key === "#") {
                if (isHeadingHotkey(editor, "paragraph")) {
                  toggleBlock(editor, "heading-1");
                  e.preventDefault();
                } else if (isHeadingHotkey(editor, "heading-1")) {
                  toggleBlock(editor, "heading-2");
                  e.preventDefault();
                } else if (isHeadingHotkey(editor, "heading-2")) {
                  toggleBlock(editor, "heading-3");
                  e.preventDefault();
                } else if (isHeadingHotkey(editor, "heading-3")) {
                  toggleBlock(editor, "heading-4");
                  e.preventDefault();
                }
              } else if (e.key === "Enter") {
                const paragraph = {
                  type: "paragraph",
                  children: [{ text: "" }],
                };
                if (
                  isBlockActive(editor, "heading-1") ||
                  isBlockActive(editor, "heading-2") ||
                  isBlockActive(editor, "heading-3") ||
                  isBlockActive(editor, "heading-4")
                ) {
                  Transforms.insertNodes(editor, paragraph);
                  e.preventDefault();
                } else if (isBlockActive(editor, "paragraph")) {
                  const [match] = SlateEditor.nodes(editor, {
                    match: n => n.type === "paragraph",
                  });
                  const text = SlateEditor.string(editor, match[1]);
                  if (text.startsWith("- ")) {
                    toggleBlock(editor, "bulleted-list");
                  }
                  console.log(text);
                }
              }
            }}
          />
        </EditableContainer>
      </EditorContainer>

      {editingMath && (
        <EditMathModal
          initialCode={editingMath.code}
          initialBlock={editingMath.block}
          onCancel={() => setEditingMath(undefined)}
          onSubmit={(newCode, newBlock) => {
            if (editingMath.code !== undefined) {
              Transforms.setNodes(
                editor,
                { data: newCode },
                { at: editingMath.path }
              );
            } else {
              insertMath(
                editor,
                newCode,
                newBlock,
                editingMath.range ?? undefined
              );
            }
            setEditingMath(undefined);
          }}
        />
      )}

      {editingCode && (
        <EditCodeModal
          initialCode={editingCode.code}
          initialLanguage={editingCode.language}
          onCancel={() => setEditingCode(undefined)}
          onSubmit={(newCode, newLanguage) => {
            if (editingCode.code !== undefined) {
              Transforms.setNodes(
                editor,
                { data: newCode, language: newLanguage },
                { at: editingCode.path }
              );
            } else {
              insertCode(
                editor,
                newCode,
                newLanguage,
                editingCode.range ?? undefined
              );
            }
            setEditingCode(undefined);
          }}
        />
      )}
    </Slate>
  );
};

export default Editor;
