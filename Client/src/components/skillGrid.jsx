import "../userRegister.css";

export default function SkillGrid({
  skills,
  selectedSkills,
  type,
  title,
  handleCheckboxChange,
}) {
  return (
    <div className="ur-skills-section">
      <h3 className="ur-skills-title">{title}</h3>
      <div className="ur-skills-grid">
        {skills.map((skill) => (
          <div
            key={skill}
            className={`ur-skill-card${
              selectedSkills.includes(skill) ? " selected" : ""
            }`}
            onClick={() => handleCheckboxChange(skill, type)}
          >
            <span className="ur-skill-text">{skill}</span>
            {selectedSkills.includes(skill) && (
              <div className="ur-checkmark">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
