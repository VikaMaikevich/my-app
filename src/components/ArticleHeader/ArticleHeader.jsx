import LikesCounter from "../LikesCounter/LikesCounter";

import { Link } from "react-router-dom";

import stl from "./ArticleHeader.module.scss";

const ArticleHeader = ({ slug, title, favorited, favoritesCount }) => {
  const kitcut = (text, limit) => {
    var description = text.trim();
    if (description.length <= limit) return description;
    var str = description.slice(0, limit);
    var a = str.split(" ");
    a.splice(a.length - 1, 1);
    str = a.join(" ");
    return str + "...";
  };

  return (
    <div className={stl.wrap}>
      <div className={stl.title}>
        <Link to={`/articles/${slug}`} className={stl.nondec}>
          <h5 className={stl.h5}>{kitcut(title, 50)} </h5>
        </Link>
        <LikesCounter
          favorited={favorited}
          favoritesCount={favoritesCount}
          slug={slug}
        />
      </div>
    </div>
  );
};
export default ArticleHeader;
