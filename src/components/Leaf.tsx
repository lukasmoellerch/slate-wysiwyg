import React from "react";
import { RenderLeafProps } from "slate-react";

export interface LeafProps extends RenderLeafProps {
  attributes: { "data-slate-leaf": true };
  leaf: {
    text: string;
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}
const Leaf: React.FC<LeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;
