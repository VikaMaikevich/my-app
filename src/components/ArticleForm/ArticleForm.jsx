import MyButton from '../MyButton/MyButton';
import { useForm, useFieldArray } from 'react-hook-form';
import Error from '../Error/Error';
import PropTypes from 'prop-types';
import { useGetAnArticleQuery } from '../../store/postApi';
import stl from './ArticleForm.module.scss';

const ArticleForm = ({ formTitle, slug, handleOnSubmit, isError, error }) => {
  const { data } = useGetAnArticleQuery(slug ? slug : '');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: data?.article?.title || null,
      description: data?.article?.description || null,
      body: data?.article?.body || null,
      tags: data?.article?.tagList
        ? data.article.tagList.map((item) => ({ name: item }))
        : [{}],
    },

    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const errorMessage = isError ? (
    <Error
      errorMessage={error.data.errors.message}
      errorStatus={error.status}
    />
  ) : null;

  const onSubmit = (data) => {
    handleOnSubmit(data);
    reset();
  };

  return (
    <div className={stl.content}>
      {errorMessage}
      {!isError && (
        <div className={stl.wrapper}>
          <h1>{formTitle}</h1>
          <form
            name="articleForm"
            onSubmit={handleSubmit(onSubmit)}
            className={stl.form}
          >
            <label className={stl.label}>
              Title
              <input
                {...register('title', {
                  required: 'The field must be filled in',
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters',
                  },
                  maxLength: { value: 35, message: 'Maximum 35 characters' },
                })}
                placeholder="Title"
                className={
                  !errors?.title ? stl.input : `${stl.input} ${stl.input_error}`
                }
              />
              <div className={stl.error}>
                {errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}
              </div>
            </label>

            <label className={stl.label}>
              Short description
              <input
                {...register('description', {
                  required: 'The field must be filled in',
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters',
                  },
                  maxLength: { value: 250, message: 'Maximum 250 characters' },
                })}
                placeholder="Short description"
                type="text"
                className={
                  !errors?.description
                    ? stl.input
                    : `${stl.input} ${stl.input_error}`
                }
              />
              <div className={stl.error}>
                {errors?.description && (
                  <p>{errors?.description?.message || 'Error!'}</p>
                )}
              </div>
            </label>

            <label className={stl.label}>
              Text
              <textarea
                {...register('body', {
                  required: 'The field must be filled in',
                })}
                placeholder="Text"
                type="text"
                rows={6}
                className={
                  !errors?.body ? stl.input : `${stl.input} ${stl.input_error}`
                }
              />
              <div className={stl.error}>
                {errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}
              </div>
            </label>
            <label className={stl.label}>
              Tags
              <div className={stl.tagsWrapper}>
                <div className={stl.tagInput}>
                  {fields.map((item, index) => (
                    <div className={stl.inputTag} key={item.id}>
                      <input
                        {...register(`tags.${index}.name`, {
                          required: 'The field must be filled in',
                        })}
                        placeholder="Tag"
                        type="text"
                        className={
                          !errors?.tags
                            ? stl.input
                            : `${stl.input} ${stl.input_error}`
                        }
                      />
                      <MyButton
                        children="Delete"
                        type="default"
                        color="#F5222D"
                        onClick={() => remove(index)}
                        style={{ padding: '0 36px' }}
                      />
                    </div>
                  ))}
                </div>
                <MyButton
                  type="default"
                  children="Add tag"
                  color="#1890FF"
                  onClick={() => append({ name: '' })}
                  style={{ padding: '0 36px' }}
                />
              </div>
            </label>
            <MyButton
              desabled={!isValid}
              type="primary"
              children="Send"
              color="#1890FF"
              htmlType="submit"
              style={{ width: '318px' }}
            />
          </form>
        </div>
      )}
    </div>
  );
};
ArticleForm.propTypes = {
  formTitle: PropTypes.string,
  slug: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  isError: PropTypes.bool,
  error: PropTypes.object,
};
export default ArticleForm;
