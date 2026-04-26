// templates/frontmatter.js
// ----------------------------------------------------------------------------
// Title page + Contents + List of Figures + List of Tables + Acronyms.
// All return arrays of paragraphs/tables that go into the document.
// ----------------------------------------------------------------------------

import fs from "fs";
import {
    Paragraph,
    AlignmentType,
    TableOfContents,
    StyleLevel,
    ImageRun,
    PageBreak,
} from "docx";
import { createStyledText, createParagraph, createBlankLine } from "./shared.js";
import { createChapterTitle } from "./headings.js";
import { COLORS, SIZES, SPACING } from "../styles/constants.js";
import { DOC_META } from "../config.js";

// ----------------------------------------------------------------------------
// Title page
// ----------------------------------------------------------------------------
export function buildTitlePage() {
    const items = [
        spacer(800),
        bigCenter(DOC_META.universityName, SIZES.TITLE_LARGE, true),
        spacer(400),
        logoIfPresent(),
        spacer(400),
        bigCenter(DOC_META.departmentName, SIZES.HEADING_2),
        bigCenter(DOC_META.programName, SIZES.HEADING_2),
        bigCenter(DOC_META.batch, SIZES.HEADING_2),
        spacer(800),
        bigCenter(DOC_META.documentTitle, SIZES.TITLE_MEDIUM, true),
        spacer(200),
        bigCenter(DOC_META.secondaryBatch, SIZES.HEADING_2),
        spacer(2400),
        bigCenter(DOC_META.documentDate, SIZES.HEADING_3),
        // Force the next chapter onto a new page
        new Paragraph({ children: [new PageBreak()] }),
    ];
    return items.filter(Boolean);
}

// ----------------------------------------------------------------------------
// Auto-updating Word Table of Contents.
// IMPORTANT: when the user opens the .docx in Word, they must press F9
// (or right-click → Update Field) to populate it. Until then it shows
// "Right-click to update field." Word handles this automatically.
// ----------------------------------------------------------------------------
export function buildTableOfContents() {
    return [
        createChapterTitle("Contents"),
        new TableOfContents("Contents", {
            hyperlink: true,
            headingStyleRange: "1-3",
            stylesWithLevels: [
                new StyleLevel("Heading1", 1),
                new StyleLevel("Heading2", 2),
                new StyleLevel("Heading3", 3),
            ],
        }),
        new Paragraph({ children: [new PageBreak()] }),
    ];
}

// ----------------------------------------------------------------------------
// List of Figures (auto-generated from figure captions).
// ----------------------------------------------------------------------------
export function buildListOfFigures() {
    return [
        createChapterTitle("List of Figures"),
        new TableOfContents("List of Figures", {
            hyperlink: true,
            captionLabel: "Figure",
        }),
        new Paragraph({ children: [new PageBreak()] }),
    ];
}

// ----------------------------------------------------------------------------
// List of Tables (auto-generated from table captions).
// ----------------------------------------------------------------------------
export function buildListOfTables() {
    return [
        createChapterTitle("List of Tables"),
        new TableOfContents("List of Tables", {
            hyperlink: true,
            captionLabel: "Table",
        }),
        new Paragraph({ children: [new PageBreak()] }),
    ];
}

// ----------------------------------------------------------------------------
// List of Acronyms — static. Add new ones in the array below.
// ----------------------------------------------------------------------------
const ACRONYMS = [
    { abbr: "BME", full: "Biomedical Engineering" },
    { abbr: "CLO", full: "Course Learning Outcome" },
    { abbr: "EC", full: "Engineering Competency" },
    { abbr: "HEC", full: "Higher Education Commission" },
    { abbr: "OBE", full: "Outcome Based Education" },
    { abbr: "PEC", full: "Pakistan Engineering Council" },
    { abbr: "PEO", full: "Programme Educational Objective" },
    { abbr: "PLO", full: "Programme Learning Outcome" },
    { abbr: "SAR", full: "Self-Assessment Report" },
    { abbr: "SDG", full: "Sustainable Development Goal" },
    { abbr: "WK", full: "Knowledge and Attitude Profile" },
];

export function buildListOfAcronyms() {
    const items = [createChapterTitle("List of Acronyms")];
    ACRONYMS.forEach(({ abbr, full }) => {
        items.push(
            new Paragraph({
                spacing: { after: SPACING.LIST_ITEM },
                children: [
                    createStyledText({ text: `${abbr}    `, bold: true, size: SIZES.BODY }),
                    createStyledText({ text: full, size: SIZES.BODY }),
                ],
            })
        );
    });
    items.push(new Paragraph({ children: [new PageBreak()] }));
    return items;
}

// ============================================================================
// Internal helpers
// ============================================================================
function bigCenter(text, size, bold = false) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [createStyledText({ text, size, bold, color: COLORS.NAVY })],
    });
}

function spacer(twips) {
    return new Paragraph({ children: [], spacing: { after: twips } });
}

function logoIfPresent() {
    if (!fs.existsSync(DOC_META.logoPath)) return null;
    try {
        const buf = fs.readFileSync(DOC_META.logoPath);
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    data: buf,
                    transformation: { width: 140, height: 140 },
                }),
            ],
        });
    } catch {
        return null;
    }
}