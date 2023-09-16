import ReactMarkdown from "react-markdown";

import { markdownClass } from "./markdown.css";

export const Markdown = ({
  content,
  showSummary = false,
}: {
  content: string;
  showSummary?: boolean;
}) => {
  return (
    <div
      className={markdownClass({
        showSummary,
      })}
    >
      <ReactMarkdown
        children={content}
        // transform all links within markdown to open externally
        linkTarget="_blank"
      />
    </div>
  );
};
