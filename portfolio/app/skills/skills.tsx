"use client";

import { useEffect, useRef, useState } from "react";
import "./skills.css";
import Star from "../components/star";

type Skill = {
  id: number;
  title: string;
  icon: string;
  description: string;
  tags: string[];
};

const fallbackSkills: Skill[] = [
  {
    id: 1,
    title: "Programming & Computer Vision",
    icon: "code",
    description:
      "I have learned the fundamentals of C, C++, HTML, CSS, and Python. I can develop basic algorithms, apply programming logic, and understand fundamental computer vision concepts using OpenCV.",
    tags: ["C / C++", "Python", "HTML / CSS", "OpenCV"],
  },
  {
    id: 2,
    title: "Embedded Systems",
    icon: "cpu",
    description:
      "I understand the fundamentals of Arduino and ESP32, including microcontroller programming, GPIO pin functions, sensor integration, and basic hardware connections.",
    tags: ["Arduino", "ESP32", "GPIO", "Sensors"],
  },
  {
    id: 3,
    title: "3D Design",
    icon: "cube",
    description:
      "I can create basic 3D models and design concepts for robotic components, including robot layouts and structural parts, while considering their shape, placement, and functionality.",
    tags: ["3D Modeling", "Prototyping"],
  },
  {
    id: 4,
    title: "Perseverance & Growth Mindset",
    icon: "sword",
    description:
      "I approach challenges with determination, curiosity, and a strong willingness to learn. My ambition drives me to keep improving, overcome obstacles, and find solutions instead of giving up.",
    tags: ["Persistence", "Problem Solving", "Growth Mindset"],
  },
];

function SkillIcon({ type }: { type: string }) {
  if (type === "code") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M23 19 10 32l13 13M41 19l13 13-13 13M36 13 28 51"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "cpu") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect
          x="17"
          y="17"
          width="30"
          height="30"
          rx="5"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <rect
          x="25"
          y="25"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M24 7v10M40 7v10M24 47v10M40 47v10M7 24h10M7 40h10M47 24h10M47 40h10"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "cube") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="m32 7 23 13v24L32 57 9 44V20L32 7Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 20l23 14 23-14M32 34v23M20 13l23 14v16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M46 8 54 10 52 18 28 42 22 36 46 8Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="m18 40 6 6M12 46l6-6 6 6-6 6-6-6ZM10 54l7-7"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchSkills() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:4001";

        const response = await fetch(`${apiUrl}/skills`);

        if (!response.ok) {
          throw new Error(`Failed to fetch skills: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid skills response");
        }

        if (!cancelled && data.length > 0) {
          setSkills(data as Skill[]);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to load skills from API. Using fallback data.",
            error
          );
        }
      }
    }

    void fetchSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [skills]);

  function toggleCard(id: number) {
    setFlippedCards((current) =>
      current.includes(id)
        ? current.filter((cardId) => cardId !== id)
        : [...current, id]
    );
  }

  return (
    <section className="skills-section" id="skills">
      <div className="skills-stars" aria-hidden="true">
        <Star />
      </div>

      <div className="skills-heading">
        <h2>My Skills</h2>
        <p>
          Explore my technical abilities and personal strengths.
          Click each card to discover more.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => {
          const isFlipped = flippedCards.includes(skill.id);

          return (
            <button
              key={skill.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              type="button"
              className={`skill-card ${isFlipped ? "is-flipped" : ""}`}
              onClick={() => toggleCard(skill.id)}
              aria-expanded={isFlipped}
              aria-label={`${skill.title}: ${
                isFlipped ? "hide details" : "show details"
              }`}
            >
              <div className="skill-card-inner">
                <div className="skill-card-face skill-card-back">
                  <div className="skill-back-icon">
                    <SkillIcon type={skill.icon} />
                  </div>

                  <span className="skill-reveal">
                    CLICK TO REVEAL
                  </span>
                </div>

                <div
                  className="skill-card-face skill-card-front"
                  aria-hidden={!isFlipped}
                >
                  <span className="skill-number">
                    {String(skill.id).padStart(2, "0")}
                  </span>

                  <div className="skill-icon">
                    <SkillIcon type={skill.icon} />
                  </div>

                  <h3>{skill.title}</h3>

                  <p className="skill-description">
                    {skill.description}
                  </p>

                  <div className="skill-tags">
                    {skill.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <span className="skill-hint">
                    Click to flip back
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}