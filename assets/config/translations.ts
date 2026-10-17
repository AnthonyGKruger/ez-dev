export type SupportedLang = "en";

export type TranslationMap = Map<string, string>;

export type Translations = Map<SupportedLang, TranslationMap>;

export const translations: Translations = new Map([
  [
    "en",
    new Map<string, string>([
      //Home
      [
        "home-hero-title",
        "Hi there, my name is Anthony & I am a Web Developer!",
      ],
      [
        "home-hero-p1",
        "I'm an ambitious and determined individual with a Bachelor's degree in information technology and {years} years of experience in web development.",
      ],
      ["home-hero-cta-line", "Looking for a Skilled Web Developer?"],
      ["home-typed-collaborate", "Let's collaborate!"],
      ["home-typed-build-together", "Let's build something together!"],
      ["home-typed-portfolio", "Have a look at my portfolio!"],
      ["home-typed-contact", "Contact me!"],

      // Contact page
      ["contact-subtitle", "Let's Build Something Together!"],
      ["contact-content", "Fill In The Form Below To Contact Me"],
      ["contact-first-name-label", "First name"],
      ["contact-first-name-placeholder", "Your name."],
      ["contact-email-label", "Email"],
      ["contact-email-placeholder", "Your Email."],
      ["contact-company-label", "Company"],
      ["contact-company-placeholder", "Your Company."],
      ["contact-comments-label", "Comments"],
      ["contact-comments-placeholder", "Your Comments."],
      ["contact-submit", "Submit"],
      [
        "contact-socials-text",
        "You can also reach me through these platforms:",
      ],
      ["contact-email-sent-success", "Your email has been sent. Thank you!"],
      [
        "contact-email-send-failed",
        "Your email could not be sent. Please try again later.",
      ],
      ["contact-verification-required", "Please complete the verification."],
      ["contact-verification-failed", "Invisible verification failed."],

      // Validation errors
      ["contact-error-name-invalid", "Please enter a valid name."],
      [
        "contact-error-name-too-short",
        "Your name cant be less than two characters.",
      ],
      [
        "contact-error-name-too-long",
        "Names can't be longer than 20 characters.",
      ],
      ["contact-error-company-required", "Your company is required."],
      [
        "contact-error-company-too-short",
        "Your company name cant be less than two characters.",
      ],
      [
        "contact-error-company-too-long",
        "Company names can't be longer than 30 characters.",
      ],
      ["contact-error-company-invalid", "Please enter a valid company name."],
      ["contact-error-comments-required", "Your comments are required."],
      [
        "contact-error-comments-too-short",
        "Your comments cant be less than two characters.",
      ],
      [
        "contact-error-comments-too-long",
        "Comments can't be longer than 200 characters.",
      ],
      ["contact-error-comments-invalid", "Please enter a valid comments."],
      ["contact-error-email-invalid", "Please enter a valid email."],

      // Navigation
      ["nav-home", "Home"],
      ["nav-about", "About"],
      ["nav-work", "Work"],
      ["nav-qualifications", "Qualifications"],
      ["nav-work-experience", "Work Experience"],
      ["nav-experience", "Experience"],
      ["nav-portfolio", "Portfolio"],
      ["nav-contact", "Contact"],
      ["nav-privacy", "Privacy"],
      ["nav-available", "TAKING ON A SMALL NUMBER OF PROJECTS"],
      ["nav-start-project", "START A PROJECT"],

      // SEO Titles
      ["home-title", "EZdev Solutions · Software studio"],
      ["about-title", "About"],
      ["qualifications-title", "Qualifications"],
      ["work-experience-title", "Work Experience"],
      ["portfolio-title", "Our work"],
      ["contact-title", "Contact"],
      ["thank-you-title", "Thank You"],
      ["privacy-policy-title", "Privacy Policy"],

      // Footer
      ["footer-all-rights-reserved", "All rights reserved."],
      [
        "footer-tagline",
        "Web development. Building fast, reliable products for teams that deliver.",
      ],
      ["footer-site", "SITE"],
      ["footer-elsewhere", "ELSEWHERE"],

      // Cookie notice
      ["cookie-title", "Cookie Policy and T's & C's"],
      [
        "cookie-text-1",
        "This website uses cookies to improve the UI and UX. By viewing my portfolio, you consent to all cookies & terms and conditions in accordance with my",
      ],
      ["cookie-privacy-policy", "Privacy Policy."],
      ["cookie-accept", "Accept"],

      // Companies

      // Portfolio
      ["portfolio-heading", "Check Out My Portfolio"],
      ["portfolio-subtitle", "Two products we own and operate, and the sites we build for clients."],
      ["portfolio-view", "View"],
      ["portfolio-referral-letter", "Referral Letter"],
      ["portfolio-code", "Code"],

      // Work Experience

      // Privacy Policy
      ["privacy-subtitle", "All About Privacy"],
      ["privacy-title", "Privacy Policy"],
      [
        "privacy-intro",
        "This privacy policy applies to ezdev.solutions and explains how I use any personal information I collect about you when you use this website.",
      ],
      ["privacy-topics-title", "Topics:"],
      ["privacy-what-info", "What information do I collect about you?"],
      ["privacy-how-use", "How will I use the information about you?"],
      ["privacy-access", "Access to your information and corrections"],
      ["privacy-cookies", "Cookies"],
      ["privacy-other-sites", "Other websites"],
      ["privacy-policy-changes", "Changes to my privacy policy"],
      ["privacy-contact-us", "How to contact me"],
      [
        "privacy-what-info-content",
        "I collect information about you when you complete a form on my website. The information you give me may include your name, company name, and email address.",
      ],
      [
        "privacy-how-use-content",
        "I collect information about you to gain a better understanding of how users are using my website to improve my personal development and provide the best user experience possible. If you contact me through my website, I will use the information provided to respond accordingly.",
      ],
      ["privacy-use-info-title", "I use your information to:"],
      ["privacy-use-contact", "Contact you if you have requested me to."],
      ["privacy-use-monitor", "Monitor site activity."],
      [
        "privacy-contact-change",
        "If you change your mind about being contacted in the future, please let us know.",
      ],
      [
        "privacy-access-content",
        "You have the right to request a copy of the information that I hold about you if you have contacted me before. If you would like a copy of some or all of your personal information, please email me at anthony@ezdev.solutions.",
      ],
      [
        "privacy-cookies-content",
        "I reserve the right to use cookies to give you the best experience on my website and to help improve the overall user experience. A cookie is a small file that is placed on your computer or mobile device when you visit a website. You can manage or delete cookies as you wish.",
      ],
      [
        "privacy-other-sites-content",
        "My website may contain links to other websites. This privacy policy only applies to this website, so when you link to other websites, you should read their own privacy policies.",
      ],
      [
        "privacy-changes-content",
        "I keep my privacy policy under regular review, and I will place any updates on this web page. This privacy policy was last updated on 02/09/2025.",
      ],
      [
        "privacy-contact-content",
        "Please contact me if you have any questions about my privacy policy or the information I hold about you.",
      ],
      ["privacy-email-label", "Email: anthony@ezdev.solutions"],

      // Error Page
      ["error-title", "Oops, something went wrong."],
      [
        "error-subtitle",
        "Try using the navigation above to navigate to a new page.",
      ],
      ["back-to-home", "Back to Home"],

      // 404 Error Page
      ["error-404-title", "Sorry, we can't find the page you are looking for."],
      [
        "error-404-subtitle",
        "Try using the navigation above to find the page you are looking for.",
      ],
      ["clear-error", "Clear Error"],
      ["go-home", "Go Home"],

      // Qualifications

      // Thank You Page
      ["thank-you-title", "Thank You!"],
      [
        "thank-you-description",
        "Thank you for contacting us. We'll get back to you shortly.",
      ],
      ["thank-you-awesome", "Awesome!"],
      [
        "thank-you-message",
        "Thank you for contacting me, I will get back to you shortly... In the meantime, why not carry on looking around?",
      ],

    ]),
  ],
]);
