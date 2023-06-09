import React from "react";
import style from "./paginado.module.css";

export default function Paginado({ charactersPerPage, allCharacters, paginado, currentPage }) {

const pageNumber = [];

for (let i = 0; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumber.push(i + 1);
    }

const allPages = pageNumber.slice(0, pageNumber.length - 1);

return (
    <nav className={style.div}>
        <ul className={style.list}>
        {allPages &&
            allPages.map((number, index) => (
            <li className={style.button} key={index}>
                <button
                className={number === currentPage ? `${style.a} ${style.active}` : style.a}
                onClick={() => paginado(number)}
                >
                {number}
                </button>
            </li>
        ))}
    </ul>
    </nav>
);
}