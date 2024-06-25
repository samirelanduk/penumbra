import EncryptionIcon from "@/images/encrypted.svg";
import OfflineIcon from "@/images/offline.svg";
import PwaIcon from "@/images/pwa.svg";
import FormattingIcon from "@/images/formatting.svg";
import ExportIcon from "@/images/export.svg";
import PullRequestIcon from "@/images/pr.svg";

const Features = () => {

  const features = [
    {
      title: "Secure encryption",
      Icon: EncryptionIcon,
      description: "Penumbra uses the Web Crypto API to securely encrypt your notes with a 256 bit AES key derived from your password.",
    },
    {
      title: "Offline-first",
      Icon: OfflineIcon,
      description: "Penumbra runs entirely in your browser - you can even use it offline. There is no server, and nothing leaves your device.",
    },
    {
      title: "Standalone app",
      Icon: PwaIcon,
      description: "Penumbra is a progressive web app, which means you can install it on your device and use it like a standalone app.",
    },
    {
      title: "Rich text",
      Icon: FormattingIcon,
      description: "Penumbra uses Slate.js to provide a rich text editor with support for headings, formatting, and more.",
    },
    {
      title: "File System Access",
      Icon: ExportIcon,
      description: "Penumbra uses the File System Access API to save your notes directly to your device (where supported).",
    },
    {
      title: "Open Source",
      Icon: PullRequestIcon,
      description: "Penumbra is entirely open source. You can view the source code on GitHub, and even contribute to the project if you like.",
    }
  ];

  return (
    <section className="py-20 bg-slate-100 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-slate-900">
            Take control of your notes.
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Encrypt them with a password, and keep them safe on your device.<br />No servers, no third parties, no subscriptions.
          </p>
        </div>
        <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className="rounded-2xl border border-slate-300 p-8">
              <feature.Icon className="h-8 w-8 fill-sky-800" />
              <h3 className="mt-6 font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-slate-700">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

Features.propTypes = {
  
};

export default Features;