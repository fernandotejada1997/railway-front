import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

function NavBar({ handleSearch, handleclean }) {
    return (
    <div className={style.searchBox}>
        <Link to="/home" >
            <img className={style.logo} src={process.env.PUBLIC_URL + "/logo.png"} alt="PI Dogs" />
        </Link>
        <h1 className={style.title}>PI DOGS</h1>
        <form>
            <input className={style.search} placeholder="Search your dog..." onChange={handleSearch} onClick={handleclean} />
            <button className={style.button}>Search</button>
        </form>
    </div>
    );
}

export default NavBar;