import ReactMarkdown from 'react-markdown';

import { markdownClass } from './markdown.css';

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div className={markdownClass}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
