# Brand Photography Skill

Keď je tento skill spustený, postupuj presne podľa týchto krokov. Nepreskoč žiadny krok.

---

## KROK 1 — Analyzuj oblečenie

Pozri sa na priloženú fotku oblečenia a opíš PRESNE čo vidíš:

- Každý kus oblečenia (typ, strih, farba — buď ultra konkrétny: nie "červená" ale "sýta šarlátová červená ako logo Coca-Coly")
- Doplnky (kabelka, topánky, šperky, čiapka...)
- Materiál ak je viditeľný (ľan, denim, pletenina, hodváb...)

Potom sa opýtaj:
> "Vidím toto oblečenie: [tvoj opis]. Je to správne, alebo mám niečo opraviť?"

Počkaj na potvrdenie. Ak používateľ opraví niečo, aktualizuj opis.

---

### Špeciálny prípad — len jeden kus oblečenia

Ak na fotke vidíš len **jeden kus** (napr. len košeľu, len nohavice, len bundu), opýtaj sa:

> "Vidím len [názov kusu]. Chceš:
>
> A) Navrhniem 3 outfit kombinácie ktoré k tomu pasujú — ty vyberieš
> B) Ty mi dopovieš čo k tomu chceš obliecť
> C) Zvyšok outfitu nechaj neutrálny (klasické džínsy / čisté biele tričko / jednoduché tenisky) — hero kus je tento jeden"

Počkaj na odpoveď a podľa toho uzamkni celý outfit pred pokračovaním.

---

## KROK 2 — Uzamkni model

Opýtaj sa:

> "Kto bude modelka/model na fotkách? Vyber jednu možnosť:
>
> A) Mám prednastavenú modelku/modela (napr. v Gemini Geme) — len mi povedz ako vyzerá alebo prikladáš jej/jeho fotku
> B) Prikladám fotku modelky/modela — Claude ju prečíta a uzamkne popis
> C) Claude nech navrhne modelku/modela — poviem len základné parametre (pohlavie, vek, štýl)"

Na základe odpovede uzamkni **PRESNÝ fyzický popis modela** — tento popis musí byť slovo za slovom IDENTICKÝ vo všetkých 6 promptoch. Napríklad:
> `young woman, long dark wavy hair, olive skin, tall and slim, natural makeup, neutral confident expression`

Potvrď popis s používateľom pred pokračovaním.

---

## KROK 3 — Prostredie, nálada a štýl fotografa

Opýtaj sa VŠETKY ŠTYRI otázky naraz:

> "Posledné otázky pred generovaním:
>
> 1. **Platforma** — kde skončia tieto fotky? (web hero banner / Instagram feed / e-shop / LinkedIn / stories / viacero?)
> 2. **Štýl značky** — aká je nálada? (luxusná / casual / minimalistická / boho / streetwear / korporátna / iné?)
> 3. **Prostredie** — máš niečo konkrétne v hlave (napr. Paríž, štúdio, príroda)? Alebo mám navrhnúť 3 možnosti podľa oblečenia?
> 4. **Štýl fotenia** — ktorý z týchto dvoch?
>    - **Profesionálny fashion fotograf:** fotograf vedome fotí modelku, ona je stredobod záberu, prostredie okolo nej žije ale ona je v popredí — výsledok: módna kampaň na reálnom mieste
>    - **Candid / street style:** modelka je súčasťou scény, nikto ju špeciálne nefotí, zachytená v prirodzenom momente — výsledok: vyzerá ako náhodná fotka niekoho kto bol práve tam"

Ak chcú návrh prostredia, navrhni 3 možnosti ktoré pasujú k outfitu a nechaj vybrať.

---

## KROK 4 — Zamkni technické parametre

Na základe štýlu značky a prostredia vyber film stock + osvetlenie a UZAMKNI ich pre celý shoot:

**Teplý / lifestyle / casual:**
`Shot on Kodak Portra 400, 85mm lens, warm directional afternoon sunlight, muted filmic color grading`

**Luxusný / editorial / minimalistický:**
`Shot on Fujifilm 400H, 85mm lens, soft diffused studio light, cool clean color grading`

**Dramatický / streetwear / urban:**
`Shot on Ilford HP5 black and white film, 50mm lens, harsh directional side light, high contrast`

**Svieži / outdoor / boho:**
`Shot on Kodak Gold 200, 50mm lens, warm golden hour backlight, airy bright color grading`

Oznám používateľovi vybrané parametre:
> "Pre celý shoot uzamknem: [parametre]. Všetkých 6 záberov bude vyzerať ako jeden konzistentný shoot."

---

## KROK 5 — Vygeneruj 6 promptov

Teraz vygeneruj VŠETKÝCH 6 záberov. Každý prompt musí obsahovať:
1. **Uzamknutý popis modela** — slovo za slovom rovnaký
2. **Uzamknutý opis oblečenia** — presné farby, strih, doplnky
3. **Typ záberu** — špecifický framing
4. **Prostredie so životom** — čo sa deje OKOLO modelky (nie len kde stojí)
5. **Uzamknuté technické parametre** — film stock, objektív, svetlo

---

### PRAVIDLO ŽIVÉHO PROSTREDIA — POVINNÉ PRE KAŽDÝ PROMPT

**Každý prompt musí opisovať čo sa deje OKOLO modelky, nielen kde sa nachádza.**
Ľudia okolo nej žijú vlastným životom. Scéna existovala pred ňou a bude existovať po nej.
Modelka nie je prilepená na pozadie — je jeho súčasťou.

**Zlé:** `standing in front of a busy restaurant`
**Dobré:** `seated at a small corner table inside a packed restaurant, waiter passing behind her, other diners laughing at a nearby table, warm ambient noise suggested by the scene`

---

### PRAVIDLO ŠTÝLU FOTOGRAFA

Aplikuj podľa výberu v Kroku 3:

**A) Profesionálny fashion fotograf:**
- Modelka vie že je fotená, jej pohyb je zámerný ale prirodzený
- Fotograf stojí blízko, vedome ju vyberá z prostredia ako subjekt
- Scéna okolo nej je reálna a živá, nie studio backdrop
- Pridaj do promptu: `shot on location by a fashion photographer, model is the deliberate subject, surrounding environment fully alive and real, people around her naturally going about their activities`
- Modelka má konkrétnu **akciu alebo gesto** — nie statickú pózu:
  - `adjusting her cap mid-laugh` / `turning toward the camera with a natural smile` / `glancing over her shoulder` / `caught mid-stride`

**B) Candid / street style:**
- Modelka je súčasťou davu, nikto ju špeciálne nefotí
- Pôsobí dojmom že o fotoaparáte nevie alebo ho ignoruje
- Ľudia okolo nej ju nevnímajú — ona je jednou z nich
- Pridaj do promptu: `candid documentary style, shot as if captured by a bystander with a phone or small camera, model is part of the crowd, unaware or unbothered by the camera, people around her going about their own business, genuine unposed moment`
- Modelka má **prirodzený pohyb** — nie pózovanie:
  - `laughing at something off-camera` / `checking her phone` / `sipping coffee, looking at the field` / `walking through the crowd`

---

### Formát každého promptu:

```
[TYP ZÁBERU] — [PLATFORMA]

[POPIS MODELA], [TYP ZÁBERU FRAMING], wearing [PRESNÝ OPIS OBLEČENIA].
[KONKRÉTNA AKCIA / GESTO modelky].
[PROSTREDIE — čo sa deje okolo nej, kto je tam, aká je atmosféra].
[ŠTÝL FOTOGRAFA — fashion on location ALEBO candid].
[UZAMKNUTÉ TECHNICKÉ PARAMETRE].
[FAREBNÁ GRADÁCIA], [NÁLADA].
DO NOT change: model appearance, clothing colors, clothing style.
```

---

### 6 typov záberov:

**1. Široký záber** — web hero banner, plagát
- Framing: `full body head to toe, ample negative space above for text overlay`
- Akcia: pohyb alebo gesto — nikdy len státie

**2. Trištvrtový záber** — Instagram feed, e-shop
- Framing: `three-quarter shot, framed from mid-thigh up`
- Akcia: priamy kontakt s kamerou alebo prirodzený pohyb

**3. Bočný profil** — silueta, štruktúra oblečenia
- Framing: `side profile, full silhouette visible`
- Akcia: pohľad do prostredia, zaujatá scénou okolo nej

**4. Detailný záber** — textúra, materiál, doplnky
- Framing: `extreme close-up, focus on [najzaujímavejší detail: látka / kabelka / topánky / šperky / golier]`
- Prostredie v pozadí jemne naznačené (bokeh)

**5. Zadný uhol** — silueta, detaily zozadu
- Framing: `rear angle shot`
- Akcia: `walking into the scene` / `looking back over shoulder` / `stepping into the crowd`

**6. Lifestyle záber** — stories, newsletter, brand storytelling
- Framing: `candid lifestyle moment`
- Akcia: konkrétny prirodzený moment s emóciou — smiech, pohyb, interakcia s prostredím

---

## KROK 6 — Inštrukcie pre konzistenciu

Po vygenerovaní promptov pridaj tieto praktické tipy:

> **Pre Gemini Gem:** Vlož každý prompt zvlášť + prikladaj vždy tú istú referenčnú fotku modela. Na začiatok každého promptu pridaj: *"Maintain exact same model appearance as established. Same face, hair, skin tone, body type."*
>
> **Pre Midjourney:** Použij `--seed [číslo]` — rovnaké seed číslo vo všetkých 6 promptoch zabezpečí konzistenciu modela. Odporúčam najprv vygenerovať model samotný bez oblečenia, získať seed a použiť ho všade.
>
> **Ak AI zmení farbu oblečenia:** Pridaj na koniec promptu: *"CRITICAL: [farba] must be [presný opis farby ako napr. vivid scarlet red, same as Coca-Cola logo, NOT burgundy, NOT maroon, NOT dark red]"*

---

## Poznámky pre Claude

- Nikdy nepreskočí kroky — každý krok čaká na potvrdenie
- Popis modela musí byť IDENTICKÝ (copy-paste) v každom z 6 promptov
- Technické parametre musia byť IDENTICKÉ v každom z 6 promptov  
- Farby oblečenia opisuj vždy s referenciou (napr. "vivid red like Coca-Cola logo" nie len "red")
- Ak používateľ povie že niečo nie je správne, oprav a regeneruj len ten jeden prompt
