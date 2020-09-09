import React, { ReactElement } from "react";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "../utils/slate-utils";
import IconButton from "./IconButton";
import { LeafProps } from "./Leaf";

interface Props {
  format: keyof LeafProps["leaf"];
  Icon: (props: { size: number }) => ReactElement<any, any> | null;
}
const MarkButton: React.FC<Props> = ({ format, Icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      color={isMarkActive(editor, format) ? "blue" : "inactiveBlue"}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon size={16} />
    </IconButton>
  );
};
export default MarkButton;
