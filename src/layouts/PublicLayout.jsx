import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
import Nav from "./../components/Nav";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Nav />
      <main className="mx-auto max-w-6xl px-8 py-20 min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
