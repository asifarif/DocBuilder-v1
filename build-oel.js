// build-oel.js
// ----------------------------------------------------------------------------
// Entry point for the OEL Policy document.
// Run with:  node build-oel.js
// ----------------------------------------------------------------------------

import fs from "fs";
import { Document, Packer, PageOrientation } from "docx";

import { FONTS, SIZES, COLORS, PAGE_MARGINS } from "./styles/constants.js";
import { buildDocInfoHeader } from "./builders/docInfoHeader.js";
import { buildOelPolicy } from "./chapters/oel-policy.js";

const OUTPUT_FILE = "OEL-Policy-Guidelines.docx";

// Read doc-info from the JSON so we don't duplicate it here.
const data = JSON.parse(fs.readFileSync("./data/oelPolicy.json", "utf-8"));

console.log("Building OEL Policy document...");

// Build the body content (returns blocks in standard {orientation, children} shape).
const blocks = buildOelPolicy();
const portraitChildren = blocks[0].children;

// Prepend the doc-info header so it appears at the very top of page 1.
const allChildren = [
    buildDocInfoHeader(data.docInfo),
    ...portraitChildren,
];

const doc = new Document({
    creator: "Department of Biomedical Engineering, HITEC University",
    title: data.title,
    styles: {
        default: {
            document: { run: { font: FONTS.BODY, size: SIZES.BODY } },
            heading1: {
                run: { font: FONTS.HEADING, size: SIZES.HEADING_1, bold: true, color: COLORS.NAVY },
                paragraph: { spacing: { before: 360, after: 200 } },
            },
            heading2: {
                run: { font: FONTS.HEADING, size: SIZES.HEADING_2, bold: true, color: COLORS.NAVY },
                paragraph: { spacing: { before: 320, after: 160 } },
            },
        },
    },
    sections: [
        {
            properties: {
                page: {
                    size: { orientation: PageOrientation.PORTRAIT },
                    margin: PAGE_MARGINS,
                },
            },
            children: allChildren,
        },
    ],
});

Packer.toBuffer(doc)
    .then((buffer) => {
        fs.writeFileSync(OUTPUT_FILE, buffer);
        console.log(`✓ Document generated: ${OUTPUT_FILE}`);
    })
    .catch((err) => {
        console.error("✗ Failed:", err);
    });