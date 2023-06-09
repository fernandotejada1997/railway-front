import style from "./home.module.css";
import Cards from "../components/cards/cards";
import NavBar from "../components/navbar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterCharactersByStatus, orderBy, temperaments, searchDog } from "../../redux/actions/index";
import Paginado from "../paginado/paginado";

function Home() {

const dispatch = useDispatch();

const allDogs = useSelector((state) => state.allDogs);

const allTemperaments = useSelector((state) => state.temperaments);


const [currentPage, setCurrentPage] = useState(1); // // Estado para almacenar el número de página actual
const [charactersPerPage, setCharacterPerPage] = useState(8); // Estado para almacenar cantidad de cards por página

const indexOfLastCharacter = currentPage * charactersPerPage;
const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
const currentCharacters = allDogs.slice(indexOfFirstCharacter, indexOfLastCharacter);

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    };

useEffect(() => {
    dispatch(getDogs());
    }, [dispatch]);
useEffect(() => {
    dispatch(getTemperaments());
    }, [dispatch]);

const handleFilterStatus = (e) => {
    setCurrentPage(1);
    dispatch(filterCharactersByStatus(e.target.value));
    if (e.target.value !== "none") {
        document.getElementById("orderBySelect").value = "none";
        document.getElementById("temperaments").value = "none";
        }
    };

const orderBystatus = (e) => {
    setCurrentPage(1);
    dispatch(orderBy(e.target.value));
    };

const filterTemperaments = (e) => {
    setCurrentPage(1);
    dispatch(temperaments(e.target.value));
    if (e.target.value !== "none") {
        document.getElementById("orderBySelect").value = "none";
        }
    };

const handleSearch = (e) => {
    setCurrentPage(1);
    
    dispatch(searchDog(e.target.value))
    };   

const handleclean = () =>{
    document.getElementById("source").value = "all";
    document.getElementById("temperaments").value = "none";
    document.getElementById("orderBySelect").value = "none";
}

    return (
        <div className={style.home}>
        <NavBar 
        handleSearch={handleSearch}
        handleclean={handleclean}
        
        />
            <div className={style.filtros}>
            <div>
                <h3>Source:</h3>
                <select id="source" 
                onClick={e => handleFilterStatus(e)} 
                onChange={e => handleFilterStatus(e)}>
                    <option value="all" >all</option>
                    <option value="api">API</option>
                    <option value="db">Database</option>
                </select>
            </div>
            <div>
                <h3>Temperament:</h3>
                <select id="temperaments" onChange={e => filterTemperaments(e)}>
                    <option value="none" >select an option</option>
                    {allTemperaments.map((temp, key) =>{
                        return (
                            <option value={temp} key={key}>{temp}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <h3>Order by:</h3>
                <select id="orderBySelect" onChange={e => orderBystatus(e)}>
                    <option value="none" >select an option</option>
                    <option value="asc">ascending</option>
                    <option value="des">Falling</option>
                    <option value="peso">weight</option>
                    <option value="pesodesc">weight desc</option>
                </select>
            </div>
            </div>
            <Paginado className={style.paginado}
            charactersPerPage={charactersPerPage}
            allCharacters={allDogs.length}
            paginado={paginado}
            currentPage={currentPage}    />
            <Cards currentCharacters={currentCharacters} />
        </div>        
)};

export default Home;