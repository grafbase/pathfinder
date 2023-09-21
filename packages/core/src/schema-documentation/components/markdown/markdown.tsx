import ReactMarkdown from "react-markdown";

import { markdownClass } from "./markdown.css";

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div className={markdownClass}>
      <ReactMarkdown
        children={content}
        // transform all links within markdown to open externally
        linkTarget="_blank"
      />
    </div>
  );
};
