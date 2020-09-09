import React from "react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-java";

interface HighlightProps {
  code: string;
  language: string;
}
const HighlightedCode: React.FC<HighlightProps> = React.memo(
  ({ code, language }) => {
    return (
      <pre
        dangerouslySetInnerHTML={{
          __html: highlight(code, languages[language], language),
        }}
      />
    );
  }
);
export default HighlightedCode;
