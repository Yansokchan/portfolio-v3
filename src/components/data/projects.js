import ecom from "../../assets/ecom.png";
import cal from "../../assets/cal.jpg";
import rps from "../../assets/rps.webp";
import pfl1 from "../../assets/pfl1.png";
import pfl2 from "../../assets/pfl2.png";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Static E-commerce solution with HTML, CSS and JAVASCRIPT.",
    image: ecom,
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    link: "https://yansokchan.github.io/semicolon/home.html",
  },
  {
    id: 2,
    title: "Calculator",
    description: "Simple Calculator using HTML, CSS and JAVASCRIPT.",
    image: cal,
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    link: "https://yansokchan.github.io/calculator/calculator.html",
  },
  {
    id: 3,
    title: "Rock Paper Scissor",
    description: "Rock Paper Scissor game using HTML, CSS and JAVASCRIPT.",
    image: rps,
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    link: "https://yansokchan.github.io/RPS/rock-paper-scissors.html",
  },
  {
    id: 4,
    title: "First Portfolio",
    description: "Portfolio V1 using React Vite and Tailwind CSS.",
    image: pfl1,
    tech: ["Vite", "Tailwind CSS"],
    link: "https://yansokchan.github.io/my-portfolio/",
  },
  {
    id: 5,
    title: "New Portfolio",
    description:
      "Portfolio V2 using React Vite, Tailwind CSS, GSAP and Daisy Ui.",
    image: pfl2,
    tech: ["Vite", "Tailwind CSS", "GSAP", "Daisy Ui"],
    link: "https://yansokchan.github.io/portfolio/",
  },
];
export default projects;
