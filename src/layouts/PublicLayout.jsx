import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
import Nav from "./../components/Nav";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Nav />
      <main className="mx-auto max-w-6xl px-8 py-4  min-h-[120vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
