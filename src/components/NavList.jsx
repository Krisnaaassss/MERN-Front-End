import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [
  { id: 1, url: "about", text: "about" },
  { id: 2, url: "product", text: "product" },
  { id: 3, url: "order", text: "order" },
  { id: 4, url: "checkout", text: "checkout" },
];

const NavList = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === "order" || url === "checkout") && !user) {
          return null;
        }
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
