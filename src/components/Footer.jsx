const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          {["Github", "LinkedIn", "Telegram", "Email"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              data-aos="zoom-in"
            >
              {item}
            </a>
          ))}
        </div>
        <p className="text-gray-400">©2025 SOKCHAN YAN. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
