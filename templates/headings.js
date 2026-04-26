// templates/headings.js
// ----------------------------------------------------------------------------
// All heading types in one place. Using HeadingLevel.HEADING_1/2/3 means the
// auto-TOC will pick these up automatically.
// ----------------------------------------------------------------------------

import { Paragraph, HeadingLevel, AlignmentType } from "docx";
import { createStyledText } from "./shared.js";
import { COLORS, SIZES, SPACING } from "../styles/constants.js";

// "1. University Information"
export function createChapterTitle(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: SPACING.HEADING_BEFORE, after: SPACING.HEADING_AFTER },
        pageBreakBefore: true,
        children: [
            createStyledText({
                text,
                bold: true,
                size: SIZES.HEADING_1,
                color: COLORS.NAVY,
            }),
        ],
    });
}

// "1.1. HITEC University"
export function createSectionTitle(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: SPACING.HEADING_BEFORE, after: SPACING.HEADING_AFTER },
        children: [
            createStyledText({
                text,
                bold: true,
                size: SIZES.HEADING_2,
                color: COLORS.NAVY,
            }),
        ],
    });
}

// "1.1.1. Sub-section Title"
export function createSubsectionTitle(text) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: { before: SPACING.HEADING_BEFORE, after: SPACING.HEADING_AFTER },
        children: [
            createStyledText({
                text,
                bold: true,
                size: SIZES.HEADING_3,
                color: COLORS.NAVY,
            }),
        ],
    });
}

// "Table 5.1: ..." — centered, bold, sits ABOVE its table.
export function createTableCaption(label, title) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 120 },
        children: [
            createStyledText({ text: `${label}: `, bold: true, size: SIZES.BODY }),
            createStyledText({ text: title, bold: true, size: SIZES.BODY }),
        ],
    });
}

// "Figure 1.1: ..." — centered, sits BELOW its figure.
export function createFigureCaption(label, title) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 240 },
        children: [
            createStyledText({ text: `${label}: `, bold: true, size: SIZES.BODY }),
            createStyledText({ text: title, bold: true, size: SIZES.BODY }),
        ],
    });
}
