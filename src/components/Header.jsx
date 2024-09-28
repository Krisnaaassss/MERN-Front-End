import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Fungsi useSelector digunakan untuk mengambil data dari storeRedux dan menggunakannya di dalam komponen React.
const Header = () => {
  const user = useSelector((state) => state.userState.user);
  console.log("Current user state:", user); 

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="mx-auto max-w-6xl px-8 flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hallo, {user.name}</p>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sing In
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
