// templates/shared.js
// ----------------------------------------------------------------------------
// CORE ENGINE — atomic building blocks.
// Every other builder (chapters, frontmatter, tables) is composed from these.
// ----------------------------------------------------------------------------

import {
    TextRun,
    Paragraph,
    TableCell,
    BorderStyle,
    ShadingType,
    AlignmentType,
    VerticalAlign,
    TextDirection,
} from "docx";

import { COLORS, FONTS, SIZES, CELL_MARGINS, SPACING } from "../styles/constants.js";

// ----------------------------------------------------------------------------
// 1. createStyledText — wraps every TextRun so font is consistent.
// ----------------------------------------------------------------------------
export function createStyledText({
    text = "",
    bold = false,
    italics = false,
    color = COLORS.BLACK,
    size = SIZES.BODY,
    font = FONTS.BODY,
} = {}) {
    return new TextRun({ text, bold, italics, color, size, font });
}

// ----------------------------------------------------------------------------
// 2. createBorder — uniform thin black borders on all four sides.
// ----------------------------------------------------------------------------
export function createBorder(color = COLORS.BLACK, size = 4) {
    const side = { style: BorderStyle.SINGLE, size, color };
    return { top: side, bottom: side, left: side, right: side };
}

// ----------------------------------------------------------------------------
// 3. createCell — workhorse table cell with shading, alignment, span, rotation.
// ----------------------------------------------------------------------------
export function createCell({
    text = "",
    bold = false,
    italics = false,
    color = COLORS.BLACK,
    size = SIZES.SMALL,
    shading = null,
    alignment = AlignmentType.CENTER,
    verticalAlign = VerticalAlign.CENTER,
    columnSpan = 1,
    rowSpan = 1,
    rotated = false,
    width = null,
    children = null,  // override: pass full Paragraph[] for multi-line cells
} = {}) {
    const para = children || [
        new Paragraph({
            alignment,
            children: [createStyledText({ text, bold, italics, color, size })],
        }),
    ];

    const opts = {
        children: para,
        verticalAlign,
        margins: CELL_MARGINS,
        borders: createBorder(),
        columnSpan,
        rowSpan,
    };

    if (shading) {
        opts.shading = { type: ShadingType.CLEAR, color: "auto", fill: shading };
    }
    if (rotated) {
        opts.textDirection = TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT;
    }
    if (width) opts.width = width;

    return new TableCell(opts);
}

// ----------------------------------------------------------------------------
// 4. createParagraph — single-run paragraph (most common case).
// ----------------------------------------------------------------------------
export function createParagraph({
    text = "",
    bold = false,
    italics = false,
    color = COLORS.BLACK,
    size = SIZES.BODY,
    alignment = AlignmentType.JUSTIFIED,
    spacingAfter = SPACING.PARAGRAPH,
    indent = null,
} = {}) {
    return new Paragraph({
        alignment,
        spacing: { after: spacingAfter, line: SPACING.LINE },
        indent,
        children: [createStyledText({ text, bold, italics, color, size })],
    });
}

// ----------------------------------------------------------------------------
// 5. createMultiRunParagraph — paragraph with mixed-style runs (e.g. some
//    italic words inside normal text). Pass an array of run option objects.
// ----------------------------------------------------------------------------
export function createMultiRunParagraph({
    runs = [],
    alignment = AlignmentType.JUSTIFIED,
    spacingAfter = SPACING.PARAGRAPH,
    indent = null,
} = {}) {
    return new Paragraph({
        alignment,
        spacing: { after: spacingAfter },
        indent,
        children: runs.map((r) => createStyledText(r)),
    });
}

// ----------------------------------------------------------------------------
// 6. createApprovalLine — italic, centered, smaller, used after every approved
//    statement. Reuses one consistent style for the entire document.
// ----------------------------------------------------------------------------
export function createApprovalLine(text) {
    return createParagraph({
        text: `(${text})`,
        italics: true,
        size: SIZES.SMALL,
        alignment: AlignmentType.CENTER,
        spacingAfter: SPACING.PARAGRAPH,
    });
}

// ----------------------------------------------------------------------------
// 7. createBlankLine — small vertical spacer.
// ----------------------------------------------------------------------------
export function createBlankLine() {
    return new Paragraph({ children: [], spacing: { after: 120 } });
}
