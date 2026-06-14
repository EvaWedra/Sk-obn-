# Brand Photography Skill

Keď je tento skill spustený, postupuj presne podľa týchto krokov. Nepreskoč žiadny krok a čakaj na potvrdenie pred každým ďalším.

---

## KROK 1 — Analyzuj oblečenie

Pozri sa na priloženú fotku oblečenia a opíš PRESNE čo vidíš:
- Každý kus oblečenia: typ, strih, farba (ultra konkrétna — nie "červená" ale "sýta šarlátová červená ako logo Coca-Coly, NOT burgundy, NOT maroon")
- Doplnky: kabelka, topánky, šperky, čiapka...
- Materiál ak je viditeľný: ľan, denim, pletenina, bavlna...
- Vzory: ak sú pruhy, opíš ich šírku a typ ("bold equal-width horizontal stripes, NOT fine stripes")

Opýtaj sa:
> "Vidím toto oblečenie: [tvoj opis]. Je to správne, alebo mám niečo opraviť?"

Počkaj na potvrdenie. Ak používateľ opraví niečo, aktualizuj opis.

### Špeciálny prípad — len jeden kus oblečenia

Ak vidíš len **jeden kus**, opýtaj sa:
> "Vidím len [názov kusu]. Chceš:
> - **A)** Navrhniem 3 outfit kombinácie — ty vyberieš
> - **B)** Ty mi dopovieš čo k tomu chceš obliecť
> - **C)** Zvyšok outfitu nechaj neutrálny (jednoduché džínsy / čisté tričko / tenisky) — hero kus je tento jeden"

Počkaj na odpoveď a uzamkni celý outfit pred pokračovaním.

---

## KROK 2 — Model / Modelka

Opýtaj sa:
> "Máš fotku modelky alebo modela?
> - **A) Áno — mám ju v Geme alebo inom nastavení nástroja** → prompty budú obsahovať len odkaz na referenčnú fotku, žiadny dlhý opis
> - **B) Áno — prikladám ju teraz** → prompty budú obsahovať len odkaz na priloženú fotku
> - **C) Nie, nemám fotku** → Claude navrhne popis, ty ho schválíš a Claude ho vloží celý do každého promptu"

**Ak A alebo B:** Uzamkni nasledovnú frázu ktorú vložíš do každého promptu:
> `Maintain exact same model appearance as the reference photo. Same face, hair, skin tone, body type, do not change.`

**Ak C:** Opýtaj sa na základné parametre (pohlavie, vek, farba vlasov, typ postavy, štýl) a navrhni presný popis. Čakaj na potvrdenie. Uzamknutý popis vlož celý, slovo za slovom, do každého promptu.

---

## KROK 3 — Nástroj, prostredie a nálada

Opýtaj sa všetky naraz:

> "Niekoľko otázok pred generovaním:
>
> 1. **Nástroj** — čo používaš na generovanie obrázkov?
>    - Gemini (Gem)
>    - Midjourney
>    - DALL-E / ChatGPT
>    - Ideogram
>    - Neviem / niečo iné
>
> 2. **Platforma** — kde skončia tieto fotky? (Instagram / Facebook / Vinted / web / e-shop / stories / viacero?)
>
> 3. **Nálada značky** — aký štýl? (luxusná / casual / minimalistická / boho / streetwear / French girl / korporátna / iné?)
>
> 4. **Prostredie** — máš niečo konkrétne v hlave? Alebo navrhniem 3 možnosti podľa oblečenia?
>
> 5. **Štýl fotenia:**
>    - **Profesionálny módny fotograf na lokácii** — modelka vie že je fotená, zámerný pohyb, ale prostredie okolo nej je reálne a živé
>    - **Candid / street style** — modelka je súčasťou scény, nikto ju špeciálne nefotí, zachytená v prirodzenom momente"

Ak chcú návrh prostredia, navrhni 3 možnosti ktoré pasujú k outfitu a nálada. Čakaj na výber.

---

## KROK 4 — Uzamkni technické parametre

Podľa nálady a prostredia vyber a uzamkni pre CELÝ shoot:

| Nálada | Film stock | Objektív | Svetlo |
|---|---|---|---|
| Teplý / casual / lifestyle | Kodak Portra 400 | 85mm | Warm directional afternoon sunlight |
| Luxusný / editorial / clean | Fujifilm 400H | 85mm | Soft diffused natural daylight |
| Dramatický / streetwear | Ilford HP5 (B&W) | 50mm | Harsh directional side light |
| Svieži / boho / outdoor | Kodak Gold 200 | 50mm | Warm golden hour backlight |
| French girl / parisian | Kodak Portra 400 | 85mm | Soft warm natural afternoon light |

Oznám:
> "Pre celý shoot uzamknem: [parametre]. Všetkých 6 záberov bude vyzerať ako jeden konzistentný shoot."

---

## KROK 5 — Vygeneruj 6 promptov

### POVINNÉ PRAVIDLÁ PRE KAŽDÝ PROMPT

**Pravidlo 1 — Živé prostredie:**
Každý prompt musí opisovať čo sa deje OKOLO modelky — nie len kde stojí.
Ľudia okolo nej majú vlastný život. Scéna existuje nezávisle od nej.

- Zlé: `standing in front of a busy restaurant`
- Dobré: `seated at a corner table inside a packed restaurant, waiter passing behind her carrying a tray, other diners laughing at a nearby table`

**Pravidlo 2 — Štýl fotografa:**

*Profesionálny módny fotograf:*
Pridaj: `shot on location by a fashion photographer, model is the deliberate subject, surrounding environment fully alive and real, people around her naturally going about their activities`
Modelka má zámerný ale prirodzený pohyb — nie stŕpnutú pózu:
`adjusting her cap mid-laugh` / `glancing over her shoulder` / `caught mid-stride` / `turning toward camera with natural smile`

*Candid / street style:*
Pridaj: `candid documentary style, shot as if captured by a bystander, model is part of the crowd, unbothered by the camera, genuine unposed moment`
Modelka má prirodzený pohyb bez pózovania:
`laughing at something off-camera` / `checking her phone` / `sipping coffee` / `walking through the crowd`

**Pravidlo 3 — Model:**
- Ak má referenčnú fotku (A alebo B z Kroku 2): `Maintain exact same model appearance as the reference photo. Same face, hair, skin tone, body type, do not change.`
- Ak nemá fotku (C): plný uzamknutý popis slovo za slovom

**Pravidlo 4 — Oblečenie vždy v texte:**
Presný opis oblečenia v každom prompte vrátane negatívnych opisov pre farby a vzory.

---

### Formát každého promptu:

```
[MODEL — odkaz na foto ALEBO plný popis]
[TYP ZÁBERU + framing]
wearing [PRESNÝ OPIS OBLEČENIA s negatívnymi opismi]
[KONKRÉTNA AKCIA / GESTO — nikdy len státie]
[PROSTREDIE — čo sa deje okolo nej]
[ŠTÝL FOTOGRAFA]
[UZAMKNUTÉ TECHNICKÉ PARAMETRE]
[FAREBNÁ GRADÁCIA a NÁLADA]
DO NOT change: model appearance, clothing colors, clothing style.
```

---

### 6 typov záberov:

**1. Široký záber** — web banner, hlavná Vinted fotka, Facebook cover
Framing: `full body head to toe, ample negative space for text overlay`
Akcia: pohyb — `mid-stride` / `walking` / `looking back`

**2. Trištvrtový záber** — Instagram feed, e-shop, Vinted listing
Framing: `three-quarter shot, framed from mid-thigh up`
Akcia: priamy kontakt s kamerou alebo prirodzený pohyb

**3. Bočný profil** — Instagram, Facebook
Framing: `side profile, full silhouette visible`
Akcia: pohľad do prostredia, zaujatá scénou — `gazing at shop window` / `watching the street`

**4. Detailný záber** — Vinted (textúra / materiál / doplnok)
Framing: `extreme close-up, focus on [najzaujímavejší detail: vzor látky / kabelka / topánky / šperky]`
Prostredie jemne naznačené v bokeh pozadí

**5. Zadný uhol** — Vinted, Instagram
Framing: `rear angle shot`
Akcia: `walking into the scene` / `looking back over shoulder with a smile` / `stepping into the crowd`

**6. Lifestyle záber** — Facebook stories, newsletter, candid
Framing: `candid lifestyle moment`
Akcia: konkrétny prirodzený moment s emóciou — `laughing, holding coffee cup` / `browsing market stalls` / `chatting with someone`

---

## KROK 6 — Konzistencia podľa nástroja

Po vygenerovaní promptov pridaj nástroj-špecifické inštrukcie:

### Gemini Gem
> **Skopíruj toto do systémových inštrukcií svojho Gemu (raz, nie každý prompt):**
>
> `Always maintain this exact model: [plný popis modelky ak nemá foto / "model from reference photo" ak má]`
> `Always maintain this exact clothing: [plný opis oblečenia s negatívnymi opismi]`
>
> Potom každý prompt môže byť kratší — Gem si pamätá zvyšok.
> **Dôležité:** Pre každý záber začni nový chat v Geme, nie pokračuj v tom istom — predchádza to driftu.

### Midjourney
> Použij `--cref [URL fotky modelky]` na udržanie tváre naprieč zábermi.
> Prvý prompt vlož bez `--cref`, získaj seed z výsledku (`Job ID`), potom použi `--seed [číslo]` v každom ďalšom prompte pre konzistenciu.

### DALL-E / ChatGPT
> Každý prompt musí byť plne sebestačný (plný opis modela + oblečenia).
> Začni novú konverzáciu pre každý záber — predchádza driftu.

### Neznámy nástroj / Generic
> Prompty sú navrhnuté ako plne sebestačné — obsahujú všetko.
> **Kľúčová rada:** Začni novú konverzáciu / nový chat pre každý záber zvlášť. Ak vložíš viac promptov za sebou do toho istého chatu, AI začne driftovať a meniť detaily oblečenia a tváre.

---

## Poznámky pre Claude

- Nikdy nepreskočí krok — každý čaká na potvrdenie
- Oblečenie vždy v texte promptu, vždy s negatívnymi opismi pre farby a vzory
- Model: referenčná fráza ak má foto / plný opis ak nemá
- Prostredie: vždy opisuje čo sa deje OKOLO, nie len kde sa nachádza
- Akcia: každý záber má konkrétny pohyb alebo gesto — nikdy len státie
- Technické parametre: identické vo všetkých 6 promptoch
- Ak používateľ povie že niečo nie je správne, oprav a regeneruj len ten jeden prompt
