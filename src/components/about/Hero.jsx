import Link from "next/link";
import PwaIcon from "@/images/pwa.svg";
import GithubIcon from "@/images/github.svg";
import BackgroundIllustration from "./BackgroundIllustration";
import PhoneFrame from "./PhoneFrame";
import Penumbra from "../Penumbra";

const Hero = () => {
  return (
    <div className="overflow-hidden py-20 sm:py-32 dark:bg-slate-900 lg:pb-32 xl:pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">

          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-6 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight leading-snug text-gray-900 dark:text-gray-50">
              Penumbra - encrypted local notes.
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Penumbra is a simple, secure, and private note-taking app.
              It runs entirely in your browser, and your notes are never sent to a server.
              You can even use it offline.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm">
              <Link href="/" className="inline-flex justify-center items-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80 dark:bg-slate-200 dark:hover:bg-slate-50">
                <PwaIcon className="h-6 w-6 flex-none stroke-[#D4D4D4]" />
                <span className="ml-2.5">Try Penumbra</span>
              </Link>
              <a href="https://github.com/samirelanduk/penumbra" className="bg-slate-700 text-slate-50 hover:bg-black inline-flex justify-center items-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors dark:border-slate-600">
                <GithubIcon className="h-6 w-6 flex-none fill-white" />
                <span className="ml-2.5">See on GitHub</span>
              </a>
            </div>
          </div>

          <div className="relative mt-10 sm:mt-20 lg:col-span-6 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[466px] overflow-hidden max-x-xl">
                <Penumbra preview />
              </PhoneFrame>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  
};

export default Hero;