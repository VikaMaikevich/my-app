import { Tag } from "antd";
import React from "react";

import stl from "./ArticleTag.module.scss";

const ArticleTag = ({ tagList }) => {
  const kitcut = (text, limit = 15) => {
    var description = text.trim();
    if (description.length <= limit && description.length !== 0)
      return description;
    var str = description.slice(0, limit);
    var a = str.split(" ");
    a.splice(a.length - 1, 1);
    str = a.join(" ");
    return str + "...";
  };

  const elements = tagList.map((tag, i) => {
    return (
      <Tag className={stl.tag} key={`${kitcut(tag)} ${i}`}>
        {kitcut(tag)}
      </Tag>
    );
  });
  return <div className={stl.tag}>{elements}</div>;
};

export default ArticleTag;