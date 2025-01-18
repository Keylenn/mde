import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import pkg from "./package.json";

const projectName = pkg.name;
const title = projectName.toLocaleUpperCase();

const config: Config = {
  title: title,
  tagline: pkg.description,
  favicon: "img/favicon.ico",

  url: "https://mde.keylenn.top",
  baseUrl: "/",

  organizationName: "Keylenn",
  projectName,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: `https://github.com/Keylenn/${projectName}/blob/master`,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title,
      logo: {
        alt: `${projectName} Logo`,
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/docs/front-end/data-management/boxly/intro",
          label: "Boxly",
          position: "left",
        },
        {
          href: "https://github.com/Keylenn/mde",
          label: "GitHub 🌟",
          position: "right",
          className: "github-entry breathe",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} ${title}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: "WWLY8VSHU4",
      apiKey: "5b9e1b0bf7b576fc555a375e4736d665",
      indexName: "mde-keylenn",
    },
  },
};
export default config;
