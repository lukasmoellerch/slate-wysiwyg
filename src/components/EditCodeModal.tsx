import { highlight, languages } from "prismjs";
import "prismjs/components/prism-latex";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Button from "./Button";
import Flex from "./Flex";
import Modal from "./Modal";
import "prismjs/components/prism-java";

interface Props {
  initialCode: string | undefined;
  initialLanguage: string | undefined;
  onSubmit: (newCode: string, newLanguage: string) => void;
  onCancel: () => void;
}
const EditCodeModal: React.FC<Props> = ({
  initialCode,
  initialLanguage,
  onSubmit,
  onCancel,
}) => {
  const [code, setCode] = useState(initialCode ?? "");
  const [language, setLanguage] = useState(initialLanguage ?? "js");
  return (
    <Modal isOpen>
      <h2 style={{ marginTop: "0.3rem" }}>
        {initialCode ? "Update" : "Insert"} Code
      </h2>
      {"Language: "}
      <select onChange={e => setLanguage(e.target.value)} value={language}>
        {Object.keys(languages).map(name => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages[language], language)}
        padding={12}
        placeholder={'console.log("Hello World!");'}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />
      <Flex justifyContent="end">
        <Button color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          color="blue"
          disabled={code.length === 0}
          onClick={() => onSubmit(code, language)}
        >
          {initialCode ? "Update" : "Insert"}
        </Button>
      </Flex>
    </Modal>
  );
};

export default EditCodeModal;
