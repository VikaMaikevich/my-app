import stl from "./ArticleBody.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ArticleBody = ({ body }) => {
  return (
    <ReactMarkdown className={stl.content} remarkPlugins={[remarkGfm]}>
      {body}
    </ReactMarkdown>
  );
};

export default ArticleBody;

