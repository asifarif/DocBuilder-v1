// chapters/oel-policy.js
// ----------------------------------------------------------------------------
// OEL Policy — single composition file. The doc is short enough that one file
// is cleaner than splitting it. Each section is its own small function, so
// you can edit/reorder them independently.
//
// Pattern: each section function returns an array of paragraphs/tables.
// buildOelPolicy() concatenates them in order.
// ----------------------------------------------------------------------------

import fs from "fs";
import { AlignmentType } from "docx";
import {
    createParagraph,
    createStyledText,
} from "../templates/shared.js";
import { Paragraph } from "docx";
import {
    createSectionTitle,
    createTableCaption,
} from "../templates/headings.js";
import {
    createBulletList,
    createLabeledBulletList,
} from "../templates/lists.js";
import { buildTextTable } from "../builders/textTable.js";
import { COLORS, SIZES } from "../styles/constants.js";

const data = JSON.parse(fs.readFileSync("./data/oelPolicy.json", "utf-8"));

// ----------------------------------------------------------------------------
// Document title — sits below the doc-info header, above section 1.
// ----------------------------------------------------------------------------
function buildDocumentTitle() {
    return [
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 400 },
            children: [
                createStyledText({
                    text: data.title,
                    bold: true,
                    size: SIZES.HEADING_1,
                    color: COLORS.NAVY,
                }),
            ],
        }),
    ];
}

// ----------------------------------------------------------------------------
// One small function per section. Each handles its own pattern:
//   - prose-only sections    (introduction, guidelines, implementation, etc.)
//   - intro + bullets + outro (definition)
//   - intro + table          (classification, assessment)
//   - intro + labeled bullets (policy)
//   - intro + plain bullets  (level descriptors)
// ----------------------------------------------------------------------------

function buildIntroduction() {
    const s = data.introduction;
    return [
        createSectionTitle(s.heading),
        ...s.paragraphs.map((p) => createParagraph({ text: p })),
    ];
}

function buildDefinition() {
    const s = data.definition;
    return [
        createSectionTitle(s.heading),
        createParagraph({ text: s.intro }),
        ...createBulletList(s.bullets),
        createParagraph({ text: s.outro }),
    ];
}

function buildClassification() {
    const s = data.classification;
    return [
        createSectionTitle(s.heading),
        createParagraph({ text: s.intro }),
        buildTextTable({
            headers: s.table.headers,
            rows: s.table.rows,
            columnWidths: [15, 30, 25, 30],
        }),
    ];
}

function buildPolicy() {
    const s = data.policy;
    return [
        createSectionTitle(s.heading),
        createParagraph({ text: s.intro }),
        ...createLabeledBulletList(s.bullets),
    ];
}

function buildLevelDescriptors() {
    const s = data.levelDescriptors;
    return [
        createSectionTitle(s.heading),
        createParagraph({ text: s.intro }),
        ...createBulletList(s.bullets),
    ];
}

function buildGuidelines() {
    const s = data.guidelines;
    return [
        createSectionTitle(s.heading),
        ...s.paragraphs.map((p) => createParagraph({ text: p })),
    ];
}

function buildImplementation() {
    const s = data.implementation;
    return [
        createSectionTitle(s.heading),
        ...s.paragraphs.map((p) => createParagraph({ text: p })),
    ];
}

function buildSafety() {
    const s = data.safety;
    return [
        createSectionTitle(s.heading),
        ...s.paragraphs.map((p) => createParagraph({ text: p })),
    ];
}

function buildAssessment() {
    const s = data.assessment;
    return [
        createSectionTitle(s.heading),
        createParagraph({ text: s.intro }),
        createParagraph({ text: s.subIntro }),
        buildTextTable({
            headers: s.table.headers,
            rows: s.table.rows,
            columnWidths: [70, 30],
        }),
        createParagraph({ text: s.outro }),
    ];
}

function buildRoles() {
    const s = data.roles;
    return [
        createSectionTitle(s.heading),
        ...s.paragraphs.map((p) => createParagraph({ text: p })),
    ];
}

function buildContinuousImprovement() {
    const s = data.continuousImprovement;
    return [
        createSectionTitle(s.heading),
        ...s.paragraphs.map((p) => createParagraph({ text: p })),
    ];
}

// ----------------------------------------------------------------------------
// Footer — version + date at the very end.
// ----------------------------------------------------------------------------
function buildFooter() {
    const f = data.footer;
    return [
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 600, after: 80 },
            children: [
                createStyledText({ text: f.department, bold: true, size: SIZES.SMALL }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
                createStyledText({ text: f.university, size: SIZES.SMALL }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                createStyledText({ text: "Version: ", bold: true, size: SIZES.SMALL }),
                createStyledText({ text: f.version, size: SIZES.SMALL }),
            ],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                createStyledText({ text: "Date: ", bold: true, size: SIZES.SMALL }),
                createStyledText({ text: f.date, size: SIZES.SMALL }),
            ],
        }),
    ];
}

// ----------------------------------------------------------------------------
// PUBLIC: assemble the whole policy. Returns blocks in our standard format.
// ----------------------------------------------------------------------------
export function buildOelPolicy() {
    const children = [
        ...buildDocumentTitle(),
        ...buildIntroduction(),
        ...buildDefinition(),
        ...buildClassification(),
        ...buildPolicy(),
        ...buildLevelDescriptors(),
        ...buildGuidelines(),
        ...buildImplementation(),
        ...buildSafety(),
        ...buildAssessment(),
        ...buildRoles(),
        ...buildContinuousImprovement(),
        ...buildFooter(),
    ];
    return [{ orientation: "portrait", children }];
}