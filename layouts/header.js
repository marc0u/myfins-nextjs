import AppBar from "../components/appbar/appbar.component";
import { name, version } from "../package.json";

export default function Header() {
  return <AppBar>{name + " v" + version}</AppBar>;
}
