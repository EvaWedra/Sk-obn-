# Brand Photography Skill

Pomôž mi vytvoriť AI prompt(y) pre brand fotenie / brand photoshoot.

## Čo robíš

Keď ťa používateľ požiada o brand photography prompty, postupuj takto:

1. **Opýtaj sa na brand identity** (ak ešte nevieš):
   - Aký typ produktu / značky / osoby?
   - Aká nálada / estetika? (minimalistická, luxusná, boho, streetwear, korporátna...)
   - Aká farebná paleta?
   - Cieľová platforma? (web hero banner, Instagram, e-shop, LinkedIn...)

2. **Zamkni technické parametre** — tieto musia byť IDENTICKÉ vo VŠETKÝCH promptoch jedného photoshootu:
   - Film stock (napr. `Kodak Portra 400`, `Fujifilm 400H`, `Ilford HP5`)
   - Objektív (napr. `50mm lens`, `85mm lens`, `35mm lens`)
   - Osvetlenie (napr. `strong directional afternoon light from the right`, `soft diffused studio light`, `warm rim lighting from behind`)

3. **Vygeneruj sadu promptov** pre všetky potrebné typy záberov (pozri Shot Types nižšie).

---

## Technická šablóna (základ každého promptu)

```
[SUBJECT DESCRIPTION], [SHOT TYPE], [OUTFIT/PRODUCT DETAILS],
shot on [FILM STOCK], [LENS] lens,
[LIGHTING DESCRIPTION],
[COLOR GRADING], [MOOD/ATMOSPHERE],
[BACKGROUND/SETTING],
editorial fashion photography, high-end brand campaign
```

### Príklad hotového promptu:
```
Young woman with dark curly hair, wide shot, wearing minimalist white linen dress,
shot on Kodak Portra 400 film, 85mm lens,
strong directional afternoon light from the right, warm rim lighting from behind,
muted filmic color grading, warm and airy mood,
clean white studio background with soft shadows,
editorial fashion photography, high-end brand campaign
```

---

## Shot Types — Typy záberov

### 1. Wide Shot (Celozáber)
- **Účel:** Hlavný hero banner na web, cover fotka, kampaňové plagáty
- **Framing:** Celá postava od hlavy po päty, dostatok negatívneho priestoru pre text/logo
- **Prompt modifier:** `wide shot, full body, head to toe, ample negative space for text overlay`

### 2. Three-Quarter Shot (3/4 záber)
- **Účel:** E-shop, social media feed, Instagram posts
- **Framing:** Od pol stehna nahor
- **Prompt modifier:** `three-quarter shot, framed from mid-thigh up`

### 3. Hero Shot (Hrdinský záber)
- **Účel:** Produktová stránka, homepage hero, PR materiály
- **Framing:** Dominantný subjekt, silná kompozícia, čistý background
- **Prompt modifier:** `hero shot, centered subject, bold composition, clean background`

### 4. Detail Shot (Detailný záber)
- **Účel:** Textúry, materiály, logá, švy, doplnky — Instagram carousel, blog
- **Framing:** Makro alebo close-up na konkrétny detail produktu
- **Prompt modifier:** `close-up detail shot, macro, texture focus, [specific detail]`

### 5. Lifestyle Shot (Lifestyle záber)
- **Účel:** Social media stories, email newsletter, brand storytelling
- **Framing:** Subjekt v prirodzenom kontexte / prostredí (kaviareň, príroda, dom...)
- **Prompt modifier:** `lifestyle shot, candid moment, natural environment, [location]`

### 6. Flat Lay (Zátiší zhora)
- **Účel:** Instagram, produktové stránky, e-shop thumbnaily
- **Framing:** Produkty / oblečenie rozložené na rovnej ploche, pohľad zhora
- **Prompt modifier:** `flat lay, overhead shot, bird's eye view, products arranged on [surface]`

---

## Konzistencia naprieč shootom — KĽÚČOVÉ PRAVIDLO

> Každý prompt v jednom photoshoote musí obsahovať **presne rovnaké** technické parametre.
> Ak v hero shote použiješ `Kodak Portra 400, muted filmic color grading, directional afternoon sunlight`,
> musíš tieto frázy zahrnúť aj do detail shotov aj wide shotov.
> Vynechanie film stock referencie spôsobí, že AI revertne na default lesklý digitálny štýl
> a rozbije ilúziu jedného súvislého photoshootu.

### Dobrý príklad konzistentnej sady (4 prompty, 1 photoshoot):

**Zamknuté parametre pre celý shoot:**
`Shot on Kodak Portra 400, 85mm lens, strong directional afternoon light from the right, rim lit from behind, muted filmic color grading`

**Wide Shot:**
```
[Model description], wide shot, full body, wearing [outfit],
shot on Kodak Portra 400, 85mm lens,
strong directional afternoon light from the right, rim lit from behind,
muted filmic color grading, [mood], [background],
editorial fashion photography, high-end brand campaign
```

**Three-Quarter Shot:**
```
[Model description], three-quarter shot, mid-thigh up, wearing [outfit],
shot on Kodak Portra 400, 85mm lens,
strong directional afternoon light from the right, rim lit from behind,
muted filmic color grading, [mood], [background],
editorial fashion photography, high-end brand campaign
```

**Detail Shot:**
```
Close-up detail of [specific product detail, e.g. collar, logo, fabric texture],
shot on Kodak Portra 400, 85mm lens,
strong directional afternoon light from the right, rim lit from behind,
muted filmic color grading, [mood],
editorial fashion photography, high-end brand campaign
```

**Lifestyle Shot:**
```
[Model description], candid lifestyle moment, [natural action, e.g. walking, laughing, holding coffee],
wearing [outfit], [location/setting],
shot on Kodak Portra 400, 85mm lens,
strong directional afternoon light from the right, rim lit from behind,
muted filmic color grading, [mood],
editorial fashion photography, high-end brand campaign
```

---

## Film Stock Referenčný Zoznam

| Film Stock | Výsledný efekt | Vhodné pre |
|---|---|---|
| `Kodak Portra 400` | Teplé tóny, jemné zrno, prirodzené farby | Lifestyle, módne kampane, editorial |
| `Fujifilm 400H` | Chladné tóny, pastelové farby, mäkké tiene | Luxusné značky, minimalizmus, beauty |
| `Kodak Gold 200` | Teplé zlatisté tóny, nostalgia | Outdoor, bohémska estetika, vintage |
| `Ilford HP5` | Čiernobiela, vysoký kontrast, silné zrno | Streetwear, urban, umelecký editorial |
| `Cinestill 800T` | Filmový look, žlté a azúrové halation efekty | Nočné scény, urban neon, moody kampane |
| `Lomography Color 400` | Výrazné farby, saturácia, retro | Fun brands, youth market, social media |

---

## Osvetlenie — Referenčný Zoznam

| Popis osvetlenia | Výsledný efekt |
|---|---|
| `strong directional afternoon light from the right` | Dramatické tiene, 3D hĺbka, kontrastné |
| `soft diffused studio light, large softbox` | Rovnomerné, čisté, komerčné |
| `warm golden hour sunlight from behind` | Romantické, hrejivé, backlit glow |
| `rim lighting from behind` | Obrys subjektu, oddelenie od pozadia |
| `flat overcast outdoor light` | Mäkké tiene, prirodzené farby |
| `harsh direct flash` | High-fashion editorial, raw/unfiltered |
| `candlelight / warm ambient light` | Intímna atmosféra, wellness, slow living |

---

## Platformy — Optimalizácia formátu

| Platforma | Odporúčaný shot type | Aspect ratio |
|---|---|---|
| Web hero banner | Wide Shot s negatívnym priestorom | 16:9 alebo 21:9 |
| Instagram feed post | Three-Quarter, Lifestyle | 4:5 (portrait) alebo 1:1 |
| Instagram Stories / Reels cover | Portrait záber | 9:16 |
| E-shop produkt | Three-Quarter, Detail | 1:1 alebo 4:5 |
| LinkedIn / Facebook cover | Wide Shot | 16:9 |
| Email newsletter | Lifestyle, Hero | 16:9 alebo 3:2 |

---

## Rýchly štart — Príklady podľa typu značky

### Módna / Odevná značka
```
[Gender, age, hair description] model, three-quarter shot, wearing [specific clothing item with colors and materials],
shot on Kodak Portra 400 film, 85mm lens,
strong directional afternoon light from the right, warm rim lighting from behind,
muted filmic color grading, editorial and aspirational mood,
clean neutral background (off-white or warm grey),
editorial fashion photography, high-end brand campaign, commercial quality
```

### Kozmetická / Beauty značka
```
Close-up portrait of [description], hero shot,
[product] featured prominently near the face/hands,
shot on Fujifilm 400H film, 85mm lens,
soft diffused studio light, large softbox, catchlights in eyes,
pastel color grading, clean and luxurious mood,
pure white or marble background,
beauty editorial photography, high-end cosmetics campaign
```

### Personal Brand / Podnikateľ / Koučing
```
[Description of person], lifestyle shot, candid confident moment at [location: modern workspace / cafe / outdoors],
professional yet approachable,
shot on Kodak Portra 400 film, 50mm lens,
warm natural window light from the left,
warm muted color grading, trustworthy and aspirational mood,
editorial personal brand photography, professional headshot style
```

### Produktová fotografia (bez modela)
```
[Product name and description] on [surface: marble / wood / linen / concrete],
flat lay / hero shot,
shot on Fujifilm 400H film, 50mm macro lens,
soft overhead diffused studio light,
clean pastel color grading, minimal and elegant mood,
[background color/texture],
commercial product photography, high-end brand, white background or lifestyle setting
```

---

## Výstup ktorý by si mal poskytnúť

Keď používateľ požiada o brand photography skill, poskytnúť:

1. **Zamknuté technické parametre** pre celý photoshoot (1 riadok)
2. **4–6 hotových promptov** (jeden pre každý shot type)
3. **Platformové odporúčania** kde každý záber použiť
4. Prípadne **varianty** (svetlejšia / tmavejšia nálada, indoor vs outdoor)
