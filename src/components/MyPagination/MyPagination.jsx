import { togglePage } from "../../store/reducers/articleSlice";
import { Pagination, ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const MyPagination = ({ articlesCount, currentPage }) => {
  const dispatch = useDispatch();

  const onChange = (page) => {
    dispatch(togglePage(page));
    localStorage.setItem("currentPage", page);  // текущая страница
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      dispatch(togglePage(Number(savedPage)));  // Восстановление текущей страницы 
    }
  }, [dispatch]);

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