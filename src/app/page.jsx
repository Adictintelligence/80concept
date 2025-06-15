"use client";
import React from "react";

import { useState } from 'react';

import { useEffect } from 'react';

import { useHandleStreamResponse } from "../utilities/runtime-helpers";

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: (message) => {
      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
      setStreamingMessage("");
      setIsLoading(false);
    },
  });
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant for 80concept, an ICT company. You specialize in:
              1. ICT Infrastructure: networking, servers, cloud services, and hardware
              2. Software Solutions: custom software development, ERP systems, and application integration
              3. Managed Services & Support: IT support, monitoring, maintenance, and security services
              4. Consulting & Advisory: IT strategy, digital transformation, and process optimization
              
              Provide concise, accurate responses about these services. If asked about topics outside these areas, politely redirect to relevant services or suggest contacting the sales team.`,
            },
            ...messages,
            userMessage,
          ],
          stream: true,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      handleStreamResponse(response);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
      setIsLoading(false);
    }
  };
  const services = [
    {
      icon: "fa-server",
      title: "ICT Infrastructure",
      description: "Building robust and scalable IT infrastructure solutions",
      subServices: [
        "Network Design & Implementation",
        "Data Center Solutions",
        "Cloud Infrastructure",
        "Hardware Integration",
        "Infrastructure Security",
      ],
    },
    {
      icon: "fa-code",
      title: "Software Solutions",
      description: "Custom software development and digital transformation",
      subServices: [
        "Custom Application Development",
        "Web & Mobile Solutions",
        "System Integration",
        "API Development",
        "Software Maintenance",
      ],
    },
    {
      icon: "fa-tools",
      title: "Managed Services & Support",
      description: "Comprehensive IT management and technical support",
      subServices: [
        "24/7 Technical Support",
        "System Monitoring",
        "Preventive Maintenance",
        "Help Desk Services",
        "Performance Optimization",
      ],
    },
    {
      icon: "fa-lightbulb",
      title: "Consulting & Advisory Services",
      description: "Strategic IT consulting and business technology advisory",
      subServices: [
        "IT Strategy Development",
        "Digital Transformation",
        "Technology Assessment",
        "Project Management",
        "Business Process Optimization",
      ],
    },
  ];
  const [clients, setClients] = useState([
    {
      name: "GPL",
      logo: "https://ucarecdn.com/46cd3017-b64d-43f8-afc7-deb5431171d1/-/format/auto/",
    },
    {
      name: "Ethekwini Municipality",
      logo: "https://ucarecdn.com/fb49beb2-edb9-4a07-914b-e87131e4aed6/-/format/auto/",
    },
    {
      name: "Denel",
      logo: "https://ucarecdn.com/84360f79-5e87-4fdc-b21c-2769346a8a95/-/format/auto/",
    },
    {
      name: "HM Inc",
      logo: "https://ucarecdn.com/51c8e4f7-a18b-46eb-9bf3-f8f7b58a64e0/-/format/auto/",
    },
    {
      name: "Uhambo",
      logo: "https://ucarecdn.com/bb52e219-ab9f-42bd-8419-e447d5a160a1/-/format/auto/",
    },
    {
      name: "Sasol",
      logo: "https://ucarecdn.com/08490e28-b76a-46f2-8ca8-720181ebbcc8/-/format/auto/",
    },
    {
      name: "Thabure",
      logo: "https://ucarecdn.com/5eb56507-3a8b-43a3-bc81-2a64f298d57f/-/format/auto/",
    },
    {
      name: "Maredi Telecoms",
      logo: "https://ucarecdn.com/b10b4f67-1829-4c3d-80ee-dd1cb8a14d1b/-/format/auto/",
    },
    {
      name: "GGDA",
      logo: "https://ucarecdn.com/d655a2e4-f70c-4add-adb8-d7d397b6990a/-/format/auto/",
    },
    {
      name: "DPWI",
      logo: "https://ucarecdn.com/446b9aa5-5886-4136-aa2e-f8700b82814e/-/format/auto/",
    },
    {
      name: "Exxaro",
      logo: "https://ucarecdn.com/7b933317-f2d0-4560-b2ee-8c6760cb4099/-/format/auto/",
    },
    {
      name: "GPF",
      logo: "https://ucarecdn.com/5ab7e5f1-f309-4b69-a3fb-6c02f082ede3/-/format/auto/",
    },
    {
      name: "GEP",
      logo: "https://ucarecdn.com/8aec0ca4-2d19-4028-a500-71aad6048b5f/-/format/auto/",
    },
    {
      name: "Masana",
      logo: "https://ucarecdn.com/cae7e55b-b927-41e0-96ca-4acef301ad0c/-/format/auto/",
    },
    {
      name: "Old Mutual",
      logo: "https://ucarecdn.com/f00f7fd7-2cd7-46b2-9860-345099a10ab8/-/format/auto/",
    },
    {
      name: "Lugcobo",
      logo: "https://ucarecdn.com/d8596eca-11e4-4595-b3a7-90596eca91fd/-/format/auto/",
    },
    {
      name: "Rivoningo",
      logo: "https://ucarecdn.com/d8d336c6-a1be-4b12-b0cc-abd25e903c71/-/format/auto/",
    },
    {
      name: "L. F. Mothapo Building Construction",
      logo: "https://ucarecdn.com/080c6774-6d37-4414-8e2a-dadbcca35093/-/format/auto/",
    },
    {
      name: "Wina Pressings",
      logo: "https://ucarecdn.com/da8fa8c1-4110-411d-bcaa-af314823ccfb/-/format/auto/",
    },
    {
      name: "Liquid Intelligent Technologies",
      logo: "https://ucarecdn.com/d2417a6b-456a-4c8f-b872-50a5ee93d4ca/-/format/auto/",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      to: "hi@80concept.co.za",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent! We will get back to you soon.");
      e.target.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchClientLogos = async () => {
      try {
        const response = await fetch(
          "/integrations/image-search/imagesearch?q=corporate+logo+design"
        );
        if (!response.ok) throw new Error("Failed to fetch logos");
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.items)) {
          const newLogos = data.items.map((item) => ({
            name: item.title || "Company Logo",
            logo: item.originalImageUrl,
          }));
          const combinedClients = [...clients, ...newLogos].slice(0, 20);
          setClients(combinedClients);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };
    const fetchBackgroundImage = async () => {
      try {
        const section = document.getElementById("home");
        if (section) {
          const img = new Image();
          img.src =
            "https://ucarecdn.com/d13bfe69-21a8-494e-b4d3-9a25d19f29cc/-/format/auto/";
          img.onload = () => {
            section.style.backgroundImage = `url('${img.src}')`;
          };
          img.onerror = () => {
            section.style.backgroundColor = "#1a3c61";
          };
        }
      } catch (error) {
        console.error("Error setting background image:", error);
      }
    };

    fetchBackgroundImage();

    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const handleScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const section = document.querySelector(href);
      if (section) {
        const navHeight = 64;
        const top = section.offsetTop - navHeight;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
      setIsMenuOpen(false);
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/27713122883`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white relative">
      <head>
        <title>80concept - Leading ICT Solutions & Services Provider</title>
        <meta
          name="description"
          content="80concept provides enterprise ICT infrastructure, software solutions, managed IT services, and strategic consulting. Expert in networking, cloud services, ERP systems, and digital transformation."
        />
        <meta
          name="keywords"
          content="ICT infrastructure, networking, servers, cloud services, hardware, data centers, IT infrastructure solutions, custom software development, ERP systems, application integration, software consulting, SaaS solutions, IT support, managed IT services, remote monitoring, IT maintenance, managed security services, IT strategy consulting, digital transformation, business process optimization, technology advisory, IT consulting services"
        />
        <meta
          property="og:title"
          content="80concept - Leading ICT Solutions & Services Provider"
        />
        <meta
          property="og:description"
          content="Enterprise ICT solutions including infrastructure, software development, managed services & strategic consulting"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://80concept.co.za" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "80concept",
            "url": "https://80concept.co.za",
            "logo": "https://80concept.co.za/logo.png",
            "description": "Leading ICT solutions provider specializing in infrastructure, software development, managed services, and consulting",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Bryanston Gate Office Park Office Block 4, 1st Floor",
              "addressLocality": "Bryanston",
              "postalCode": "2191",
              "addressCountry": "ZA"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+27-10-012-6507",
              "contactType": "customer service",
              "email": "helo@80concept.co.za"
            },
            "sameAs": [
              "https://www.linkedin.com/company/80concept",
              "https://twitter.com/80concept"
            ]
          }
        `}</script>
      </head>
      <nav className="bg-[#1a3c61] text-white fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold animate-title hover:animate-balloon cursor-pointer">
                80concept
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="tel:+27658336960"
                className="hover:text-[#4CAF50] flex items-center"
              >
                <i className="fas fa-phone mr-2"></i>
                +27 65 833 6960
              </a>
              <a href="#home" className="hover:text-[#4CAF50]">
                Home
              </a>
              <a href="#about" className="hover:text-[#4CAF50]">
                About
              </a>
              <a href="#services" className="hover:text-[#4CAF50]">
                Services
              </a>
              <a href="#contact" className="hover:text-[#4CAF50]">
                Contact
              </a>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <a
                href="tel:+27658336960"
                className="hover:text-[#4CAF50] flex items-center"
              >
                <i className="fas fa-phone mr-2"></i>
                +27 65 833 6960
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-button"
              >
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed top-16 w-full bg-[#1a3c61] text-white z-40 mobile-menu">
          <div className="px-4 py-2 space-y-2">
            <a href="#home" className="block hover:text-[#4CAF50]">
              Home
            </a>
            <a href="#about" className="block hover:text-[#4CAF50]">
              About
            </a>
            <a href="#services" className="block hover:text-[#4CAF50]">
              Services
            </a>
            <a href="#contact" className="block hover:text-[#4CAF50]">
              Contact
            </a>
          </div>
        </div>
      )}

      <section
        id="home"
        className="pt-16 bg-cover bg-center min-h-[600px] relative"
        style={{
          backgroundImage:
            "url('https://ucarecdn.com/d13bfe69-21a8-494e-b4d3-9a25d19f29cc/-/format/auto/')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(26, 60, 97, 0.6)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tech' Solutions
            </h1>
            <p className="text-xl mb-8">
              Empowering businesses with AI technology solutions
            </p>
            <a
              href="#contact"
              className="bg-[#4CAF50] text-white px-8 py-3 rounded-full hover:bg-[#45a049] transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 leading-relaxed">
                80concept (Pty) Ltd is a leading Information and Communication
                Technology (ICT) company dedicated to delivering innovative and
                reliable technology solutions to businesses worldwide.
                Established in 2015, we have grown to become a trusted partner
                for organisations seeking to enhance their digital
                infrastructure, optimize operations, and drive growth through
                cutting-edge technology.
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower businesses with transformative ICT solutions that
                    foster innovation, efficiency, and sustainable growth.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To be recognized on a global scale for our commitment to
                    excellence, customer satisfaction, and technological
                    advancement.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start space-x-4">
                  <i className="fas fa-brain text-[#4CAF50] text-xl mt-1"></i>
                  <div>
                    <h3 className="font-semibold mb-2">Industry Expertise</h3>
                    <p className="text-gray-600">
                      Deep understanding of ICT solutions and industry best
                      practices
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <i className="fas fa-user-check text-[#4CAF50] text-xl"></i>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Client-Centric Approach
                    </h3>
                    <p className="text-gray-600">
                      Tailored solutions that meet your specific business needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <i className="fas fa-shield-alt text-[#4CAF50] text-xl mt-1"></i>
                  <div>
                    <h3 className="font-semibold mb-2">Reliability</h3>
                    <p className="text-gray-600">
                      Consistent performance and dependable service delivery
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <i className="fas fa-chart-line text-[#4CAF50] text-xl mt-1"></i>
                  <div>
                    <h3 className="font-semibold mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">
                      Successfully delivered projects for diverse clients since
                      2015
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <i className="fas fa-headset text-[#4CAF50] text-xl mt-1"></i>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Round-the-clock assistance whenever you need it
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 relative cursor-pointer"
                style={{
                  animation:
                    activeService === index
                      ? "serviceHover 1s ease infinite"
                      : "none",
                }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                onClick={() =>
                  setActiveService(activeService === index ? null : index)
                }
              >
                <i
                  className={`fas ${service.icon} text-4xl text-[#1a3c61] mb-2`}
                ></i>
                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                <p className="text-gray-600 mb-1 text-sm">
                  {service.description}
                </p>
                <div
                  className={`md:absolute fixed md:left-0 md:right-0 left-4 right-4 bg-[#e8f5e9] p-4 rounded-lg shadow-lg transition-all duration-300 z-50 ${
                    activeService === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  style={{
                    top: window.innerWidth >= 768 ? "100%" : "50%",
                    transform:
                      window.innerWidth >= 768 ? "none" : "translateY(-50%)",
                    marginTop: window.innerWidth >= 768 ? "-1px" : "0",
                  }}
                >
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5 text-sm">
                    {service.subServices.map((subService, subIndex) => (
                      <li key={subIndex} className="leading-tight">
                        {subService}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Clientele</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-4/5">
              <h3 className="text-xl font-bold text-left mb-6 ml-[10px]">
                Corporation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {clients.map((client, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="w-[100px] h-[60px] md:w-[120px] md:h-[70px] object-contain hover:scale-110 transition-transform duration-300"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/5">
              <h3 className="text-xl font-bold text-left mb-8 ml-[10px]">
                Industry Served
              </h3>
              <div className="space-y-4 flex flex-col ml-8">
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-shield-alt text-[#4CAF50] w-8"></i>
                  <span>Defense</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-gavel text-[#4CAF50] w-8"></i>
                  <span>Law</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-home text-[#4CAF50] w-8"></i>
                  <span>Real Estate</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-oil-can text-[#4CAF50] w-8"></i>
                  <span>Petroleum</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-broadcast-tower text-[#4CAF50] w-8"></i>
                  <span>Telecommunication</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-landmark text-[#4CAF50] w-8"></i>
                  <span>Financial Sector</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-building text-[#4CAF50] w-8"></i>
                  <span>Building Facilities</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-hard-hat text-[#4CAF50] w-8"></i>
                  <span>Construction</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-industry text-[#4CAF50] w-8"></i>
                  <span>Metal Pressing</span>
                </div>
                <div className="flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
                  <i className="fas fa-mountain text-[#4CAF50] w-8"></i>
                  <span>Mining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="py-12 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border rounded"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#1a3c61] text-white px-8 py-3 rounded hover:bg-[#2c5282] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-[#1a3c61] text-xl w-8"></i>
                  <span>
                    Bryanston Gate Office Park Office Block 4, 1st Floor,
                    Bryanston, 2191
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-[#1a3c61] text-xl w-8"></i>
                  <a
                    href="tel:(+27) 10 012 6507"
                    className="hover:text-[#4CAF50] transition"
                  >
                    (+27) 10 012 6507
                  </a>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-[#1a3c61] text-xl w-8"></i>
                  <a
                    href="mailto:hi@80concept.co.za"
                    className="hover:text-[#4CAF50] transition"
                  >
                    hi@80concept.co.za
                  </a>
                </div>
                <div className="mt-4 w-full h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.5632748509745!2d28.020720815019467!3d-26.060752283495837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957359c9bd6e5d%3A0x3aed9e9a90963b34!2sBryanston%20Gate%20Office%20Park%2C%20Block%204!5e0!3m2!1sen!2sza!4v1647940435562!5m2!1sen!2sza"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#1a3c61] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 80concept (Pty) Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-[#4CAF50] text-white p-4 rounded-full shadow-lg hover:bg-[#45a049] transition animate-vibrate"
          >
            <i className="fas fa-comments text-2xl"></i>
          </button>
        )}

        <button
          onClick={handleWhatsAppClick}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </button>

        {isChatOpen && (
          <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col absolute bottom-0 right-0">
            <div className="bg-[#1a3c61] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Chat Support</h3>
              <button onClick={() => setIsChatOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-[#1a3c61] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {streamingMessage && (
                <div className="mb-4 text-left">
                  <div className="inline-block p-3 rounded-lg bg-gray-100 text-gray-800">
                    {streamingMessage}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#45a049] transition"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes serviceHover {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        @keyframes titleAnimation {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-title {
          animation: titleAnimation 1.5s ease-out forwards;
          background: linear-gradient(45deg, #ffffff, #4CAF50);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes balloon {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1.3);
          }
          75% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .hover\:animate-balloon:hover {
          animation: balloon 0.8s ease-in-out;
          transform-origin: center;
        }
        
        @keyframes scrollAnimation {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes vibrate {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, -2px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, 2px); }
          90% { transform: translate(-2px, -2px); }
        }
        
        .animate-vibrate {
          animation: vibrate 0.3s linear infinite;
          animation-duration: 3s;
        }
      `}</style>
      <style jsx global>{`
        @keyframes serviceHover {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes titleAnimation {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-title {
          animation: titleAnimation 1.5s ease-out forwards;
          background: linear-gradient(45deg, #ffffff, #4CAF50);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes balloon {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1.3); }
          75% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .hover\:animate-balloon:hover {
          animation: balloon 0.8s ease-in-out;
          transform-origin: center;
        }
        
        @keyframes scrollAnimation {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes vibrate {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, -2px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, 2px); }
          90% { transform: translate(-2px, -2px); }
        }
        
        .animate-vibrate {
          animation: vibrate 0.3s linear infinite;
          animation-duration: 3s;
        }

        @keyframes slideIn {
          from { transform: translateX(90%); }
          to { transform: translateX(0); }
        }

        @keyframes slideOut {
          from { transform: translateX(0); }
          to { transform: translateX(90%); }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
