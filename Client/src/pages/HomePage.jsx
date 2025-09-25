import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Zap, ArrowRight } from 'lucide-react';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const skills = [
    { name: "Web Development", color: "#6366f1" },
    { name: "Design", color: "#ec4899" },
    { name: "Photography", color: "#f59e0b" },
    { name: "Languages", color: "#10b981" },
    { name: "Music", color: "#8b5cf6" },
    { name: "Cooking", color: "#ef4444" }
  ];

  const features = [
    {
      icon: <Users size={32} />,
      title: "Smart Matching",
      description: "Our AI algorithm connects you with the perfect skill partners based on your interests and goals."
    },
    {
      icon: <BookOpen size={32} />,
      title: "Learn & Teach",
      description: "Share your expertise while learning something new. Everyone has something valuable to offer."
    },
    {
      icon: <Zap size={32} />,
      title: "Instant Connect",
      description: "Start exchanging skills immediately with our seamless matching and communication system."
    }
  ];

  const testimonials = [
    { name: "Sarah Chen", skill: "Learned Guitar", text: "I taught coding and learned guitar. Amazing experience!", avatar: "👩‍💻" },
    { name: "Mike Rodriguez", skill: "Mastered Spanish", text: "Exchanged photography lessons for Spanish. Perfect match!", avatar: "📸" },
    { name: "Emma Johnson", skill: "Digital Art", text: "Trading cooking skills for art lessons was brilliant!", avatar: "🎨" }
  ];

  return (
    <div className="skillswap-root">
      {/* Header */}
      <header className="skillswap-header">
        <div className="skillswap-logo">
          Skillhive
        </div>
        <nav className="skillswap-nav">
          <a href="#how" className="skillswap-link">How it Works</a>
          <a href="#features" className="skillswap-link">Features</a>
          <button
            className="skillswap-join-btn"
            onClick={() => window.location.href = '/login'}
          >
            Join Now
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="skillswap-hero">
        <div className="skillswap-bg-circle skillswap-bg-circle1" />
        <div className="skillswap-bg-circle skillswap-bg-circle2" />

        <div className="skillswap-hero-grid">
          <div className={isVisible ? "skillswap-hero-left skillswap-hero-animate" : "skillswap-hero-left"}>
            <h1 className="skillswap-hero-title">
              Exchange Skills,<br />
              Expand Horizons
            </h1>
            <p className="skillswap-hero-desc">
              Connect with people worldwide to teach what you know and learn what you love. 
              Our smart algorithm matches you with the perfect skill exchange partners.
            </p>
            <button
              className="skillswap-cta-btn"
              onClick={() => window.location.href = '/login'}
            >
              Start Swapping <ArrowRight size={20} />
            </button>
          </div>

          <div className={isVisible ? "skillswap-hero-right skillswap-hero-animate" : "skillswap-hero-right"}>
            <div className="skillswap-popular-box">
              <h3 className="skillswap-popular-title">Popular Skills</h3>
              <div className="skillswap-skills-grid">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skillswap-skill-card"
                    style={{
                      background: `${skill.color}15`,
                      border: `2px solid ${skill.color}30`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div
                      className="skillswap-skill-avatar"
                      style={{ background: skill.color }}
                    >{skill.name[0]}</div>
                    <div className="skillswap-skill-label">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="skillswap-how">
        <div className="skillswap-how-container">
          <h2 className="skillswap-section-title">How Skillhive Works</h2>
          <div className="skillswap-how-steps">
            {[
              { step: "1", title: "Share Your Skills", desc: "Tell us what you can teach and what you want to learn" },
              { step: "2", title: "Get Matched", desc: "Our algorithm finds perfect skill exchange partners for you" },
              { step: "3", title: "Start Learning", desc: "Connect, schedule, and begin your skill exchange journey" }
            ].map((item, index) => (
              <div key={index} className="skillswap-how-step">
                <div className="skillswap-how-stepnum">{item.step}</div>
                <h3 className="skillswap-how-steptitle">{item.title}</h3>
                <p className="skillswap-how-stepdesc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="skillswap-features">
        <div className="skillswap-features-container">
          <h2 className="skillswap-section-title skillswap-features-title">
            Why Choose Skillhive?
          </h2>
          <div className="skillswap-features-list">
            {features.map((feature, index) => (
              <div key={index} className="skillswap-feature-card">
                <div className="skillswap-feature-icon">{feature.icon}</div>
                <h3 className="skillswap-feature-title">{feature.title}</h3>
                <p className="skillswap-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="skillswap-testimonials">
        <div className="skillswap-testimonials-container">
          <h2 className="skillswap-section-title">Success Stories</h2>
          <div className="skillswap-testimonials-list">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`skillswap-testimonial-card ${activeCard === index ? "active" : ""}`}
                onClick={() => setActiveCard(index)}
              >
                <div className="skillswap-testimonial-avatar">{testimonial.avatar}</div>
                <p className="skillswap-testimonial-text">
                  "{testimonial.text}"
                </p>
                <div className="skillswap-testimonial-name">{testimonial.name}</div>
                <div className="skillswap-testimonial-skill">{testimonial.skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="skillswap-cta">
        <div className="skillswap-cta-container">
          <h2 className="skillswap-cta-title">Ready to Start Your Skill Exchange Journey?</h2>
          <p className="skillswap-cta-desc">
            Join thousands of learners and teachers in our global community. 
            Your next skill is just a match away!
          </p>
          <button
            className="skillswap-cta-join"
            onClick={() => window.location.href = '/login'}
          >
            Join Skillhive Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="skillswap-footer">
        <div className="skillswap-footer-container">
          <div className="skillswap-logo">SkillSwap</div>
          <div className="skillswap-footer-links">
            <a href="#" className="skillswap-footer-link">About</a>
            <a href="#" className="skillswap-footer-link">Privacy</a>
            <a href="#" className="skillswap-footer-link">Terms</a>
            <a href="#" className="skillswap-footer-link">Contact</a>
          </div>
          <p className="skillswap-footer-copy">
            © 2025 Skillhive. All rights reserved. Made with ❤️ for learners worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
