import "./home.css";
import Star from "../components/star"
import Image from "next/image";

export default function HomePage() {
    return (
        <section className="home" id="home">
        <Star/>

        <Image
          src="/leohome.png"
          alt="leohome"
          className="leo-image"
          width={500}
          height={500}
          loading="eager"
          sizes="(max-width: 768px) 80vw, 500px"
        />

        <Image
          src="/logobg.png"
          alt="logobg"
          className="logobg-image"
          width={3000}
          height={600}
          loading="eager"
          sizes="100vw"
        />
        
        <p className="title-home">COMPUTER ENGINEERING</p>
        <a href = "#about">
          <button className="home-button">Get To Know Me!</button>
        </a>
      </section>
    )
}