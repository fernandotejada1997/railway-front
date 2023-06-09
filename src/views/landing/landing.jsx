import style from "./landing.module.css";
import {Link} from "react-router-dom"

function Landing() {
    return (
        <div className={style.container}> 
            <h1 className={style.title}>PI DOGS 2023</h1>
            <h3>Fernando Tejada</h3>
            <h4 className={style.text}>Welcome to our web project created with THEDOGAPI!<br/>
            <br/>
On this site, you will immerse yourself in the wonderful world of dogs. Thanks to the powerful THEDOGAPI API,
we have gathered a wide variety of fascinating information, images and facts about different breeds of dogs.<br/>
Have you ever wondered which is the most suitable breed for you? Our app will help you find out. Explore our extensive 
collection of dog breeds, from the most popular to the most exotic. Each breed has its own page, where 
you'll find details about their temperament, physical characteristics, and grooming requirements.
But that is not all. We have also incorporated a search functionality, which will allow you to quickly 
find the breed you are looking for. Simply enter the name of the breed in the search field and you will get 
accurate results instantly.<br/>
In addition, our application offers a gallery of images so that you can enjoy the beauty of each breed of dog. 
From adorable puppies to majestic adults, you'll find a variety of photos that will steal your heart.
In short, our web project created with THEDOGAPI is your definitive guide to learning about the different 
breeds of dogs and finding the perfect canine companion for you.<br/> 
We hope you enjoy exploring and learning about these amazing animals!

Welcome to our doggy world!</h4>
            <Link to="/home">
            <img className={style.logo} src={process.env.PUBLIC_URL + '/logo.png'} alt="PI DOGS" />
            </Link>
            <h5 className={style.tohome}>↑ click to home ↑</h5>
            <div className={style.image}>
            <img className={style.img} src={process.env.PUBLIC_URL + '/pets.jpg'} alt="dogs" />
            </div>
        </div>
)};

export default Landing;