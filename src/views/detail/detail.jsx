import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, clearDetail } from "../../redux/actions/index";

function Detail(props) {
const dispatch = useDispatch();
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    dispatch(getDetail(props.match.params.id))
    .then(() => {
        setIsLoading(false); 
    })
    .catch((error) => {
        setIsLoading(false); 
        console.error(error);
    });

    return () => {
    dispatch(clearDetail()); 
    };
}, [dispatch, props.match.params.id]);
const myDog = useSelector((state) => state.detail);
return (
    <div className={styles.container}>
    {isLoading ? (
        <div>
            <img src={process.env.PUBLIC_URL + "/Loading_icon.gif"} alt="cargando..." />
        </div>

    ) : myDog !== undefined ? (
        <div>
        <Link to="/home">
            <img
            className={styles.logo}
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="PI Dogs"
            />
        </Link>
        <h1>name: {myDog.name ? myDog.name : "no se encontro el nombre"}</h1>
        <img
            className={styles.img}
            src={
            myDog.image ? myDog.image.url || myDog.image : "no se encontro la foto"
            }
            alt={myDog.name}
        />
        {myDog.bred_for ? <h3>Bred for: {myDog.bred_for}</h3> : null}
        {myDog.weight ? (
            <h3>Weight : {myDog.weight.metric || myDog.weight}</h3>
        ) : null}
        {myDog.height ? (
            <h3>Height : {myDog.height.metric || myDog.height}</h3>
        ) : null}
        <h3>life span: {myDog.life_span ? myDog.life_span : "no se endcontro el lifespan"}</h3>
        <h3>temperament: {myDog.temperament ? myDog.temperament : "no se encontro el temperamento"}</h3>
        </div>
    ) : (
        <div>
        <h2>Error, no se pudo cargar el detalle</h2>
        </div>
    )}
    </div>
);
}

export default Detail;