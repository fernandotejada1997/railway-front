import style from "./card.module.css";
import { Link } from "react-router-dom";

function Card({dog}) {
    const Dog = dog;

        return (
            <Link to={`/home/${Dog.id}`} className={style.Link}>
        <div className={style.cardcontainer} >
            <div> 
            <img className={style.image} src={Dog.image.url || Dog.image} alt={Dog.name} />
            </div>
            <h2>Name: {Dog.name}</h2>            
            <h4>Temperaments: {Dog.temperament}</h4>
            <h4>Weight: {Dog.weight.metric || Dog.weight}</h4>
            <h4>Life span: {dog.life_span}</h4>
            </div>   
            </Link>     
)};

export default Card;

//<h4>Diets: {Recipe.diets && `${Recipe.diets}`}</h4>