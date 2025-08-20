export type SupportedLang = "en" | "af";

export type TranslationMap = Map<string, string>;

export type Translations = Map<SupportedLang, TranslationMap>;

// Central translations map using Map. Keys are kebab-case identifiers.
export const translations: Translations = new Map([
  [
    "en",
    new Map<string, string>([
      //About
      ["languages-i-am-fluent-in", "Languages I am fluent in."],
      ["keep-up-with-the-lingo", "Keep up with the lingo"],
      ["about-hero-title", "About Me!"],
      [
        "about-hero-p1",
        "Fueled by a passion for technology and a knack for problem-solving, I'm a Full Stack Web Developer with a drive to craft intuitive and impactful web experiences.",
      ],
      [
        "about-hero-p2",
        "My journey began in the dynamic world of retail, where I honed my leadership and customer-centric skills as a Branch Manager. While exceeding sales targets and building a thriving team, I discovered a hidden passion for web development. This led me to pursue a Bachelor's degree in Information Technology, graduating in 2021 with a comprehensive understanding of web principles.",
      ],
      [
        "about-hero-p3",
        "Now, I'm eager to combine my technical expertise with my customer-first approach to become a valuable asset to your team. Whether you're looking to build a brand-new website, revamp an existing one, or integrate innovative features, I'm confident I can deliver solutions that exceed expectations.",
      ],
      [
        "about-hero-p4",
        "Let's build the web together! I'm excited to discuss your project and showcase how my unique blend of experience and technical knowledge can bring your vision to life. Feel free to reach out through my contact form and let's connect!",
      ],
      ["cta-lets-chat", "Let's Chat"],

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
      [
        "contact-error-company-invalid",
        "Please enter a valid company name.",
      ],
      [
        "contact-error-comments-required",
        "Your comments are required.",
      ],
      [
        "contact-error-comments-too-short",
        "Your comments cant be less than two characters.",
      ],
      [
        "contact-error-comments-too-long",
        "Comments can't be longer than 200 characters.",
      ],
      [
        "contact-error-comments-invalid",
        "Please enter a valid comments.",
      ],
      ["contact-error-email-invalid", "Please enter a valid email."],

      // Navigation
      ["nav-home", "Home"],
      ["nav-about", "About"],
      ["nav-skills", "Skills"],
      ["nav-qualifications", "Qualifications"],
      ["nav-work-experience", "Work Experience"],
      ["nav-languages", "Languages"],
      ["nav-portfolio", "Portfolio"],
      ["nav-contact", "Contact"],
      ["nav-privacy", "Privacy"],

      // Footer
      ["footer-all-rights-reserved", "All rights reserved."],

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
      [
        "companies-heading",
        "Some Of The Awesome Companies That I Have Worked With",
      ],

      // Languages page labels
      ["language-english", "English"],
      ["language-afrikaans", "Afrikaans"],

      // Portfolio
      ["portfolio-heading", "Check Out My Portfolio"],
      ["portfolio-subtitle", "Dominating The Web One Project At A Time"],
      ["portfolio-view", "View"],
      ["portfolio-referral-letter", "Referral Letter"],
      ["portfolio-code", "Code"],
      ["portfolio-ds-desc", "Digital marketing agency website built using Next.js and Tailwind CSS (the code for this project is unfortunately not available for public viewing)"],
      ["portfolio-mumbi-desc", "Accounting firm website built using Next.js and Tailwind CSS"],

      // Work Experience
      ["work-heading", "Check Out My Work Experience Below"],
      ["work-subtitle", "Hard Work & Perseverance"],
      ["role-full-stack-web-developer", "Full Stack Web Developer"],
      ["role-branch-manager", "Branch Manager"],
      ["role-sales-manager", "Sales Manager"],
      ["role-sales-consultant", "Sales Consultant"],
      ["role-administrator", "Administrator"],
      ["summary-ezdev", "I am responsible for creating dynamic and user-friendly web applications using a modern stack including Next.js, React.js, and Tailwind CSS. My role spans front-end development, UI/UX, CMS and e-commerce integrations, database and server-side development, version control, performance optimization, security, testing, debugging, documentation, collaboration, and continuous learning."],
      ["summary-dpts", "Led a web development team building dynamic websites and e-commerce stores for international clients. Migrated code and parameters to QA and production and administered Microsoft Azure cloud environments for web and back-office servers. This provided hands-on experience complementing my Bachelor's degree in Information Technology."],
      ["comment-completed-poe", "Successfully completed Portfolio of Evidence"],
      ["comment-integration-corporate", "Successful integration into corporate working environments"],
      ["comment-managing-flagship-branch", "Managing the flagship branch"],
      ["comment-team-of-the-year", "Team of the year"],
      ["comment-proved-worth-transfer-flagship", "Proved my worth and transferred to flagship branch"],
      ["comment-two-performance-awards", "Received two performance awards"],
      ["comment-reached-managerial-after-two-years", "Reached managerial status after two years"],
      ["comment-handled-incoming-queries", "Successfully handled all incoming queries"],
      ["comment-managed-it-support", "Managed all IT support issues"],

      // Skills
      ["skills-heading", "Some Of The Skills & Awesome Technologies I Use!"],
      ["skills-nuxt-desc", "My daily driver. Both professionally and personally."],
      ["skills-stencil-desc", "I use this to create cross-platform components."],
      ["skills-next-desc", "Where my passion for web dev all started."],
      ["skills-tailwind-desc", "My favourite CSS framework to ship code faster!"],
      ["skills-typescript-desc", "For fool-proof code."],
    ]),
  ],
  [
    "af",
    new Map<string, string>([
      //About
      ["languages-i-am-fluent-in", "Tale waarin ek vlot is."],
      ["keep-up-with-the-lingo", "Bly op hoogte van die jargon"],
      ["about-hero-title", "Oor My!"],
      [
        "about-hero-p1",
        "Gedryf deur 'n passie vir tegnologie en 'n aanvoeling vir probleemoplossing, is ek 'n webontwikkelaar met 'n dryfkrag om intuïtiewe en impakvolle web-ervarings te skep.",
      ],
      [
        "about-hero-p2",
        "My reis het begin in die dinamiese wêreld van kleinhandel, waar ek my leierskap- en kliëntgefokusde vaardighede as 'n Takbestuurder geslyp het. Terwyl ek verkoopsdoelwitte oortref en 'n florerende span gebou het, het ek 'n verborge passie vir webontwikkeling ontdek. Dit het my gelei om 'n Baccalaureusgraad in Inligtingstegnologie te volg, en ek het in 2021 gegradueer met 'n omvattende begrip van webbeginsels.",
      ],
      [
        "about-hero-p3",
        "Nou is ek gretig om my tegniese kundigheid te kombineer met my kliënt-eerste benadering om 'n waardevolle bate vir u span te word. Of u nou 'n splinternuwe webwerf wil bou, 'n bestaande een wil opknap, of innoverende kenmerke wil integreer, ek is vol vertroue dat ek oplossings kan lewer wat verwagtinge oortref.",
      ],
      [
        "about-hero-p4",
        "Kom ons bou die web saam! Ek is opgewonde om u projek te bespreek en te wys hoe my unieke mengsel van ervaring en tegniese kennis u visie tot lewe kan bring. Voel vry om my te kontak deur my kontakvorm en kom ons skakel!",
      ],
      ["cta-lets-chat", "Kom gesels"],

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
      ["home-typed-collaborate", "Kom ons saamwerk!"],
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
      [
        "contact-socials-text",
        "Jy kan my ook via hierdie platforms bereik:",
      ],
      ["contact-email-sent-success", "Jou e-pos is gestuur. Dankie!"],
      [
        "contact-email-send-failed",
        "Jou e-pos kon nie gestuur word nie. Probeer asseblief later weer.",
      ],

      // Validation errors
      [
        "contact-error-name-invalid",
        "Voer asseblief 'n geldige naam in.",
      ],
      [
        "contact-error-name-too-short",
        "Jou naam kan nie minder as twee karakters wees nie.",
      ],
      [
        "contact-error-name-too-long",
        "Name kan nie langer as 20 karakters wees nie.",
      ],
      [
        "contact-error-company-required",
        "Jou maatskappy is verpligtend.",
      ],
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
      [
        "contact-error-comments-required",
        "Jou kommentaar is verpligtend.",
      ],
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
      ["nav-skills", "Vaardighede"],
      ["nav-qualifications", "Kwalifikasies"],
      ["nav-work-experience", "Werkservaring"],
      ["nav-languages", "Tale"],
      ["nav-portfolio", "Portefeulje"],
      ["nav-contact", "Kontak"],
      ["nav-privacy", "Privaatheid"],

      // Footer
      ["footer-all-rights-reserved", "Alle regte voorbehou."],

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
      [
        "companies-heading",
        "Sommige van die ongelooflike maatskappye waarmee ek gewerk het",
      ],

      // Languages page labels
      ["language-english", "Engels"],
      ["language-afrikaans", "Afrikaans"],

      // Portfolio
      ["portfolio-heading", "Kyk na my portefeulje"],
      ["portfolio-subtitle", "Heers oor die web een projek op 'n slag"],
      ["portfolio-view", "Bekyk"],
      ["portfolio-referral-letter", "Verwysingsbrief"],
      ["portfolio-code", "Kode"],
      ["portfolio-ds-desc", "Digitale bemarkingsagentskap-webwerf gebou met Next.js en Tailwind CSS (die kode vir hierdie projek is ongelukkig nie publiek beskikbaar nie)"],
      ["portfolio-mumbi-desc", "Rekenmeestersfirma-webwerf gebou met Next.js en Tailwind CSS"],

      // Work Experience
      ["work-heading", "Kyk na my werkservaring hieronder"],
      ["work-subtitle", "Harde werk en deursettingsvermoë"],
      ["role-full-stack-web-developer", "Volstapel Webontwikkelaar"],
      ["role-branch-manager", "Takbestuurder"],
      ["role-sales-manager", "Verkoopsbestuurder"],
      ["role-sales-consultant", "Verkoopsconsultant"],
      ["role-administrator", "Administrateur"],
      ["summary-ezdev", "Ek is verantwoordelik vir die skep van dinamiese en gebruikersvriendelike webtoepassings met 'n moderne stapel wat Next.js, React.js en Tailwind CSS insluit. My rol sluit front-end ontwikkeling, UI/UX, CMS- en e-handel-integrasies, databasis- en bedienerkant-ontwikkeling, weergawebeheer, werkverrigting-optimalisering, sekuriteit, toetsing en ontfouting, dokumentasie, samewerking en voortdurende leer in."],
      ["summary-dpts", "Het 'n webontwikkelingspan gelei wat dinamiese webwerwe en e-handelswinkels vir internasionale kliënte gebou het. Kode en parameters na QA en produksie gemigreer en Microsoft Azure-wolkomgewings vir web- en rugkantoorbedieners geadministreer. Dit het praktiese ervaring gebied wat my Baccalaureusgraad in Inligtingstegnologie aangevul het."],
      ["comment-completed-poe", "Portefeulje van Bewyse suksesvol voltooi"],
      ["comment-integration-corporate", "Suksesvolle integrasie in korporatiewe werksomgewings"],
      ["comment-managing-flagship-branch", "Bestuur van die vlagskip-tak"],
      ["comment-team-of-the-year", "Span van die jaar"],
      ["comment-proved-worth-transfer-flagship", "Waarde bewys en oorgeplaas na vlagskip-tak"],
      ["comment-two-performance-awards", "Twee prestasietoekennings ontvang"],
      ["comment-reached-managerial-after-two-years", "Bestuursvlak na twee jaar bereik"],
      ["comment-handled-incoming-queries", "Alle inkomende navrae suksesvol hanteer"],
      ["comment-managed-it-support", "Alle IT-ondersteuningskwessies bestuur"],

      // Skills
      ["skills-heading", "Van die vaardighede en wonderlike tegnologieë wat ek gebruik!"],
      ["skills-nuxt-desc", "My daaglikse keuse. Professioneel en persoonlik."],
      ["skills-stencil-desc", "Ek gebruik dit om kruisplatform-komponente te bou."],
      ["skills-next-desc", "Waar my passie vir webontwikkeling begin het."],
      ["skills-tailwind-desc", "My gunsteling CSS-raamwerk om vinniger te lewer!"],
      ["skills-typescript-desc", "Vir foutvaste kode."],
    ]),
  ],
]);
