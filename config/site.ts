export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Papercrane",
  description: "Write your story in papercrane. Anytime. Anywhere. Anyway",
  navItems: [
    {
      label: "Stories",
      href: "/",
    },
    {
      label: "Write",
      href: "/create",
    },
  ],
  navMenuItems: [
    {
      label: "Stories",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/surzia/papercrane",
  },
};
