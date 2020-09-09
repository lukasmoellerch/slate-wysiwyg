import React, { useCallback, useState } from "react";
import Center from "./Center";
import Modal from "./Modal";
import TeX from "@matejmazur/react-katex";
import Button from "./Button";
import Flex from "./Flex";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-latex";

interface Props {
  initialCode: string | undefined;
  initialBlock: boolean;
  onSubmit: (newCode: string, newBlock: boolean) => void;
  onCancel: () => void;
}
const EditMathModal: React.FC<Props> = ({
  initialCode,
  initialBlock,
  onSubmit,
  onCancel,
}) => {
  const [code, setCode] = useState(initialCode ?? "");
  const [block, setBlock] = useState(initialBlock);
  const ref = useCallback((d: null | { _input: HTMLTextAreaElement }) => {
    if (d === null) return;
    setTimeout(() => {
      d["_input"].focus();
    });
    console.log(d["_input"]);
  }, []);
  return (
    <Modal isOpen>
      <h2 style={{ marginTop: "0.3rem" }}>
        {initialCode ? "Update" : "Insert"} Equation
      </h2>
      <Center style={{ padding: "0.5rem", overflow: "auto" }}>
        {code.length > 0 ? (
          <TeX math={code} block={block} />
        ) : (
          <small style={{ color: "rgba(0,0,0, 0.3)" }}>Equation Preview</small>
        )}
      </Center>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.latex, "latex")}
        padding={12}
        ref={ref as any}
        placeholder="Type LaTeX here."
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />

      <div>
        {initialCode === undefined && (
          <label>
            <input
              type="checkbox"
              checked={block}
              onChange={e => setBlock(e.target.checked)}
            />
            Block Mode
          </label>
        )}
      </div>
      <Flex justifyContent="end">
        <Button color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          color="blue"
          disabled={code.length === 0}
          onClick={() => onSubmit(code, block)}
        >
          {initialCode ? "Update" : "Insert"}
        </Button>
      </Flex>
    </Modal>
  );
};

export default EditMathModal;
