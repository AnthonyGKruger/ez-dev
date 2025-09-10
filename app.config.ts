export default defineAppConfig({
  seo: {
    title: "EZdev Solutions",
    description:
      "Front End Web Developer portfolio: projects, skills, work experience, and contact.",
  },
  schemaOrg: {
    identity: {
      "@type": "Person",
      name: "Anthony Gordon Kruger",
      url: process.env.NUXT_PUBLIC_SITE_URL,
      sameAs: [
        "https://github.com/AnthonyGKruger",
        "https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/",
      ],
      jobTitle: "Front End Web Developer",
    },
  },
});
