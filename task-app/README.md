# Tímové Úlohy

Interná PWA aplikácia na správu úloh a komunikáciu v tíme, postavená podľa
[`team-task-app-builder`](https://github.com/EvaWedra/team-task-app-builder) skillu.
Nahrádza chaotickú komunikáciu (Messenger, SMS, papierové lístočky) jedným
organizovaným miestom pre úlohy, zadania a notifikácie — rozdelené podľa
pobočiek, so sekciami úloh, prioritami, štítkami, fotoprílohami, komentármi,
archívom a admin panelom na správu tímu.

Toto je **demo/starter verzia** s generickým brandingom (názov, farby,
pobočky, tím) — pozri "Prispôsobenie nižšie", ako si to premenovať na
konkrétnu firmu.

## Spustenie

```bash
npm install
npm run dev
```

Otvor `http://localhost:3000/login`.

### Prihlásenie (demo dáta)

| Meno  | Rola         | Heslo                          |
| ----- | ------------ | ------------------------------- |
| Admin | Administrátor | `admin123` (alebo `ADMIN_PASSWORD` z `.env.local`) |
| Zuzka | Zamestnanec  | – (bez hesla, stačí kliknúť)    |
| Mário | Zamestnanec  | – (bez hesla, stačí kliknúť)    |
| Petra | Zamestnanec  | – (bez hesla, stačí kliknúť)    |

## Čo appka obsahuje

- **Sekcie úloh** (Týždenný plán / Nákup / Opravy / Bežné úlohy / Poznámky) rozdelené podľa pobočiek
- **Dve pobočky** (Bratislava, Košice) — zamestnanec vidí len svoje pridelené pobočky, admin vidí všetky
- **Obojsmerná komunikácia** — zamestnanci aj admin vytvárajú úlohy, komentujú a menia stav
- **Priority, štítky, fotoprílohy, opakovanie úloh, komentáre**
- **Archív** dokončených úloh, mazanie iba pre admina
- **In-app notifikácie** s počtom neprečítaných
- **Admin panel** — pridávanie/odstraňovanie členov tímu a správa prístupu do pobočiek
- **Dark/Light režim**, mobile-first dizajn so spodnou navigáciou
- **PWA** — `manifest.json` + service worker, dá sa nainštalovať na plochu telefónu

## Prispôsobenie pre konkrétnu firmu

Väčšina brandingu je na jednom mieste v [`lib/config.ts`](lib/config.ts):

- `appConfig` — názov appky, firma, farby, tagline
- `branches` — zoznam pobočiek
- `sections` — sekcie úloh, ikony, admin-only flag
- `defaultTags`, `priorityLabels`, `statusLabels`

Farby UI sa menia v [`tailwind.config.ts`](tailwind.config.ts) (`brand.*`, `gold.*`).
Členov tímu spravuje admin priamo v appke (`/admin`), alebo uprav
[`data/users.json`](data/users.json) pred prvým spustením.

Ikonu appky (teal gradient + checkmark) vygeneruje `npm run gen:icons`
(skript [`scripts/generate-icons.mjs`](scripts/generate-icons.mjs)) — uprav
farby priamo v skripte a spusti znova pre novú ikonu.

## Poznámky k rozsahu (čo chýba oproti plnému nasadeniu)

- **Úložisko** je súborové (`data/*.json`) — vhodné na demo/malý tím; pre
  produkčné nasadenie na viacerých serveroch (napr. Vercel) treba nahradiť
  reálnou databázou (Supabase/Firebase/Postgres).
- **E-mailové notifikácie** nie sú zapojené (chýba SMTP/e-mail provider) —
  appka rieši notifikácie in-app.
- **Fulltextové vyhľadávanie** úloh nie je implementované.
