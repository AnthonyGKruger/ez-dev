import type { IPortfolioItem } from "~/types/portfolio";
import type { IWorkExperience } from "~/types/workExperience";
import type { ISkills } from "~/types/skills";
import type { IQualification } from "~/types/qualification";

export const portfolioItems: IPortfolioItem[] = [
  {
    id: "p3",
    title: "Digital Stream",
    description: "portfolio-ds-desc",
    link: "https://digitalstream.co.za",
    image: "/media/logos/ds-logo.png",
    sourceCode: "",
    referralLetter:
      "/media/referral-letters/Digital Stream Referral Letter - Anthony Kruger - web - signed.pdf",
  },
  {
    id: "p1",
    title: "Mumbi Trust Administrators",
    description: "portfolio-mumbi-desc",
    link: "https://mumbi.co.za",
    image: "/media/logos/mumbi-logo.png",
    sourceCode: "https://github.com/AnthonyGKruger/Mumbi-Trust-Administrators",
  },
];

export const workExperienceItems: IWorkExperience[] = [
  {
    id: "w7",
    company: "Osiris Trading (Pty) Ltd",
    role: "role-front-end-web-developer",
    summary: "summary-osiris",
    dateFrom: "October 2024",
    dateTo: "Present",
    comments: [],
  },
  {
    id: "w5",
    company: "EZdev Solutions (PTY) Ltd",
    role: "role-full-stack-web-developer",
    summary: "summary-ezdev",
    dateFrom: "November 2020",
    dateTo: "September 2024",
    comments: [],
  },
  {
    id: "w1",
    company: "DPTS (PTY) Ltd",
    role: "role-full-stack-web-developer",
    summary: "summary-dpts",
    dateFrom: "November 2020",
    dateTo: "December 2022",
    comments: ["comment-completed-poe", "comment-integration-corporate"],
  },
  {
    id: "w2",
    company: "The Lighting Warehouse: Menlyn & Centurion",
    role: "role-branch-manager",
    summary: "summary-lw-branch-manager",
    dateFrom: "June 2018",
    dateTo: "September 2024",
    comments: ["comment-managing-flagship-branch", "comment-team-of-the-year"],
  },
  {
    id: "w3",
    company: "The Lighting Warehouse: Menlyn & Zambezi",
    role: "role-sales-manager",
    summary: null,
    dateFrom: "August 2016",
    dateTo: "May 2018",
    comments: ["comment-proved-worth-transfer-flagship"],
  },
  {
    id: "w4",
    company: "The Lighting Warehouse: Centurion",
    role: "role-sales-consultant",
    summary: null,
    dateFrom: "June 2014",
    dateTo: "July 2016",
    comments: [
      "comment-two-performance-awards",
      "comment-reached-managerial-after-two-years",
    ],
  },
  {
    id: "w6",
    company: "Precision Financial Services",
    role: "role-administrator",
    summary: null,
    dateFrom: "January 2014",
    dateTo: "April 2014",
    comments: [
      "comment-handled-incoming-queries",
      "comment-managed-it-support",
    ],
  },
];

export const skills: ISkills[] = [
  {
    name: "nuxt",
    description: "skills-nuxt-desc",
    icon: "skill-icons:nuxtjs-dark",
  },
  {
    name: "stencil",
    description: "skills-stencil-desc",
    icon: "skill-icons:react-dark",
  },
  {
    name: "next",
    description: "skills-next-desc",
    icon: "skill-icons:nextjs-light",
  },
  {
    name: "tailwindcss",
    description: "skills-tailwind-desc",
    icon: "skill-icons:tailwindcss-dark",
  },
  {
    name: "typescript",
    description: "skills-typescript-desc",
    icon: "skill-icons:typescript",
  },
];

export const qualifications: IQualification[] = [
  {
    id: "q1",
    institution: "Richfield Graduate Institute of Technology",
    qualification: "BsC IT SAQA ID # 35954",
    dateFrom: "January 2019",
    dateTo: "December 2021",
    comments: ["qual-systems-dev-specialized", "qual-8-distinctions"],
  },
  {
    id: "q10",
    institution: "Udemy",
    qualification: "The Nuxt 3 Bootcamp - The Complete Developer Guide",
    dateFrom: "June 2025",
    dateTo: "June 2025",
    comments: [],
    link: "https://www.ude.my/UC-32411633-c966-4999-a6ae-dcf78d2634a8/",
  },
  {
    id: "q9",
    institution: "Udemy",
    qualification: "Understanding TypeScript",
    dateFrom: "January 2024",
    dateTo: "January 2024",
    comments: [],
    link: "https://ude.my/UC-46def24d-ef97-401e-bd1d-c6f82ceaa605",
  },
  {
    id: "q8",
    institution: "Udemy",
    qualification:
      "React - The Complete Guide 2024 (incl. React Router & Redux)",
    dateFrom: "December 2023",
    dateTo: "January 2024",
    comments: [],
    link: "https://ude.my/UC-1215eba0-6856-407b-9d7d-91a49469e4c9",
  },
  {
    id: "q7",
    institution: "Udemy",
    qualification: "Next.js 14 & React - The Complete Guide",
    dateFrom: "November 2023",
    dateTo: "December 2023",
    comments: [],
    link: "https://ude.my/UC-a8475fc7-ea9f-4f40-9eb1-31f973a73b5a",
  },
  {
    id: "q3",
    institution: "Udemy",
    qualification: "CSS - The Complete Guide 2023 (incl. Flexbox, Grid & Sass)",
    dateFrom: "August 2023",
    dateTo: "November 2023",
    comments: [],
    link: "https://ude.my/UC-7da085a8-c110-4724-b20f-452494369b0e",
  },
  {
    id: "q2",
    institution: "Udemy",
    qualification: "The Complete Web Developer in 2022: Zero to Mastery",
    dateFrom: "May 2022",
    dateTo: "August 2022",
    comments: [],
    link: "https://ude.my/UC-1d4f7fd3-ec81-4317-b99d-5747cbcd16ac",
  },
  {
    id: "q4",
    institution: "MiTx Online",
    qualification:
      "6.00.2x Introduction to Computational Thinking and Data Science",
    dateFrom: "November 2018",
    dateTo: "December 2018",
    comments: [],
    link: "https://courses.edx.org/certificates/fa03b6b8c0a04312945e938093948cd2",
  },
  {
    id: "q5",
    institution: "MiTx Online",
    qualification:
      "6.00.1x: Introduction to Computer Science and Programming Using Python",
    dateFrom: "August 2018",
    dateTo: "November 2018",
    comments: [],
    link: "https://courses.edx.org/certificates/4a21f40f94dc4d5da93426422982fc1b",
  },
  {
    id: "q6",
    institution: "Lyttleton Manor High School",
    qualification: "National Senior Certificate",
    dateFrom: "January 2006",
    dateTo: "December 2010",
    comments: ["qual-half-colours-academics"],
  },
];
