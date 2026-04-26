// builders/docInfoHeader.js
// ----------------------------------------------------------------------------
// Doc-info header table — sits at the top of policy/guideline documents.
// Three columns:
//   [logo placeholder] [university + doc title] [doc number + dept + program]
//
// This is the ONLY new builder needed for the OEL policy.
// Everything else (paragraphs, bullets, tables) reuses what we already have.
// ----------------------------------------------------------------------------

import fs from "fs";
import {
    Table,
    TableRow,
    WidthType,
    AlignmentType,
    Paragraph,
    ImageRun,
} from "docx";
import { createCell, createStyledText } from "../templates/shared.js";
import { COLORS, SIZES } from "../styles/constants.js";
import { DOC_META } from "../config.js";

// Internal: produces the logo cell — image if available, "LOGO" placeholder otherwise.
function buildLogoCell() {
    const placeholderText = createStyledText({
        text: "LOGO",
        size: SIZES.SMALL,
        color: COLORS.DARK_GREY,
    });

    let paragraph;
    if (fs.existsSync(DOC_META.logoPath)) {
        try {
            const buf = fs.readFileSync(DOC_META.logoPath);
            paragraph = new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new ImageRun({
                        data: buf,
                        transformation: { width: 60, height: 60 },
                    }),
                ],
            });
        } catch {
            paragraph = new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [placeholderText],
            });
        }
    } else {
        paragraph = new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [placeholderText],
        });
    }

    return createCell({
        children: [paragraph],
        width: { size: 15, type: WidthType.PERCENTAGE },
    });
}

// Internal: produces the centre cell — university + doc title (stacked, bold).
function buildTitleCell(info) {
    const lines = [
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [createStyledText({
                text: info.universityName,
                bold: true,
                size: SIZES.BODY,
            })],
        }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [createStyledText({
                text: info.documentTitle,
                bold: true,
                size: SIZES.BODY,
            })],
        }),
    ];
    return createCell({
        children: lines,
        width: { size: 50, type: WidthType.PERCENTAGE },
    });
}

// Internal: produces the right cell — doc number + dept + program (stacked).
function buildInfoCell(info) {
    const mk = (text, bold = false) =>
        new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [createStyledText({ text, bold, size: SIZES.SMALL })],
        });

    return createCell({
        children: [
            mk(`Doc: ${info.documentNumber}`, true),
            mk(info.department),
            mk(info.program),
        ],
        width: { size: 35, type: WidthType.PERCENTAGE },
        alignment: AlignmentType.LEFT,
    });
}

// PUBLIC: build the doc-info header table.
export function buildDocInfoHeader(info) {
    const row = new TableRow({
        children: [
            buildLogoCell(),
            buildTitleCell(info),
            buildInfoCell(info),
        ],
    });
    return new Table({
        rows: [row],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
}