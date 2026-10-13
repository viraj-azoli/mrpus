# MRP Home Solutions & Realty Web Platform

Official website for **MRP Home Solutions & Realty** (`mrpus.com`).

> **"Interior & Exterior Specialists that will be your Real Estate Agent"**  
> *Building | Buying | Selling*  
> **Contractor License #C151670** (Commercial & Residential | Fully Insured | Preferred Contractor)

---

## Executive Overview & Value Proposition

MRP Home Solutions & Realty bridges the traditional divide between luxury residential construction and licensed real estate representation in Central Iowa (Van Meter, West Des Moines, Waukee, Clive, Urbandale, Johnston, and Dallas/Polk counties). 

Led by **Dean Scieszinski** (*Director of Sales & Operations*), MRP delivers an end-to-end single point of contact:
1. **Architectural Exterior & Roofing**: Storm-resistant roofing (architectural & flat), fiber cement siding, seamless gutters, custom windows, composite decks, and paver driveways.
2. **Bespoke Interior Living**: Custom architectural build-outs, master carpentry, luxury bathroom retreats, chef kitchens, and designer flooring.
3. **Licensed Real Estate Services**: Full-service luxury buyer representation and strategic listing brokerage.
4. **Inspection Remediation & Closing Guarantee**: Comprehensive punch-list repairs guaranteeing that transactions close on time without delay or price reductions.

---

## Technical Highlights & Features

- **Houzz-Style Luxury Showcase Gallery**: Filterable portfolio (`All`, `Luxury Estates`, `Exteriors & Roofing`, `Interior Living`, `Outdoor Living & Pools`) with high-resolution imagery and fullscreen Lightbox viewer.
- **Interactive Before & After Transformation Slider**: Draggable split-screen comparison showing dramatic curb appeal and architectural improvements.
- **Interactive Scope & Proposal Calculator**: Live budget and lead-time projections that dynamically populate the official proposal form.
- **Itemized Proposal Request System**: Replicating the official MRP Proposal Form # with itemized service selection, lead times, and instant print/PDF formatting.
- **Digital Contact Card (vCard)**: One-click export of Dean Scieszinski's complete contact profile for clients' mobile address books.
- **Core Web Vitals Optimized**:
  - Preloaded hero LCP images with `fetchpriority="high"`.
  - Next-gen WebP image formats with explicit `width` and `height` dimensions to eliminate Cumulative Layout Shift (CLS).
  - Modern glassmorphism UI with responsive mobile navigation drawer and sticky action bar.

---

## Directory Structure

```
mrpus/
├── index.html                  # Semantic, accessible master webpage
├── css/
│   ├── style.css               # Core design tokens, typography, luxury styling
│   └── responsive.css          # Mobile-first breakpoints and fluid layouts
├── js/
│   ├── main.js                 # App controller, navigation spy, proposal form & vCard
│   ├── gallery.js              # Filterable portfolio & lightbox modal
│   ├── slider.js               # Before & After comparison slider
│   └── estimator.js            # Dynamic project scope & proposal calculator
└── assets/
    ├── brand/                  # Official MRP logos (transparent, light, dark, favicon)
    └── images/
        ├── hero/               # Twilight luxury estate hero backdrop
        ├── portfolio/          # High-resolution architectural photography
        └── before-after/       # Renovation transformation comparisons
```

---

## Local Development & Testing

You can run the site locally using any standard static file server:

### Using Python 3:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Using Node / npx:
```bash
npx serve .
```

---

## Contact & Licensing Information

- **Contractor License**: #C151670 (Commercial & Residential)
- **Headquarters**: 2995 133rd Ct, Van Meter, IA 50261
- **HQ Phone**: (515) 985-9412
- **Direct Sales / Mobile**: (515) 669-8202
- **Email**: `dean@mrpus.com` / `sales@mrpus.com`
- **Domain**: `mrpus.com`
