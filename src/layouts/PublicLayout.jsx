import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default PublicLayout;
