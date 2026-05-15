export type Lang = "sk" | "en";

export const translations = {
  sk: {
    lang: "sk",
    langName: "Slovenčina",
    otherLang: "en",
    otherLangName: "English",
    nav: {
      home: "Domov",
      info: "Informácie",
      gallery: "Galéria",
      contact: "Kontakt",
      admin: "Admin",
    },
    home: {
      welcome: "Vitajte u nás!",
      subtitle:
        "Tu nájdete všetky praktické informácie o ubytovaní, zariadeniach a pravidlách pobytu.",
      announcementsTitle: "Aktuálne oznámenia",
      noAnnouncements: "Momentálne žiadne oznámenia.",
      cards: {
        info: {
          title: "Praktické info",
          desc: "Kuchyňa, kúpeľky, záhrada a pravidlá",
        },
        gallery: {
          title: "Galéria",
          desc: "Fotky ubytovania a priestorov",
        },
        contact: {
          title: "Napísať nám",
          desc: "Otázky, problémy alebo núdzové situácie",
        },
      },
    },
    info: {
      title: "Informácie o pobyte",
      sections: [
        {
          id: "accommodation",
          title: "Ubytovanie",
          icon: "🏠",
          content: `Vaša izba je pripravená a upratená pred príchodom. Vrecká do odpadkových košov nájdete v komode / skrinke v izbe – prosíme vymeňte ich sami pri potrebe.

Posteľná bielizeň a uteráky sú k dispozícii. Ak potrebujete výmenu, dajte nám vedieť cez formulár.

Okná a dvere zamykajte pri odchode. Kľúč noste vždy so sebou.`,
        },
        {
          id: "kitchen",
          title: "Kuchyňa",
          icon: "🍳",
          content: `K dispozícii máte plne vybavenú kuchyňu – môžete slobodne variť, piecť aj len si uvariť čaj alebo kávu.

Vybavenie kuchyne:
• Sporák a rúra
• Mikrovlnná rúra
• Chladnička a mraznička
• Riad, hrnce, panvice, príbory
• Toaster, kanvica na vodu
• Základné koreniny a olej

Pobyt u nás NIE JE all inclusive – jedlo si zabezpečujete sami. Najbližší obchod je [doplniť].

Po varení prosíme upratajte po sebe – umyte riad a nechajte kuchyňu v poriadku pre ostatných.`,
        },
        {
          id: "bathrooms",
          title: "Kúpeľky a záchody",
          icon: "🚿",
          content: `Kúpeľky a záchody sú spoločné pre všetkých hostí. Prosíme správajte sa ohľaduplne k ostatným.

• Kúpeľňa č. 1: [miesto]
• Kúpeľňa č. 2: [miesto]
• Záchod: [miesto]

Čas v kúpeľni: prosíme neblokujte dlhšie ako 30 minút v ranných hodinách (7:00–9:00).

Vlastné toaletné potreby si prineste so sebou (šampón, mydlo, uterák).

Po použití prosíme zanechajte kúpeľňu čistú – opláchnite van/sprchu a utrite vodu zo zrkadla.`,
        },
        {
          id: "garden",
          title: "Záhrada",
          icon: "🌿",
          content: `K dispozícii máte malú záhradu s posedením – ideálne miesto na relax, raňajky alebo večerné posedenie.

• Záhradný nábytok je k dispozícii
• Gril / ohnisko: [doplniť, ak je]
• Záhrada je otvorená do 22:00 (ohľad na susedov)

V záhrade prosíme udržujte ticho od 22:00 do 8:00.`,
        },
        {
          id: "wifi",
          title: "WiFi a elektrina",
          icon: "📶",
          content: `WiFi:
• Sieť: [názov siete]
• Heslo: [heslo]

Elektrické zásuvky sú štandardné slovenské (230V / 50Hz). Adaptéry pre iné typy si prineste vlastné.`,
        },
        {
          id: "rules",
          title: "Domáci poriadok",
          icon: "📋",
          content: `Prosíme dodržiavajte tieto pravidlá pre príjemný pobyt všetkých hostí:

• Nočný kľud od 22:00 do 8:00
• Nefajčiť vo vnútorných priestoroch
• Zvieratá len po dohovore s nami
• Návštevy len po dohovore s nami
• Odpad triediďte do správnych nádob
• Pri odchode zanechajte izbu v poriadku
• Škody nahláste čo najskôr

Nedodržanie pravidiel môže mať za následok predčasné ukončenie pobytu.`,
        },
        {
          id: "emergency",
          title: "Núdzové situácie",
          icon: "🚨",
          content: `V prípade núdze nás kontaktujte cez formulár (téma: Núdzová situácia) alebo priamo:

• Telefón: [doplniť číslo]
• Email: [doplniť email]

Dôležité čísla:
• Hasiči: 150
• Záchranná služba: 155
• Polícia: 158
• Tiesňová linka: 112

Lekáreň: [doplniť adresu]
Nemocnica: [doplniť adresu]`,
        },
      ],
    },
    gallery: {
      title: "Galéria",
      categories: {
        all: "Všetko",
        accommodation: "Izby",
        kitchen: "Kuchyňa",
        bathrooms: "Kúpeľky",
        garden: "Záhrada",
        common: "Spoločné priestory",
      },
      noPhotos: "Fotky čoskoro pribúdajú.",
    },
    contact: {
      title: "Napíšte nám",
      subtitle:
        "Máte otázku, problém alebo potrebujete pomoc? Pošlite nám správu.",
      form: {
        name: "Vaše meno",
        namePlaceholder: "Meno a priezvisko",
        email: "Email alebo telefón",
        emailPlaceholder: "Pre odpoveď na vašu správu",
        topic: "Téma",
        topics: [
          { value: "question", label: "Otázka" },
          { value: "problem", label: "Problém" },
          { value: "technical", label: "Technická pomoc" },
          { value: "emergency", label: "Núdzová situácia" },
          { value: "other", label: "Iné" },
        ],
        message: "Správa",
        messagePlaceholder: "Popíšte čo najpresnejšie vašu otázku alebo situáciu...",
        send: "Odoslať správu",
        sending: "Odosielam...",
        successTitle: "Správa odoslaná!",
        successMsg: "Odpovieme vám čo najskôr.",
        errorMsg: "Nastala chyba. Skúste to znova.",
        required: "Toto pole je povinné",
      },
    },
    admin: {
      title: "Admin panel",
      login: {
        title: "Prihlásenie",
        subtitle: "Prístup len pre správcov",
        password: "Heslo",
        loginBtn: "Prihlásiť sa",
        errorMsg: "Nesprávne heslo",
        logout: "Odhlásiť sa",
      },
      tabs: {
        messages: "Správy",
        announcements: "Oznámenia",
      },
      messages: {
        title: "Správy od klientov",
        empty: "Žiadne správy",
        from: "Od",
        contact: "Kontakt",
        topic: "Téma",
        message: "Správa",
        date: "Dátum",
        markRead: "Prečítané",
        unread: "Nové",
        delete: "Zmazať",
        topics: {
          question: "Otázka",
          problem: "Problém",
          technical: "Technická pomoc",
          emergency: "Núdzová situácia",
          other: "Iné",
        },
      },
      announcements: {
        title: "Oznámenia pre klientov",
        addTitle: "Nové oznámenie",
        placeholder: "Text oznámenia, ktorý uvidia klienti na úvodnej stránke...",
        add: "Zverejniť",
        delete: "Zmazať",
        empty: "Žiadne aktívne oznámenia",
        added: "Oznámenie zverejnené",
      },
    },
  },
  en: {
    lang: "en",
    langName: "English",
    otherLang: "sk",
    otherLangName: "Slovenčina",
    nav: {
      home: "Home",
      info: "Information",
      gallery: "Gallery",
      contact: "Contact",
      admin: "Admin",
    },
    home: {
      welcome: "Welcome!",
      subtitle:
        "Here you'll find all practical information about accommodation, facilities and house rules.",
      announcementsTitle: "Current announcements",
      noAnnouncements: "No announcements at the moment.",
      cards: {
        info: {
          title: "Practical info",
          desc: "Kitchen, bathrooms, garden and rules",
        },
        gallery: {
          title: "Gallery",
          desc: "Photos of accommodation and spaces",
        },
        contact: {
          title: "Message us",
          desc: "Questions, problems or emergencies",
        },
      },
    },
    info: {
      title: "Stay information",
      sections: [
        {
          id: "accommodation",
          title: "Accommodation",
          icon: "🏠",
          content: `Your room is prepared and cleaned before arrival. Bin bags can be found in the cabinet/drawer in your room – please change them yourself when needed.

Bed linen and towels are provided. If you need a change, let us know via the contact form.

Please lock windows and doors when leaving. Always carry your key with you.`,
        },
        {
          id: "kitchen",
          title: "Kitchen",
          icon: "🍳",
          content: `You have access to a fully equipped kitchen – you can freely cook, bake, or just make tea or coffee.

Kitchen equipment:
• Stove and oven
• Microwave
• Fridge and freezer
• Dishes, pots, pans, cutlery
• Toaster, kettle
• Basic spices and oil

The stay is NOT all-inclusive – you arrange your own food. The nearest shop is [to be filled in].

After cooking please clean up after yourself – wash the dishes and leave the kitchen tidy for others.`,
        },
        {
          id: "bathrooms",
          title: "Bathrooms & Toilets",
          icon: "🚿",
          content: `Bathrooms and toilets are shared by all guests. Please be considerate of others.

• Bathroom No. 1: [location]
• Bathroom No. 2: [location]
• Toilet: [location]

Bathroom time: please don't block the bathroom for more than 30 minutes during morning hours (7:00–9:00).

Bring your own toiletries (shampoo, soap, towel).

After use please leave the bathroom clean – rinse the tub/shower and wipe water from the mirror.`,
        },
        {
          id: "garden",
          title: "Garden",
          icon: "🌿",
          content: `You have access to a small garden with seating – perfect for relaxing, breakfast or an evening sit-down.

• Garden furniture available
• BBQ/firepit: [add if available]
• Garden is open until 22:00 (respect neighbours)

Please keep quiet in the garden from 22:00 to 8:00.`,
        },
        {
          id: "wifi",
          title: "WiFi & Electricity",
          icon: "📶",
          content: `WiFi:
• Network: [network name]
• Password: [password]

Electrical outlets are standard Slovak (230V / 50Hz). Bring your own adapters for other types.`,
        },
        {
          id: "rules",
          title: "House Rules",
          icon: "📋",
          content: `Please follow these rules for a pleasant stay for all guests:

• Quiet hours from 22:00 to 8:00
• No smoking inside
• Pets only by prior agreement with us
• Visitors only by prior agreement with us
• Sort waste into the correct bins
• Leave your room tidy when you check out
• Report any damage as soon as possible

Failure to comply may result in early termination of the stay.`,
        },
        {
          id: "emergency",
          title: "Emergency Situations",
          icon: "🚨",
          content: `In case of emergency contact us via the form (topic: Emergency) or directly:

• Phone: [add number]
• Email: [add email]

Emergency numbers:
• Fire brigade: 150
• Ambulance: 155
• Police: 158
• Emergency line: 112

Pharmacy: [add address]
Hospital: [add address]`,
        },
      ],
    },
    gallery: {
      title: "Gallery",
      categories: {
        all: "All",
        accommodation: "Rooms",
        kitchen: "Kitchen",
        bathrooms: "Bathrooms",
        garden: "Garden",
        common: "Common areas",
      },
      noPhotos: "Photos coming soon.",
    },
    contact: {
      title: "Message us",
      subtitle: "Have a question, problem or need help? Send us a message.",
      form: {
        name: "Your name",
        namePlaceholder: "First and last name",
        email: "Email or phone",
        emailPlaceholder: "So we can reply to your message",
        topic: "Topic",
        topics: [
          { value: "question", label: "Question" },
          { value: "problem", label: "Problem" },
          { value: "technical", label: "Technical help" },
          { value: "emergency", label: "Emergency" },
          { value: "other", label: "Other" },
        ],
        message: "Message",
        messagePlaceholder: "Describe your question or situation as clearly as possible...",
        send: "Send message",
        sending: "Sending...",
        successTitle: "Message sent!",
        successMsg: "We'll get back to you as soon as possible.",
        errorMsg: "An error occurred. Please try again.",
        required: "This field is required",
      },
    },
    admin: {
      title: "Admin panel",
      login: {
        title: "Login",
        subtitle: "Access for managers only",
        password: "Password",
        loginBtn: "Log in",
        errorMsg: "Incorrect password",
        logout: "Log out",
      },
      tabs: {
        messages: "Messages",
        announcements: "Announcements",
      },
      messages: {
        title: "Client messages",
        empty: "No messages",
        from: "From",
        contact: "Contact",
        topic: "Topic",
        message: "Message",
        date: "Date",
        markRead: "Mark read",
        unread: "New",
        delete: "Delete",
        topics: {
          question: "Question",
          problem: "Problem",
          technical: "Technical help",
          emergency: "Emergency",
          other: "Other",
        },
      },
      announcements: {
        title: "Client announcements",
        addTitle: "New announcement",
        placeholder: "Announcement text that clients will see on the home page...",
        add: "Publish",
        delete: "Delete",
        empty: "No active announcements",
        added: "Announcement published",
      },
    },
  },
} as const;

export type Translations = typeof translations.sk;

export function getT(lang: Lang): Translations {
  return translations[lang] as unknown as Translations;
}

export const supportedLangs: Lang[] = ["sk", "en"];
export const defaultLang: Lang = "sk";
