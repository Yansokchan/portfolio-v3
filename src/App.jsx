import Aurora from "./components/Aurora.jsx";
import CanvasBackground from "./components/CanvasBackground.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Recommend from "./components/Recommend.jsx";
import ScrollWrapper from "./components/ScrollWrapper.jsx";
import Services from "./components/Services.jsx";
import Comments from "./components/Comments.jsx";
import Squares from "./components/squares.jsx";
function App() {
  return (
    <ScrollWrapper>
      {/* <Aurora /> */}
      <Squares />
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      {/* <CanvasBackground /> */}
      <Navbar />
      <Hero />
      <Projects />
      <Comments />

      <Services />
      <Contact />
      <Footer />
    </ScrollWrapper>
  );
}

export default App;
