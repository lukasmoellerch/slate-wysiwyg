import React from "react";
import { Element as SlateElement } from "slate";
import { RenderElementProps } from "slate-react";
import Code, { OnEditCode } from "./Code";
import Math, { OnEditMath } from "./Math";

type Element =
  | {
      type?:
        | "paragraph"
        | "block-quote"
        | "bulleted-list"
        | "heading-1"
        | "heading-2"
        | "heading-3"
        | "heading-4"
        | "list-item"
        | "numbered-list";
    }
  | { type?: "math"; data?: string; block?: boolean }
  | { type?: "code"; data?: string; language?: string };

export type ElementType = Element["type"] & string;

export type ElementProps = RenderElementProps & {
  onEditMath: OnEditMath;
  onEditCode: OnEditCode;
  attributes: {
    "data-slate-node": "element";
    "data-slate-inline"?: true | undefined;
    "data-slate-void"?: true | undefined;
    dir?: "rtl" | undefined;
    ref: any;
  };
  element: SlateElement & Element;
};

const Element: React.FC<ElementProps> = React.memo(
  ({ attributes, children, element, onEditMath, onEditCode }) => {
    if (element.type === undefined) return null;
    switch (element.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;

      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;

      case "heading-1":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-2":
        return <h2 {...attributes}>{children}</h2>;
      case "heading-3":
        return <h3 {...attributes}>{children}</h3>;
      case "heading-4":
        return <h4 {...attributes}>{children}</h4>;

      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;

      case "math":
        return (
          <Math
            element={element}
            attributes={attributes}
            data={element.data ?? ""}
            block={element.block ?? false}
            onEditMath={onEditMath}
          >
            {children}
          </Math>
        );
      case "code":
        return (
          <Code
            element={element}
            attributes={attributes}
            data={element.data ?? ""}
            language={element.language ?? "js"}
            onEditCode={onEditCode}
          >
            {children}
          </Code>
        );

      default:
        return <p {...attributes}>{children}</p>;
    }
  }
);
export default Element;
