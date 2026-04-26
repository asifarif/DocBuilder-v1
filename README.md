# DocBuilder — HITEC BME OBE Framework

Generates the departmental OBE Framework document as a `.docx` file.

## Directory layout

```
DocBuilder-v1/
├── main.js                     ← run this
├── config.js                   ← document metadata, approval dates, chapter on/off switches
├── package.json                ← must contain "type": "module"
│
├── styles/
│   └── constants.js            ← colors, fonts, sizes, margins
│
├── templates/
│   ├── shared.js               ← Core Engine: createCell, createParagraph, etc.
│   ├── headings.js             ← chapter / section / subsection / table caption / figure caption
│   ├── lists.js                ← bullet helpers
│   └── frontmatter.js          ← title page, TOC, lists of figures/tables, acronyms
│
├── builders/
│   ├── checkmarkMatrix.js      ← reusable for ✓/blank tables (5.3, 6.2, 8.1)
│   ├── textTable.js            ← reusable for text-cell tables (5.1, 5.2, 6.1, 10.1)
│   └── timeline.js             ← Figure 1.1
│
├── chapters/
│   ├── ch01-university-info.js
│   ├── ch02-vision-mission.js
│   ├── ch03-faculty-vision.js
│   ├── ch04-dept-mission.js
│   ├── ch05-peo.js
│   ├── ch06-sdg.js
│   ├── ch07-wk.js
│   ├── ch08-plo.js
│   ├── ch09-ec.js
│   └── ch10-correlation-matrix.js
│
├── data/
│   ├── university.json
│   ├── peo.json
│   ├── sdg.json
│   ├── wk.json
│   ├── plo.json
│   ├── ec.json
│   └── correlationMatrix.json
│
└── assets/
    └── logo.png                ← (optional — drop your HITEC logo here)
```

## Run

```powershell
node main.js
```

Output: `HITEC-BME-OBE-Framework.docx`

When you open it in Word, click **Yes** to "Update fields?" (or press **F9**)
to populate the Table of Contents, List of Figures, and List of Tables.

## Common edits

- **Fix a typo in body text** → edit the relevant `data/*.json` file. Don't touch chapter code.
- **Change navy color** → `styles/constants.js`, `COLORS.NAVY`.
- **Skip a chapter** → set its flag to `false` in `config.js`.
- **Update an approval date** → `config.js`, `APPROVALS` object.
- **Add a new chapter** → create `chapters/ch11-foo.js` exporting `buildChapter11()`,
  import it in `main.js`, add to flags in `config.js`, and call it in the chapter list.

## TODO before submission

1. Drop a real `assets/logo.png` for the title page.
2. Update `APPROVALS.facultyV` and `APPROVALS.facultyM` in `config.js` —
   currently `"Approved ???"` because PDF source had it as `???`.
3. Review rows 6–11 in `data/correlationMatrix.json` — these were inferred
   from PLO definitions because the PDF excerpt cut off after PLO-5.