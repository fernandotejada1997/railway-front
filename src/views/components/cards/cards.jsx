import style from "./Cards.module.css";
import Card from "../card/card";
import {Link} from "react-router-dom"

function Cards({currentCharacters}) {
    const dogs = currentCharacters
    
    return (
        <div className={style.cardList}>
            
            <Link to="/create" className={style.uploadtext} >
            <div className={style.upload}>
                <img className={style.image} src={process.env.PUBLIC_URL + '/upload.png'} alt="upload" />
                <h2 className={style.uploadtext}>Upload dog</h2>
            </div>
            </Link>

            {dogs?.map((dog,id)=>
            <Card dog={dog} key={id} />)}            

        </div>        
)};

export default Cards;