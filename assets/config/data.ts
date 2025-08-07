import type { IPortfolioItem } from "~/types/portfolio";
import type { IWorkExperience } from "~/types/workExperience";
import type { ISkills } from "~/types/skills";
import type { IQualification } from "~/types/qualification";

export const portfolioItems: IPortfolioItem[] = [
  {
    id: "p3",
    title: "Digital Stream",
    description:
      "Digital marketing agency website built using Next.js and Tailwind CSS \n(the code to for this" +
      " project is unfortunately not available for public viewing)",
    link: "https://digitalstream.co.za",
    image: "/media/logos/ds-logo.png",
    sourceCode: "",
    referralLetter:
      "/media/referral-letters/Digital Stream Referral Letter - Anthony Kruger - web - signed.pdf",
  },
  // {
  //   id: "p2",
  //   title: "Digital Payment Transformation Services",
  //   description:
  //     "Ecommerce app built using NextJS, Tailwind and Strapi - (still under development.)",
  //   link: "https://inhonourofalegend.vercel.app",
  //   image: "/media/logos/DPTS.png",
  //   sourceCode: "https://github.com/AnthonyGKruger/dpts-prod",
  // },
  {
    id: "p1",
    title: "Mumbi Trust Administrators",
    description: "Accounting firm website built using Next.js and Tailwind CSS",
    link: "https://mumbi.co.za",
    image: "/media/logos/mumbi-logo.png",
    sourceCode: "https://github.com/AnthonyGKruger/Mumbi-Trust-Administrators",
  },

  // {
  //   id: "p5",
  //   title: "Star Wars E-commerce App",
  //   description:
  //     "Ecommerce app built NextJS and TailWind CSS - (still under development.)",
  //   link: "https://swapi-ecommerce.vercel.app/",
  //   image: "/media/logos/star-wars-logo.svg",
  //   sourceCode: "https://github.com/AnthonyGKruger/swapi-ecommerce",
  // },
  // {
  //   id: "p6",
  //   title: "Fan Catalogue",
  //   description: "Fan Catalogue built using Next.js and Tailwind CSS.",
  //   link: "https://tlwfans.vercel.app",
  //   image: "/media/logos/TLW-logo.jpg",
  //   sourceCode: "https://github.com/AnthonyGKruger/TLWfans",
  // },
  // {
  //   id: "p4",
  //   title: "Smarten-Up Recruitment Assessment",
  //   description: "Figma mockup assessment using React.js and Tailwind CSS.",
  //   link: "https://smarten-up.vercel.app/",
  //   image:
  //     "https://smartenup-figma-test.s3.eu-central-1.amazonaws.com/assets/icon.png",
  //   sourceCode: "https://github.com/AnthonyGKruger/smarten",
  // },
];

export const workExperienceItems: IWorkExperience[] = [
  {
    id: "w5",
    company: "EZdev Solutions (PTY) Ltd",
    role: "Full Stack Web Developer",
    summary:
      "I am responsible for creating dynamic and user-friendly web applications, making use of a modern tech\n" +
      "stack that includes Next.js, React.js, and Tailwind CSS. My role involves a broad spectrum of tasks,\n" +
      "ranging from front-end development and UI/UX design to CMS integration, e-commerce solutions,\n" +
      "database management, server-side development, version control, performance optimization, security,\n" +
      "testing and debugging, documentation, collaboration, and continuous learning.",
    dateFrom: "November 2020",
    dateTo: "Present",
    comments: [
      // "Successfully completed Portfolio of evidence",
      // "Successful integration into corporate working environments",
    ],
  },
  {
    id: "w1",
    company: "DPTS (PTY) Ltd",
    role: "Full Stack Web Developer",
    summary:
      "Responsible for leading a web development team that build dynamic websites and e-commerce stores for international clients of DPTS. This includes migration of code and parameters to the quality assurance and production environments. Also, further responsible for the administration and support of the cloud hosted environments on Microsoft Azure for DPTS and its’ clients for use as web and back-office servers for the e-commerce and CRM applications. This experience has allowed me to gain hands-on experience to complement the theoretical knowledge obtained as I completed my three-year bachelor’s degree in information technology.",
    dateFrom: "November 2020",
    dateTo: "December 2022",
    comments: [
      "Successfully completed Portfolio of evidence",
      "Successful integration into corporate working environments",
    ],
  },
  {
    id: "w2",
    company: "The Lighting Warehouse: Menlyn & Centurion",
    role: "Branch Manager",
    summary:
      "Directing all operational aspects including distribution, customer service, human resources, administration and sales in accordance with the company’s objectives. Providing training, coaching, development and motivation for branch personnel. Developing forecasts and financial objectives.",
    dateFrom: "June 2018",
    dateTo: "Present",
    comments: ["Managing the flagship branch", "Team of the year"],
  },
  {
    id: "w3",
    company: "The Lighting Warehouse: Menlyn & Zambezi",
    role: "Sales Manager",
    summary: null,
    dateFrom: "August 2016",
    dateTo: "May 2018",
    comments: ["Proved my worth and transferred to flagship branch"],
  },
  {
    id: "w4",
    company: "The Lighting Warehouse: Centurion",
    role: "Sales Consultant",
    summary: null,
    dateFrom: "June 2014",
    dateTo: "July 2016",
    comments: [
      "Received two performance awards",
      "Reached managerial status after two years",
    ],
  },
  {
    id: "w5",
    company: "Precision Financial Services",
    role: "Administrator",
    summary: null,
    dateFrom: "January 2014",
    dateTo: "April 2014",
    comments: [
      "Successfully handled all incoming queries",
      "Managed all IT support issues",
    ],
  },
];

export const skills: ISkills[] = [
  {
    name: "nuxt",
    description: "My daily driver. Both professionally and personally.",
    icon: "skill-icons:nuxtjs-dark",
  },
  // {
  //   name: "vue",
  //   description: "",
  //   icon: "skill-icons:vuejs-dark",
  // },
  {
    name: "stencil",
    description: "I use this to create cross-platform components.",
    icon: "skill-icons:react-dark",
  },
  {
    name: "next",
    description: "Where my passion for webdev all started.",
    icon: "skill-icons:nextjs-light",
  },
  // {
  //   name: "react",
  //   description: "",
  //   icon: "skill-icons:react-dark",
  // },
  {
    name: "tailwindcss",
    description: "My favourite CSS framework to ship code faster!",
    icon: "skill-icons:tailwindcss-dark",
  },
  {
    name: "typescript",
    description: "For fool-proof code.",
    icon: "skill-icons:typescript",
  },
  // {
  //   name: "html",
  //   description: "Basics are just as important.",
  //   icon: "skill-icons:html",
  // },
  // {
  //   name: "css",
  //   description: "When tailwind just doesnt cut it.",
  //   icon: "skill-icons:css",
  // },
];

export const qualifications: IQualification[] = [
  {
    id: "q1",
    institution: "Richfield Graduate Institute of Technology",
    qualification: "BsC IT SAQA ID # 35954",
    dateFrom: "January 2019",
    dateTo: "December 2021",
    comments: ["Specialized in Systems Development", "8 Distinctions"],
    // link: "https://www.ezdev.solutions/media/Anthony_Gordon_kruger.pdf",
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
    comments: ["Achieved half colours for academics."],
  },
];
