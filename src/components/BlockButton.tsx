import React, { ReactElement } from "react";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "../utils/slate-utils";
import { ElementType } from "./Element";
import IconButton from "./IconButton";

interface Props {
  format: ElementType;
  Icon: (props: { size: number }) => ReactElement<any, any> | null;
}
const BlockButton: React.FC<Props> = ({ format, Icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      color={isBlockActive(editor, format) ? "blue" : "inactiveBlue"}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon size={16} />
    </IconButton>
  );
};
export default BlockButton;
