"use client";

import Star from "../components/star";
import "./journey.css";

const topMilestones = [
  {
    year: "Grade 8",
    title: "Started explore programming",
    description: "I first became interested in programming after frequently watching people code on YouTube. Their projects sparked my curiosity and inspired me to explore the world of programming on my own.",
  },
  {
    year: "Grade 9",
    title: "Learned to Build Websites",
    description: "I began learning how to build simple websites using HTML and CSS through Petani Kode tutorials. With only my phone and the Acode application, I took my first steps into web development.",
  },
];

const bottomMilestones = [
  {
    year: "Grade 9",
    title: "Learned to Make Mobile Games",
    description: "Inspired by YouTubers who created their own games, I became curious about game development and decided to try it myself. Using YouTube tutorials and the Max2D application, I learned how to create a simple Flappy Bird-style mobile game.",
  },
  {
    year: "Grade 12",
    title: "Developed an Interest in Robotics",
    description: "After graduating from high school, I began exploring robotics, starting with the fundamentals of Arduino. During this time, I also worked on several Arduino-based projects that helped me understand the basics of hardware and programming integration.",
  },
  {
    year: "Collage – Now",
    title: "Deepening My Knowledge of Robotics",
    description: "SI continue to deepen my knowledge of robotics, and one of the biggest steps I have taken is joining the Barunastra Research Team's internship program. Through this experience, I hope that i can become a part of the Barunastra team.",
  },
];

export default function JourneyPage() {
  return (
    <section className="journey" id="journey">
      <h2 className="journey-title">My Journey</h2>
      <p className="journey-intro">
        From my first steps in programming to exploring robotics, every experience inspires me to learn, build, and grow.
      </p>
      <Star />

      <div className="journey-timeline">
        <div className="line line-top">
          {topMilestones.map((milestone) => (
            <div className="journey-milestone" key={milestone.year}>
              <span className="line-dot" />

              <div className="journey-box">
                <span className="journey-year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="side-line"></div>

        <div className="line line-bottom">
          {bottomMilestones.map((milestone) => (
            <div className="milestone" key={milestone.year}>
              <span className="line-dot" />

              <div className="journey-box">
                <span className="journey-year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
    </section>
  );
}