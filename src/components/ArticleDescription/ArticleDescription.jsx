import stl from "./ArticleDescription.module.scss";

const ArticleDescription = ({ description }) => {
  const kitcut = (text, limit) => {
    var description = text.trim();
    if (description.length <= limit) return description;
    var str = description.slice(0, limit);
    var a = str.split(" ");
    a.splice(a.length - 1, 1);
    str = a.join(" ");
    return str + "...";
  };

  return <p className={stl.text}>{kitcut(description, 250)}</p>;
};

export default ArticleDescription;