import "./about.css";
import Star from "../components/star";
import PuzzleFoto from "../components/puzzlefoto";

export default function AboutPage() {
    return (
        <section className="about" id="about">
            <Star />
            <PuzzleFoto />
            
            <h1 className="title-about">About Me</h1>
            <Star />
            <div className="line-vertical"></div>
            <div className="about-box">
                <p className="about-description">
                    I am a Computer Engineering student at Institut Teknologi Sepuluh Nopember (ITS). 
                    I have always been passionate about programming, having started learning it during 
                    junior high school. As I grew older, my interests gradually shifted toward robotics, 
                    while programming remained at the core of my passion. I consider myself highly adaptable 
                    and committed to taking responsibility for every task I undertake. My perseverance and 
                    curiosity constantly drive me to explore new possibilities, develop innovative ideas, 
                    and create solutions that can contribute to the advancement of my country.

                <br/><br/>

                    I am currently pursuing higher education with the dream of developing major projects of 
                    my own, particularly in robotics. One of my greatest ambitions is to become a Robotics 
                    Engineer and build a career abroad. These goals motivate me to work hard, continuously 
                    improve my skills, and embrace every challenge that comes my way as an opportunity to 
                    learn, grow, and move closer to achieving my dreams.
                </p>  
            </div>
        </section>
    )
}