import ArticleHeader from "../ArticleHeader/ArticleHeader";
import ArticleDescription from "../ArticleDescription/ArticleDescription";
import ArticleTag from "../ArticleTag/ArticleTag";
import UserProfile from "../UserProfile/UserProfile";
import PropTypes from "prop-types";

import stl from "./ArticleCard.module.scss";

const ArticleCard = ({
  author,
  createdAt,
  description,
  favoritesCount,
  tagList,
  title,
  slug,
  favorited,
}) => {
  const { username, image } = author;

  return (
    <li className={stl.card}>
      <div className={stl.wrapper}>
        <ArticleHeader
          slug={slug}
          title={title}
          favorited={favorited}
          favoritesCount={favoritesCount}
        />
        <ArticleTag tagList={tagList} />
        <ArticleDescription description={description} />
      </div>
      <UserProfile username={username} image={image} createdAt={createdAt} />
    </li>
  );
};
ArticleCard.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    })
};
export default ArticleCard;