import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import ArticleDescription from '../../components/ArticleDescription/ArticleDescription';
import ArticleTag from '../../components/ArticleTag/ArticleTag';
import ArticleBody from '../../components/ArticleBody/ArticleBody';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useParams, Link } from 'react-router-dom';
import {
  useGetAnArticleQuery,
  useDeleteAnArticleMutation,
} from '../../store/postApi';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { useSelector } from 'react-redux';
import stl from './ArticlePage.module.scss';
import MyButton from '../../components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import { Popconfirm, message } from 'antd';

const ArticlePage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useGetAnArticleQuery(slug);
  const [deleteAnArticle] = useDeleteAnArticleMutation(slug);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const confirm = async () => {
    await deleteAnArticle(slug);
    navigate('/', { replace: true });
    message.success('The article was successfully deleted');
  };

  const active = !data?.article ? null : (
    <li className={stl.card}>
      <div className={stl.wrapper}>
        <ArticleHeader
          slug={slug}
          title={data.article.title}
          favorited={data.article.favorited}
          favoritesCount={data.article.favoritesCount}
          author={data.article.author}
        />
        <ArticleTag tagList={data.article.tagList} />
        <ArticleDescription description={data.article.description} />
        <ArticleBody body={data.article.body} />
      </div>
      {user?.username === data.article.author.username ? (
        <div className={stl.userWrapper}>
          <UserProfile
            username={data.article.author.username}
            createdAt={data.article.createdAt}
            image={data.article.author.image}
          />
          <div className={stl.btnWrapper}>
            <Popconfirm
              title="Are you sure to delete this article?"
              style={{
                width: '240px',
              }}
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
              placement="rightTop"
            >
              <MyButton
                children="Delete"
                size="small"
                type="default"
                color="#F5222D"
                style={{ padding: '0 19px' }}
              />
            </Popconfirm>

            <Link to={`/articles/${slug}/edit`}>
              <MyButton
                children="Edit"
                size="small"
                type="default"
                color="#52C41A"
                style={{ padding: '0 19px' }}
              />
            </Link>
          </div>
        </div>
      ) : (
        <UserProfile
          username={data.article.author.username}
          createdAt={data.article.createdAt}
          image={data.article.author.image}
        />
      )}
    </li>
  );
  const spiner = isLoading ? <Loader /> : null;
  const errorMessage = isError ? (
    <Error
      errorMessage={error.data.errors?.message || 'unknown error'}
      errorStatus={error.status || error.originalStatus}
    />
  ) : null;

  return (
    <div className={stl.content}>
      {active}
      {spiner}
      {errorMessage}
    </div>
  );
};
export default ArticlePage;
