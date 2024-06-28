import stl from "./ArticleTitle.module.scss";

const ArticleTitle = ({ title = "Do not have a title" }) => {
  return <h5 className={stl.h5}>{title.trim()} </h5>;
};

export default ArticleTitle;