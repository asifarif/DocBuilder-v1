// main.js
// ----------------------------------------------------------------------------
// THE STITCHER
// 1. Calls each chapter's builder. Each returns an array of "blocks":
//      [{ orientation: 'portrait' | 'landscape', children: [...] }, ...]
// 2. Concatenates all blocks in order.
// 3. Merges adjacent blocks with the same orientation into single Word
//    sections (so we don't get unnecessary page breaks).
// 4. Writes the .docx file.
// ----------------------------------------------------------------------------

import fs from "fs";
import { Document, Packer, PageOrientation, HeadingLevel } from "docx";

import { DOC_META, CHAPTER_FLAGS } from "./config.js";
import { FONTS, SIZES, COLORS, PAGE_MARGINS } from "./styles/constants.js";

// Frontmatter
import {
    buildTitlePage,
    buildTableOfContents,
    buildListOfFigures,
    buildListOfTables,
    buildListOfAcronyms,
} from "./templates/frontmatter.js";

// Chapters
import { buildChapter1 } from "./chapters/ch01-university-info.js";
import { buildChapter2 } from "./chapters/ch02-vision-mission.js";
import { buildChapter3 } from "./chapters/ch03-faculty-vision.js";
import { buildChapter4 } from "./chapters/ch04-dept-mission.js";
import { buildChapter5 } from "./chapters/ch05-peo.js";
import { buildChapter6 } from "./chapters/ch06-sdg.js";
import { buildChapter7 } from "./chapters/ch07-wk.js";
import { buildChapter8 } from "./chapters/ch08-plo.js";
import { buildChapter9 } from "./chapters/ch09-ec.js";
import { buildChapter10 } from "./chapters/ch10-correlation-matrix.js";

// ============================================================================
// 1. Collect all blocks in document order.
//    Wrap each call so a broken chapter doesn't kill the whole build.
// ============================================================================
const allBlocks = [];

function safeAdd(name, fn, enabled) {
    if (!enabled) return;
    try {
        const blocks = fn();
        // frontmatter helpers return a flat array of paragraphs/tables.
        // Wrap them as a single portrait block.
        if (Array.isArray(blocks) && blocks.length > 0 && !blocks[0].orientation) {
            allBlocks.push({ orientation: "portrait", children: blocks });
        } else {
            allBlocks.push(...blocks);
        }
        console.log(`  ✓ ${name}`);
    } catch (err) {
        console.error(`  ✗ ${name} FAILED:`, err.message);
    }
}

console.log("Building document sections...");

if (CHAPTER_FLAGS.frontMatter) {
    safeAdd("Title page",       buildTitlePage,        true);
    safeAdd("Contents",         buildTableOfContents,  true);
    safeAdd("List of Figures",  buildListOfFigures,    true);
    safeAdd("List of Tables",   buildListOfTables,     true);
    safeAdd("List of Acronyms", buildListOfAcronyms,   true);
}

safeAdd("Chapter 1",  buildChapter1,  CHAPTER_FLAGS.ch01_universityInfo);
safeAdd("Chapter 2",  buildChapter2,  CHAPTER_FLAGS.ch02_universityVM);
safeAdd("Chapter 3",  buildChapter3,  CHAPTER_FLAGS.ch03_facultyVM);
safeAdd("Chapter 4",  buildChapter4,  CHAPTER_FLAGS.ch04_deptMission);
safeAdd("Chapter 5",  buildChapter5,  CHAPTER_FLAGS.ch05_peo);
safeAdd("Chapter 6",  buildChapter6,  CHAPTER_FLAGS.ch06_sdg);
safeAdd("Chapter 7",  buildChapter7,  CHAPTER_FLAGS.ch07_wk);
safeAdd("Chapter 8",  buildChapter8,  CHAPTER_FLAGS.ch08_plo);
safeAdd("Chapter 9",  buildChapter9,  CHAPTER_FLAGS.ch09_ec);
safeAdd("Chapter 10", buildChapter10, CHAPTER_FLAGS.ch10_correlation);

// ============================================================================
// 2. Merge adjacent blocks with the same orientation into single sections.
// ============================================================================
function mergeBlocksToSections(blocks) {
    const merged = [];
    for (const b of blocks) {
        const last = merged[merged.length - 1];
        if (last && last.orientation === b.orientation) {
            last.children.push(...b.children);
        } else {
            merged.push({ orientation: b.orientation, children: [...b.children] });
        }
    }
    return merged.map((s) => ({
        properties: {
            page: {
                size: {
                    orientation:
                        s.orientation === "landscape"
                            ? PageOrientation.LANDSCAPE
                            : PageOrientation.PORTRAIT,
                },
                margin: PAGE_MARGINS,
            },
        },
        children: s.children,
    }));
}

const sections = mergeBlocksToSections(allBlocks);

// ============================================================================
// 3. Build and save the document.
// ============================================================================
const doc = new Document({
    creator: DOC_META.creator,
    title: DOC_META.documentTitle,

    // Default font for the whole document
    styles: {
        default: {
            document: { run: { font: FONTS.BODY, size: SIZES.BODY } },
            heading1: {
                run: { font: FONTS.HEADING, size: SIZES.HEADING_1, bold: true, color: COLORS.NAVY },
                paragraph: { spacing: { before: 360, after: 200 } },
            },
            heading2: {
                run: { font: FONTS.HEADING, size: SIZES.HEADING_2, bold: true, color: COLORS.NAVY },
                paragraph: { spacing: { before: 360, after: 200 } },
            },
            heading3: {
                run: { font: FONTS.HEADING, size: SIZES.HEADING_3, bold: true, color: COLORS.NAVY },
                paragraph: { spacing: { before: 240, after: 120 } },
            },
        },
    },

    // Required for auto-TOC to work
    features: { updateFields: true },

    sections,
});

console.log("\nPacking document...");
Packer.toBuffer(doc)
    .then((buffer) => {
        fs.writeFileSync(DOC_META.outputFile, buffer);
        console.log(`\n✓ Document generated: ${DOC_META.outputFile}`);
        console.log("\n📌 IMPORTANT: When you open the file in Word:");
        console.log("   - Word may ask 'Update fields?' — click Yes (or press F9).");
        console.log("   - This populates the Table of Contents and lists.");
    })
    .catch((err) => {
        console.error("\n✗ Failed to generate document:", err);
    });