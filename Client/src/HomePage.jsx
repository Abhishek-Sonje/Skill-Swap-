import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  BookOpen,
  Zap,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Heart,
} from "lucide-react";

const SkillSwapHomepage = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    "Photography",
    "Web Development",
    "Guitar",
    "Cooking",
    "Spanish",
    "Data Science",
    "Design",
    "Marketing",
  ];

  const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Smart Matching",
      description:
        "AI-powered connections that find your perfect learning partner based on skills, schedule, and learning style",
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Teach & Learn",
      description:
        "Share your expertise while discovering new skills - create meaningful exchanges that benefit everyone",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Track Progress",
      description:
        "Monitor your learning journey with detailed analytics and milestone celebrations",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "UX Designer",
      skill: "Learned Python • Taught Design",
      text: "The matching was perfect - I found someone who needed design help and taught me coding. We're still learning together!",
      rating: 5,
      color: "from-blue-400 to-blue-500",
    },
    {
      name: "Marcus Rodriguez",
      role: "Music Teacher",
      skill: "Learned Guitar • Taught Spanish",
      text: "Found my guitar mentor through SkillSwap. The skill exchange made learning feel natural and fun.",
      rating: 5,
      color: "from-green-400 to-green-500",
    },
    {
      name: "Emily Johnson",
      role: "Food Blogger",
      skill: "Learned Cooking • Taught Photography",
      text: "Exchanged photography skills for cooking lessons. The community here is incredibly supportive!",
      rating: 5,
      color: "from-amber-400 to-amber-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-violet-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Stories
              </a>
              <button className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-8 shadow-sm">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-slate-600 font-medium">
                Loved by 10,000+ learners
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-slate-800">Learn</span>
              <span className="text-slate-400 mx-4">•</span>
              <span className="text-slate-800">Teach</span>
              <span className="text-slate-400 mx-4">•</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Grow
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with passionate learners and teachers. Share your skills,
              discover new ones, and build meaningful relationships through
              knowledge exchange.
            </p>

            {/* Animated Skill Display */}
            <div className="mb-12">
              <p className="text-lg text-slate-500 mb-6">
                People are currently learning:
              </p>
              <div className="relative">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 h-12 flex items-center justify-center">
                  <span
                    className="transition-all duration-500 transform"
                    key={currentSkill}
                  >
                    {skills[currentSkill]}
                  </span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-colors">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 shadow-sm">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="section-how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Share Your Profile",
                description:
                  "Tell us about your skills, interests, and learning goals. Our platform understands what makes you unique.",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                title: "Get Matched",
                description:
                  "Our intelligent algorithm finds perfect learning partners based on complementary skills and shared interests.",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                step: "03",
                title: "Start Learning",
                description:
                  "Connect with your match, schedule sessions, and begin your skill exchange journey with built-in progress tracking.",
                color: "from-violet-500 to-violet-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group text-center transform transition-all duration-700 hover:scale-105 ${
                  isVisible["section-how-it-works"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 opacity-40"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="section-features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Why Choose SkillSwap?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Thoughtfully designed features that make skill sharing delightful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                  isVisible["section-features"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-slate-700 mb-6 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-110 transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="section-testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real connections, real learning, real growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                  isVisible["section-testimonials"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-lg">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-500 text-sm">{testimonial.role}</p>
                    <p className="text-blue-600 text-sm font-medium">
                      {testimonial.skill}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-slate-600 font-medium">
              Join the movement
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a community of curious minds who believe in the power of shared
            knowledge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
              <span>Register Now - It's Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/50 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  SkillSwap
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Empowering learners worldwide through meaningful skill exchanges
                and genuine connections.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Platform</h4>
              <div className="space-y-3 text-slate-600">
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  How it Works
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Find Teachers
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Become a Teacher
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Success Stories
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Support</h4>
              <div className="space-y-3 text-slate-600">
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Help Center
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Safety Guidelines
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Community
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Contact Us
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Company</h4>
              <div className="space-y-3 text-slate-600">
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  About Us
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Careers
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Privacy Policy
                </p>
                <p className="hover:text-slate-900 transition-colors cursor-pointer">
                  Terms of Service
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/50 mt-12 pt-8 text-center text-slate-500">
            <p>
              &copy; 2025 SkillSwap. Crafted with care for the learning
              community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillSwapHomepage;
