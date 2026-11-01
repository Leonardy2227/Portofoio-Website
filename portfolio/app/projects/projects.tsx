"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Star from "../components/star";
import "./projects.css";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  details: string;
  technologies: string[];
  githubUrl?: string;
}

const fallbackProjects: Project[] = [

  {
    id: 1,
    title: "Find The Sequence LED Game",
    category: "Embedded Systems",

    image: "/FTS.png",

    description:
      "An interactive LED sequence guessing game featuring button inputs and buzzer feedback.",

    details:
      "A C++ project featuring a game where players must guess the correct sequence of five LEDs using buttons. A buzzer provides feedback for each attempt, creating an interactive experience while exploring digital inputs, outputs, and embedded programming.",

    technologies: [
      "C++",
      "Arduino",
      "LEDs",
      "Push Buttons",
      "Buzzer",
    ],

    githubUrl:
      "https://github.com/Leonardy2227/Find-The-Sequence-Led-Game",
  },

  {
    id: 2,
    title: "Arduino Password System",
    category: "Embedded Systems",

    image: "/SP.png",

    description:
      "A password system that uses button sequences to unlock an electronic security interface.",

    details:
      "An Arduino-based password system using three buttons, LEDs, and an OLED display. Users must enter the correct button sequence to unlock the system. This project explores input validation, conditional logic, and the integration of electronic components.",

    technologies: [
      "C++",
      "Arduino",
      "OLED Display",
      "Push Buttons",
      "LEDs",
    ],

    githubUrl:
      "https://github.com/Leonardy2227/Arduino-Password-System",
  },

  {
    id: 3,
    title: "Color Recognition OpenCV",
    category: "Computer Vision",

    image: "/opencv.png",

    description:
      "A real-time computer vision system that recognizes red, blue, and yellow objects through a camera.",

    details:
      "A Python and OpenCV project that recognizes red, blue, and yellow objects through a camera in real time. The system uses color-based image processing to identify objects and introduces fundamental computer vision techniques for real-time visual recognition.",

    technologies: [
      "Python",
      "OpenCV",
      "Computer Vision",
      "Image Processing",
    ],

    githubUrl:
      "https://github.com/Leonardy2227/Color-Recognition-OpenCV",
  },

  {
    id: 4,
    title: "Distance Sensor",
    category: "Electronics & Sensors",

    image: "/distance_sensor.png",

    description:
      "An ultrasonic distance monitoring system with LED indicators and buzzer alerts.",

    details:
      "An Arduino-based distance monitoring system that uses an ultrasonic sensor to measure the distance to nearby objects. Green and red LEDs indicate different conditions, while a buzzer provides audible warnings. This project explores sensor integration, distance measurement, and hardware control.",

    technologies: [
      "C++",
      "Arduino",
      "Ultrasonic Sensor",
      "LEDs",
      "Buzzer",
    ],

    githubUrl:
      "https://github.com/Leonardy2227/Distance-Sensor",
  },

  {
    id: 5,
    title: "Arduino Mini Piano",
    category: "Electronics & Embedded Systems",

    image: "/mini_piano.png",

    description:
      "An electronic mini piano featuring eight buttons, eight LEDs, and musical notes from low Do to high Do.",

    details:
      "An Arduino-based mini piano featuring eight push buttons and eight LEDs. Each button corresponds to a musical note, covering a range from low Do to high Do. The project explores digital input handling, sound generation, and the integration of electronic components into an interactive musical device.",

    technologies: [
      "C++",
      "Arduino",
      "Push Buttons",
      "LEDs",
      "Buzzer",
    ],

    githubUrl:
      "https://github.com/Leonardy2227/Arduino-Mini-Piano",
  },

  {
    id: 6,
    title: "Mochi Bot",
    category: "Embedded Robotics",

    image: "/mochi.png",

    description:
      "A compact interactive device powered by an ESP32-C3, OLED display, and buzzer.",

    details:
      "Mochi Bot is a compact embedded project built around the ESP32-C3 SuperMini. It features a 1.3-inch OLED display for customized text and a buzzer for audio feedback. The project explores microcontroller programming, I2C communication, and the integration of electronic components into a compact interactive device.",

    technologies: [
      "ESP32-C3",
      "C++",
      "SSD1306 OLED",
      "I2C",
      "Embedded Systems",
    ],

  },
];

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>(fallbackProjects);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

        const response = await fetch(`${apiUrl}/projects`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch projects: ${response.status}`
          );
        }

        const data: Project[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid projects response");
        }

        setProjects(data);
      } catch (error) {
        console.error(
          "Failed to load projects from API. Using fallback data.",
          error
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects" id="projects">
      <Star/>
      <div className="projects-title">
        <h2>
          My Projects
        </h2>
        <p className="projects-intro">
          A collection of projects exploring programming, embedded systems, and robotics.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <button
            type="button"
            className="project-card"
            key={project.id}
            onClick={() => setSelectedProject(project)}
            aria-haspopup="dialog"
            aria-label={`View details about ${project.title}`}
          >
            <div className="project-image-wrapper">
              <Image
                src={project.image}
                alt={project.title}
                fill    
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                className="project-image"
              />

              <div className="project-image-overlay">
                <span>View Project ↗</span>
              </div>
            </div>

            <div className="project-content">
              <p className="project-category">
                {project.category}
              </p>

              <h3>{project.title}</h3>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-card-footer">
                <span>Explore project</span>

                <span className="project-arrow">↗</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>

            <div className="project-modal-image">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 700px) 100vw, 700px"
              />
            </div>

            <div className="project-modal-content">
              <p className="project-category">
                {selectedProject.category}
              </p>

              <h2 id="project-modal-title">
                {selectedProject.title}
              </h2>

              <p className="project-modal-description">
                {selectedProject.details}
              </p>

              <div className="project-technologies">
                <h4>Program & Components</h4>

                <div className="project-tech-list">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="project-tech">
                      {tech}
                    </span>
                  ))}
                </div>
                {selectedProject.githubUrl && (
                    <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-github-button"
                    >
                        <span>View on GitHub</span>
                        <span>↗</span>
                    </a>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}