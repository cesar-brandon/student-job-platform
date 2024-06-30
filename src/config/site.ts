import type { FooterItem, MainNavItem } from "@/types/site";

export type SiteConfig = typeof siteConfig;

const links = {
  website: "https://www.ifv.edu.pe/",
  facebook: "https://www.facebook.com/InstitutoFedericoVillarreal",
  linkedin:
    "https://www.linkedin.com/company/instituto-federico-villarreal/?originalSubdomain=pe",
  instagram: "https://www.instagram.com/ifvchincha/",
};

export const siteConfig = {
  name: "IFV Empleos",
  description: "Plataforma de empleos del Instituto Federico Villarreal",
  url: "https://www.ifvempleos.com",
  ogImage: "https://cesarbrandon.vercel.app/opengraph-image.png",
  mainNav: [
    {
      title: "Inicio",
      items: [
        {
          title: "Iniciar sesión",
          href: "/login",
          description: "Inicia sesión en tu cuenta.",
          items: [],
        },
        {
          title: "Registrarse",
          href: "/register",
          description: "Crea una cuenta nueva.",
          items: [],
        },
        {
          title: "Feed",
          href: "/home",
          description: "Explora las ofertas de trabajo.",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Social",
      items: [
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
        {
          title: "LinkedIn",
          href: links.linkedin,
          external: true,
        },
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },

        {
          title: "Website",
          href: links.website,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
