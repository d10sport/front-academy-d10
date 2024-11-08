import { LogoHeader } from "../../utils/icons/icons";
import './header.css';

export default function Header() {
  return (
    <nav id="nav_header" className="nav fixed">
      <LogoHeader />
      <ul className="list__nav">
        <div></div>
      </ul>
      <button className="login__nav text-sm">D10+</button>
    </nav>

  );
}