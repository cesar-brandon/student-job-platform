import Link from "next/link";
import { FacebookIcon, InstagramIcon, WebsiteIcon } from "@/components/common/Icons";

export function Footer() {
  const items = [
    {
      title: "Mi cuenta",
      href: "/login",
    },
    {
      title: "Registrarme",
      href: "/register",
    },
    {
      title: "Encuestas",
      href: "/encuesta",
    },
    {
      title: "Términos",
      href: "#",
    },
    {
      title: "Privacidad",
      href: "#",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/InstitutoFedericoVillarreal",
      icon: <FacebookIcon aria-hidden="true" />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ifvchincha/",
      icon: <InstagramIcon aria-hidden="true" />,
    },
    {
      name: "Website",
      href: "http://ifv.edu.pe/",
      icon: <WebsiteIcon aria-hidden="true" />,
    },
  ];

  return (
    <section >
      <div className="max-w-screen-xl px-4 py-12 mx-auto overflow-hidden sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2 items-center">
          {items.map(({ title, href }, index) => (
            <div key={index} className="px-5 py-2">
              <Link
                href={href}
                className="text-base leading-6 text-gray-500 hover:text-gray-900"
                aria-label={title}
              >
                {title}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex items-center justify-center space-x-6">
          {socialMedia.map(({ name, href, icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{name}</span>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
