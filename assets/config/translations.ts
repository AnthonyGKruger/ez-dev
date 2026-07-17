export type SupportedLang = "en" | "af";

export type TranslationMap = Map<string, string>;

export type Translations = Map<SupportedLang, TranslationMap>;

export const translations: Translations = new Map([
  [
    "en",
    new Map<string, string>([
      //About
      ["languages-i-am-fluent-in", "Languages I am fluent in."],
      ["keep-up-with-the-lingo", "Keep up with the lingo"],

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
      ["nav-skills", "Skills"],
      ["nav-qualifications", "Qualifications"],
      ["nav-work-experience", "Work Experience"],
      ["nav-experience", "Experience"],
      ["nav-languages", "Languages"],
      ["nav-portfolio", "Portfolio"],
      ["nav-contact", "Contact"],
      ["nav-privacy", "Privacy"],
      ["nav-available", "AVAILABLE FOR SELECT PROJECTS"],
      ["nav-location", "PRETORIA, ZA · UTC+2"],
      ["nav-start-project", "START A PROJECT"],

      // SEO Titles
      ["home-title", "Home"],
      ["about-title", "About"],
      ["skills-title", "Skills"],
      ["qualifications-title", "Qualifications"],
      ["work-experience-title", "Work Experience"],
      ["languages-title", "Languages"],
      ["portfolio-title", "Portfolio"],
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

      // Download resume
      [
        "download-resume-heading",
        "Want to skip through all of this? Download my resume below:",
      ],
      ["download-resume-button", "Download Resume"],

      // Cookie notice
      ["cookie-title", "Cookie Policy and T's & C's"],
      [
        "cookie-text-1",
        "This website uses cookies to improve the UI and UX. By viewing my portfolio, you consent to all cookies & terms and conditions in accordance with my",
      ],
      ["cookie-privacy-policy", "Privacy Policy."],
      ["cookie-accept", "Accept"],

      // Companies

      // Languages page labels
      ["language-english", "English"],
      ["language-afrikaans", "Afrikaans"],

      // Portfolio
      ["portfolio-heading", "Check Out My Portfolio"],
      ["portfolio-subtitle", "Dominating The Web One Project At A Time"],
      ["portfolio-view", "View"],
      ["portfolio-referral-letter", "Referral Letter"],
      ["portfolio-code", "Code"],

      // Work Experience

      // Skills

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
  [
    "af",
    new Map<string, string>([
      //About
      ["languages-i-am-fluent-in", "Tale waarin ek vlot is."],
      ["keep-up-with-the-lingo", "Bly op hoogte van die jargon"],

      //Home
      [
        "home-hero-title",
        "Hallo, my naam is Anthony en ek is 'n Webontwikkelaar!",
      ],
      [
        "home-hero-p1",
        "Ek is 'n ambisieuse en vasberade individu met 'n Baccalaureusgraad in inligtingstegnologie en {years} jaar se ondervinding in webontwikkeling.",
      ],
      ["home-hero-cta-line", "Op soek na 'n Vaardige Webontwikkelaar?"],
      ["home-typed-collaborate", "Kom ons werk saam!"],
      ["home-typed-build-together", "Kom ons bou saam iets!"],
      ["home-typed-portfolio", "Kyk gerus na my portefeulje!"],
      ["home-typed-contact", "Kontak my!"],

      // Contact page
      ["contact-subtitle", "Kom ons bou saam iets!"],
      ["contact-content", "Vul die vorm hieronder in om my te kontak"],
      ["contact-first-name-label", "Voornaam"],
      ["contact-first-name-placeholder", "Jou naam."],
      ["contact-email-label", "E-pos"],
      ["contact-email-placeholder", "Jou e-pos."],
      ["contact-company-label", "Maatskappy"],
      ["contact-company-placeholder", "Jou maatskappy."],
      ["contact-comments-label", "Kommentaar"],
      ["contact-comments-placeholder", "Jou kommentaar."],
      ["contact-submit", "Dien in"],
      ["contact-socials-text", "Jy kan my ook via hierdie platforms bereik:"],
      ["contact-email-sent-success", "Jou e-pos is gestuur. Dankie!"],
      [
        "contact-email-send-failed",
        "Jou e-pos kon nie gestuur word nie. Probeer asseblief later weer.",
      ],
      [
        "contact-verification-required",
        "Voltooi asseblief die verifikasie.",
      ],
      ["contact-verification-failed", "Onsigbare verifikasie het misluk."],

      // Validation errors
      ["contact-error-name-invalid", "Voer asseblief 'n geldige naam in."],
      [
        "contact-error-name-too-short",
        "Jou naam kan nie minder as twee karakters wees nie.",
      ],
      [
        "contact-error-name-too-long",
        "Name kan nie langer as 20 karakters wees nie.",
      ],
      ["contact-error-company-required", "Jou maatskappy is verpligtend."],
      [
        "contact-error-company-too-short",
        "Jou maatskappy se naam kan nie minder as twee karakters wees nie.",
      ],
      [
        "contact-error-company-too-long",
        "Maatskappyname kan nie langer as 30 karakters wees nie.",
      ],
      [
        "contact-error-company-invalid",
        "Voer asseblief 'n geldige maatskappynaam in.",
      ],
      ["contact-error-comments-required", "Jou kommentaar is verpligtend."],
      [
        "contact-error-comments-too-short",
        "Jou kommentaar kan nie minder as twee karakters wees nie.",
      ],
      [
        "contact-error-comments-too-long",
        "Kommentaar kan nie langer as 200 karakters wees nie.",
      ],
      [
        "contact-error-comments-invalid",
        "Voer asseblief geldige kommentaar in.",
      ],
      ["contact-error-email-invalid", "Voer asseblief 'n geldige e-pos in."],

      // Navigation
      ["nav-home", "Tuis"],
      ["nav-about", "Oor"],
      ["nav-work", "Werk"],
      ["nav-skills", "Vaardighede"],
      ["nav-qualifications", "Kwalifikasies"],
      ["nav-work-experience", "Werkservaring"],
      ["nav-experience", "Ervaring"],
      ["nav-languages", "Tale"],
      ["nav-portfolio", "Portefeulje"],
      ["nav-contact", "Kontak"],
      ["nav-privacy", "Privaatheid"],
      ["nav-available", "BESKIKBAAR VIR SELEKTE PROJEKTE"],
      ["nav-location", "PRETORIA, ZA · UTC+2"],
      ["nav-start-project", "BEGIN 'N PROJEK"],

      // SEO Titles
      ["home-title", "Tuis"],
      ["about-title", "Oor"],
      ["skills-title", "Vaardighede"],
      ["qualifications-title", "Kwalifikasies"],
      ["work-experience-title", "Werkservaring"],
      ["languages-title", "Tale"],
      ["portfolio-title", "Portefeulje"],
      ["contact-title", "Kontak"],
      ["thank-you-title", "Dankie"],
      ["privacy-policy-title", "Privaatheidsbeleid"],

      // Footer
      ["footer-all-rights-reserved", "Alle regte voorbehou."],
      [
        "footer-tagline",
        "Webontwikkeling. Bou vinnige, betroubare produkte vir spanne wat lewer.",
      ],
      ["footer-site", "WEBWERF"],
      ["footer-elsewhere", "ELDERS"],

      // Download resume
      [
        "download-resume-heading",
        "Wil jy alles oorslaan? Laai my CV hieronder af:",
      ],
      ["download-resume-button", "Laai CV af"],

      // Cookie notice
      ["cookie-title", "Koe policy en Bepalings & Voorwaardes"],
      [
        "cookie-text-1",
        "Hierdie webwerf gebruik koekies om die UI en UX te verbeter. Deur my portefeulje te besigtig, stem jy in tot alle koekies & bepalings en voorwaardes ooreenkomstig my",
      ],
      ["cookie-privacy-policy", "Privaatheidsbeleid."],
      ["cookie-accept", "Aanvaar"],

      // Companies

      // Languages page labels
      ["language-english", "Engels"],
      ["language-afrikaans", "Afrikaans"],

      // Portfolio
      ["portfolio-heading", "Kyk na my portefeulje"],
      ["portfolio-subtitle", "Heers oor die web een projek op 'n slag"],
      ["portfolio-view", "Bekyk"],
      ["portfolio-referral-letter", "Verwysingsbrief"],
      ["portfolio-code", "Kode"],

      // Work Experience

      // Skills

      // Privacy Policy
      ["privacy-subtitle", "Alles oor Privaatheid"],
      ["privacy-title", "Privaatheidsbeleid"],
      [
        "privacy-intro",
        "Hierdie privaatheidsbeleid is van toepassing op ezdev.solutions en verduidelik hoe ek enige persoonlike inligting wat ek oor jou versamel gebruik wanneer jy hierdie webwerf gebruik.",
      ],
      ["privacy-topics-title", "Onderwerpe:"],
      ["privacy-what-info", "Watter inligting versamel ek oor jou?"],
      ["privacy-how-use", "Hoe sal ek die inligting oor jou gebruik?"],
      ["privacy-access", "Toegang tot jou inligting en regstellings"],
      ["privacy-cookies", "Koekies"],
      ["privacy-other-sites", "Ander webwerwe"],
      ["privacy-policy-changes", "Veranderinge aan my privaatheidsbeleid"],
      ["privacy-contact-us", "Hoe om my te kontak"],
      [
        "privacy-what-info-content",
        "Ek versamel inligting oor jou wanneer jy 'n vorm op my webwerf voltooi. Die inligting wat jy my gee kan jou naam, maatskappynaam en e-posadres insluit.",
      ],
      [
        "privacy-how-use-content",
        "Ek versamel inligting oor jou om 'n beter begrip te kry van hoe gebruikers my webwerf gebruik om my persoonlike ontwikkeling te verbeter en die beste gebruikerservaring moontlik te bied. As jy my deur my webwerf kontak, sal ek die verskafde inligting gebruik om dienooreenkomstig te reageer.",
      ],
      ["privacy-use-info-title", "Ek gebruik jou inligting om:"],
      [
        "privacy-use-contact",
        "Jou te kontak as jy my gevra het om dit te doen.",
      ],
      ["privacy-use-monitor", "Werfaktiwiteit te monitor."],
      [
        "privacy-contact-change",
        "As jy van gedagte verander oor om in die toekoms gekontak te word, laat ons asseblief weet.",
      ],
      [
        "privacy-access-content",
        "Jy het die reg om 'n kopie van die inligting wat ek oor jou hou te vra as jy my voorheen gekontak het. As jy 'n kopie van sommige of al jou persoonlike inligting wil hê, stuur asseblief vir my 'n e-pos by anthony@ezdev.solutions.",
      ],
      [
        "privacy-cookies-content",
        "Ek behou die reg voor om koekies te gebruik om jou die beste ervaring op my webwerf te gee en om die algehele gebruikerservaring te help verbeter. 'n Koekie is 'n klein lêer wat op jou rekenaar of mobiele toestel geplaas word wanneer jy 'n webwerf besoek. Jy kan koekies bestuur of uitvee soos jy wil.",
      ],
      [
        "privacy-other-sites-content",
        "My webwerf kan skakels na ander webwerwe bevat. Hierdie privaatheidsbeleid is slegs van toepassing op hierdie webwerf, so wanneer jy na ander webwerwe skakel, moet jy hul eie privaatheidsbeleide lees.",
      ],
      [
        "privacy-changes-content",
        "Ek hou my privaatheidsbeleid onder gereelde hersiening, en ek sal enige opdaterings op hierdie webblad plaas. Hierdie privaatheidsbeleid is laas opgedateer op 02/09/2025.",
      ],
      [
        "privacy-contact-content",
        "Kontak my asseblief as jy enige vrae oor my privaatheidsbeleid of die inligting wat ek oor jou hou het.",
      ],
      ["privacy-email-label", "E-pos: anthony@ezdev.solutions"],

      // Error Page
      ["error-title", "Oeps, iets het verkeerd gegaan."],
      [
        "error-subtitle",
        "Probeer die navigasie hierbo gebruik om na 'n nuwe bladsy te navigeer.",
      ],
      ["back-to-home", "Terug na Tuis"],

      // 404 Error Page
      [
        "error-404-title",
        "Jammer, ons kan nie die bladsy vind waarvoor jy soek nie.",
      ],
      [
        "error-404-subtitle",
        "Probeer die navigasie hierbo gebruik om die bladsy te vind waarvoor jy soek.",
      ],
      ["clear-error", "Vee Fout Uit"],
      ["go-home", "Gaan Tuis"],

      // Qualifications

      // Thank You Page
      ["thank-you-title", "Dankie!"],
      [
        "thank-you-description",
        "Dankie dat jy ons gekontak het. Ons sal binnekort antwoord.",
      ],
      ["thank-you-awesome", "Wonderlik!"],
      [
        "thank-you-message",
        "Dankie dat jy my gekontak het, ek sal binnekort by jou terugkom... Intussen, hoekom kyk jy nie gerus rond nie?",
      ],

    ]),
  ],
]);
