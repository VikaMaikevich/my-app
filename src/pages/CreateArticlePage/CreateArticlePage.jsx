import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { useCreateAnArticleMutation } from '../../store/postApi';
import { useNavigate } from 'react-router-dom';
import stl from './CreateArticlePage.module.scss';

const CreateArticlePage = () => {
  const [addArticle, { isError, error }] = useCreateAnArticleMutation();
  const navigate = useNavigate();
  const handleOnSubmit = async (data) => {
    const newArticle = {
      article: {
        tagList: data?.tags?.map((item) => item.name),
        body: data.body,
        description: data.description,
        title: data.title,
      },
    };
    await addArticle(newArticle).unwrap();
    navigate('/', { replace: true });
  };
  return (
    <div className={stl.content}>
      <ArticleForm
        formTitle="Create new article"
        handleOnSubmit={handleOnSubmit}
        error={error}
        isError={isError}
      />
    </div>
  );
};
export default CreateArticlePage;
