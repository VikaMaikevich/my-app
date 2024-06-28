import { Statistic, ConfigProvider } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import {
  useFavoriteAnArticleMutation,
  useUnfavoriteAnArticleMutation,
} from '../../store/postApi';

const LikesCounter = ({ favoritesCount, favorited, slug }) => {
  const user = useSelector((state) => state.user.user);
  const [addFavorite] = useFavoriteAnArticleMutation();
  const [addUnfavorite] = useUnfavoriteAnArticleMutation();

  const toggleLike = async () => {
    if (favorited) {
      await addUnfavorite(slug);
    } else {
      await addFavorite(slug);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Statistic: {
            contentFontSize: 16,
            colorText: ' #000000BF',
          },
        },
      }}
    >
      <Statistic
        value={favoritesCount}
        prefix={
          favorited ? (
            <HeartFilled
              style={{ color: 'red' }}
              onClick={user ? toggleLike : undefined}
            />
          ) : (
            <HeartOutlined onClick={user ? toggleLike : undefined} />
          )
        }
      />
    </ConfigProvider>
  );
};
export default LikesCounter;
