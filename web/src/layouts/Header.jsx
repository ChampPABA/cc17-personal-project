import { Link } from "react-router-dom";
import { FacebookIcon } from "../icons";
import Menu from "./Menu";
import Dropdown from "./Dropdown";

export default function Header() {
  return (
    <header className="grid grid-cols-1 bg-white shadow px-4 items-center">
      <div className="justify-self-start hidden">
        <Link to="/">
          <FacebookIcon />
        </Link>
      </div>
      <div className="hidden">
        <Menu />
      </div>
      <div className="justify-self-end h-[48px] flex items-center">
        <Dropdown />
      </div>
    </header>
  );
}
