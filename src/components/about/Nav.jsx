import { useEffect, useRef } from "react";

const Nav = () => {

  const ref = useRef();

  useEffect(() => {
    ref.current.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  }, []);

  const linkClass = "hover:bg-slate-100 px-4 py-2 rounded dark:hover:bg-slate-800";

  return (
    <nav className="dark:bg-slate-900">
      <div className="mx-auto flex items-center gap-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex text-sky-600 font-bold text-3xl gap-3 w-fit py-8">
          <img src="/favicon.svg" className="w-9" alt="Penumbra logo" />
          <div>Penumbra</div>
        </div>
        <div className="text-gray-500 text-sm hidden pt-1.5 gap-6 sm:flex dark:text-gray-300" ref={ref}>
          <a href="#features" className={linkClass}>Features</a>
          <a href="#faqs" className={linkClass}>FAQs</a>
          <a href="#about" className={linkClass}>About</a>
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  
};

export default Nav;