import { togglePage } from "../../store/reducers/articleSlice";
import { Pagination, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";

const MyPagination = ({ articlesCount, currentPage }) => {
  const dispatch = useDispatch();

  const onChange = (page) => {
    dispatch(togglePage(page));
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: "#1890FF",
            colorPrimary: "#fff",
            colorPrimaryHover: "#fff",
            itemSize: 22,
          },
        },
      }}
    >
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={articlesCount}
        showSizeChanger={false}
      />
    </ConfigProvider>
  );
};

export default MyPagination;