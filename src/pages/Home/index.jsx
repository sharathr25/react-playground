import { Link } from "react-router-dom";

const Home = ({ routes }) => {
  const renderLink = (r) => (
    <li key={r}>
      <Link to={r}>{r}</Link>
    </li>
  );

  return <ul>{routes.map(renderLink)}</ul>;
};

export default Home;
