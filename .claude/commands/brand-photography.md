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

## KROK 3 — Prostredie a nálada

Opýtaj sa VŠETKY TRI otázky naraz:

> "Posledné 3 otázky pred generovaním:
>
> 1. **Platforma** — kde skončia tieto fotky? (web hero banner / Instagram feed / e-shop / LinkedIn / stories / viacero?)
> 2. **Štýl značky** — aká je nálada? (luxusná / casual / minimalistická / boho / streetwear / korporátna / iné?)
> 3. **Prostredie** — máš niečo konkrétne v hlave (napr. Paríž, štúdio, príroda)? Alebo mám navrhnúť 3 možnosti podľa oblečenia?"

Ak chcú návrh, navrhni 3 prostredí ktoré pasujú k outfitu a nechaj vybrať.

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
4. **Prostredie** — konzistentné naprieč zábermi
5. **Uzamknuté technické parametre** — film stock, objektív, svetlo

**Formát každého promptu:**

```
[TYP ZÁBERU] — [PLATFORMA]

[POPIS MODELA], [TYP ZÁBERU FRAMING], wearing [PRESNÝ OPIS OBLEČENIA].
[PROSTREDIE A SCÉNA].
[UZAMKNUTÉ TECHNICKÉ PARAMETRE].
[FAREBNÁ GRADÁCIA], [NÁLADA].
Editorial fashion photography, high-end brand campaign.
DO NOT change: model appearance, clothing colors, clothing style.
```

### 6 typov záberov:

**1. Široký záber** — web hero banner, plagát
- Framing: `full body head to toe, ample negative space above for text overlay`

**2. Trištvrtový záber** — Instagram feed, e-shop
- Framing: `three-quarter shot, framed from mid-thigh up, looking directly at camera`

**3. Bočný profil** — silueta, štruktúra oblečenia
- Framing: `side profile, looking away from camera, full silhouette visible`

**4. Detailný záber** — textúra, materiál, doplnky
- Framing: `extreme close-up, focus on [najzaujímavejší detail outfitu: látka / kabelka / topánky / golier]`

**5. Zadný uhol** — splývavosť, zadné detaily
- Framing: `rear angle shot, model walking away or looking back over shoulder`

**6. Lifestyle záber** — stories, newsletter, brand storytelling
- Framing: `candid lifestyle moment, natural movement [walking / laughing / holding coffee / sitting]`

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
