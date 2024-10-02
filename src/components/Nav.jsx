import { NavLink, useNavigate } from "react-router-dom";
import NavList from "./NavList";
import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import costumApi from "../api";
import { logoutUser } from "../features/userSlice";
import { clearCartItem } from "../features/cartSlice";
const Nav = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // mengambil jumlah item di dalam keranjang dari state.cartState
  const countInCart = useSelector((state) => state.cartState.numItemsCart);
  const handlingOut = async () => {
    try {
      await costumApi.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    }
  };
  return (
    <nav className="bg-base-200 ">
      <div className="navbar mx-auto max-w-6xl px-8">
        <div className="navbar-start ">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            LOGO
          </NavLink>
          {/* MOBILE VIEW */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-200 rounded-box w-52"
            >
              <NavList />
            </ul>
          </div>

          {/* PC VIEW */}
          <div className="hidden lg:flex">
            <ul className=" menu menu-horizontal">
              <NavList />
            </ul>
          </div>
        </div>
        <div className="navbar-end gap-x-5">
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
            <div className="indicator">
              <BsCart3 />
              <span className="badge badge-primary badge-sm indicator-item">
                {countInCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <button
              className="btn btn-error btn-outline btn-md"
              onClick={handlingOut}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
