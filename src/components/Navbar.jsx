import { useState } from "react";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home"); // Default active link

  const handleClick = (item) => {
    setActiveLink(item); // Update active link on click
  };

  return (
    <nav
      data-aos="fade-down"
      className="fixed top-3 left-0 w-full flex justify-center items-center px-2 z-[100]"
    >
      <div className="440:px-8 220:px-4 py-1 rounded-xl shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
        <div className="p-2 md:p-3">
          <ul className="flex flex-wrap justify-center gap-1 md:gap-6 md:flex-nowrap 220:gap-3">
            {["Home", "Portfolio", "Services", "Contact"].map((item) => (
              <li key={item} className="relative group">
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-gray-200 hover:text-cyan-400 220:text-[15px] md:text-base font-medium transition-all duration-300 no-underline ${
                    activeLink === item ? "text-cyan-400" : ""
                  }`}
                  onClick={() => handleClick(item)}
                >
                  {/* Text */}
                  <span className="relative">
                    {item}
                    {/* Desktop Underline */}
                    <span
                      className={`block absolute -bottom-1 left-0 h-[2px] bg-cyan-400 transition-all duration-500 ${
                        activeLink === item
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
