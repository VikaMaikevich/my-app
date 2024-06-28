import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { useUpdateAnArticleMutation } from '../../store/postApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import stl from './EditArticlePage.module.scss';

const EditArticlePage = () => {
  const { slug } = useParams();
  const [updateArticle, { isError, error }] = useUpdateAnArticleMutation();
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
    await updateArticle({ body: newArticle, slug: slug }).unwrap();
    navigate(`/articles/${slug}`, { replace: true });
  };
  return (
    <div className={stl.content}>
      <ArticleForm
        formTitle="Edit article"
        slug={slug}
        handleOnSubmit={handleOnSubmit}
        isError={isError}
        error={error}
      />
    </div>
  );
};
export default EditArticlePage;
