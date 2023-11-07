import GithubIcon from "@/images/github.svg?react";
import TwitterIcon from "@/images/twitter.svg?react";
import LinkedinIcon from "@/images/linkedin.svg?react";

const Footer = () => {

  const linkClass = "w-7 h-auto fill-sky-700 transition duration-500 hover:fill-sky-600";

  return (
    <footer className="border-t bg-slate-700 text-slate-300">
      <div className="mx-auto max-w-7xl px-8 pt-16 pb-10 sm:px-12 lg:px-8">
        <div className="flex items-center text-sky-600 font-bold text-3xl gap-3 w-fit mx-auto mb-10">
          <img src="/favicon.svg" className="w-9" alt="Penumbra logo" />
          <div>Penumbra</div>
        </div>
        <div className="text-center text-sm sm:text-base leading-loose md:text-lg mb-6">
          Penumbra is made by <a href="https://samireland.com" className="underline">Sam Ireland - a developer/occasional writer</a> based in London.
        </div>
        <div className="flex gap-4 w-fit mx-auto">
          <a href="https://github.com/samirelanduk"><GithubIcon className={linkClass} /></a>
          <a href="https://twitter.com/samirelanduk"><TwitterIcon className={linkClass} /></a>
          <a href="https://linkedin.com/in/samirelanduk"><LinkedinIcon className={linkClass} /></a>
        </div>
        <div className="text-slate-400 text-sm text-center w-full border-t pt-10  mt-8 border-slate-500">
          &copy; {new Date().getFullYear()} Sam Ireland
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  
};

export default Footer;