import ArticleCard from '../../components/ArticleCard/ArticleCard';
import MyPagination from '../../components/MyPagination/MyPagination';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllArticlesQuery } from '../../store/postApi';
import { useEffect } from 'react';
import { togglePage } from "../../store/reducers/articleSlice";

import stl from './AllArticlesPage.module.scss';

const AllArticlesPage = () => {
  const currentPage = useSelector((state) => state.articles.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      dispatch(togglePage(Number(savedPage)));  // текущая страница
    }
  }, [dispatch]);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetAllArticlesQuery(currentPage * 5 - 5);

  const articles = data?.articles?.map((item) => {
    return <ArticleCard key={item.slug} {...item} />;
  });

  const active = data.articles ? articles : null;
  const spiner = isLoading ? <Loader /> : null;
  const errorMessage = isError ? (
    <Error
      errorMessage={error.data.errors.message}
      errorStatus={error.status}
    />
  ) : null;
  const pagination =
    data?.articlesCount > 5 ? (
      <MyPagination
        articlesCount={data.articlesCount}
        currentPage={currentPage}
      />
    ) : null;
  return (
    <div className={stl.page}>
      <ul className={stl.pageList}>
        {active}
        {spiner}
        {errorMessage}
      </ul>
      {pagination}
    </div>
  );
};
export default AllArticlesPage;
