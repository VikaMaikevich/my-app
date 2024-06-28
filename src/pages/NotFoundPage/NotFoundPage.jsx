import { Link } from "react-router-dom";
import stl from "./NotFoundPage.module.scss";
const NotFoundPage = () => {
  return (
    <div className={stl.card}>
      <p>
        This page was not found. Go to the{" "}
        <Link to="/">
          <span className={stl.span}> Home page</span>
        </Link>
      </p>
    </div>
  );
};
export default NotFoundPage;
