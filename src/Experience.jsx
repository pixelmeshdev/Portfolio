import { useState } from "react";

const experiences = [
  {
    title: "UI / UX Design",
    company: "Primary Focus",
    date: "2024 - Present",
    details: [
      "Designing user interfaces, wireframes, and interactive prototypes using Figma.",
      "Creating visual assets, layouts, and graphic elements with Adobe Photoshop.",
      "Focusing on user-centered design, responsive layouts, and intuitive workflows.",
    ],
  },
  {
    title: "Web Development",
    company: "Frontend & Full-Stack Fundamentals",
    date: "Coursework & Practice",
    details: [
      "Building responsive interfaces with HTML, CSS, Tailwind CSS, JavaScript, and React.",
      "Studied Node.js, Express, and database fundamentals.",
      "Applying web development knowledge to practical UI systems.",
    ],
  },
  {
    title: "3D & Creative Coding",
    company: "Exploration & Learning",
    date: "Ongoing",
    details: [
      "Creating 3D models and stylized visual assets inside Blender.",
      "Building interactive 3D web scenes with Three.js and React Three Fiber.",
    ],
  },
  {
    title: "B.Sc. Mathematics",
    company: "Govt. Degree College Ghumarwin",
    date: "Undergraduate",
    details: [
      "Studying Mathematics with minors in Physics and Computer Science.",
      "Applying analytical problem-solving and mathematical logic to technical challenges.",
    ],
  },
];

export default function Experience() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = experiences[selectedIndex];

  return (
    <section id="about" className="experience-section" aria-labelledby="experience-title">
      <p className="experience-eyebrow">Introduction &amp; Background</p>
      <h2 id="experience-title">About Me</h2>
      <div className="experience-layout">
        <div className="experience-tabs" role="tablist" aria-label="Experience">
          {experiences.map((experience, index) => (
            <button
              className={`experience-tab ${index === selectedIndex ? "is-active" : ""}`}
              key={experience.title}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            >
              <strong>{experience.title}</strong>
              <span>{experience.company} | {experience.date}</span>
            </button>
          ))}
        </div>
        <div className="experience-details" role="tabpanel">
          <ul>
            {selected.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
