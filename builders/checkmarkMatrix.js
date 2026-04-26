// builders/checkmarkMatrix.js
// ----------------------------------------------------------------------------
// Reusable builder for ANY checkmark/X-style mapping matrix.
// Used by Tables 5.3, 6.2, 8.1, etc.
//
// Input shape:
//   {
//     rowHeader: "PLO",             // text in top-left cell
//     columns:   ["PEO 1", "PEO 2", ...],   // column labels
//     rotateColumnHeaders: false,   // true for many-column matrices like 6.2
//     rows: [
//       { label: "PLO-1 Engineering Knowledge", marks: ["✓", "✓", ""] },
//       ...
//     ]
//   }
// ----------------------------------------------------------------------------

import { Table, TableRow, WidthType, AlignmentType, HeightRule } from "docx";
import { createCell } from "../templates/shared.js";
import { COLORS } from "../styles/constants.js";

function buildHeader(rowHeader, columns, rotateColumnHeaders) {
    const cells = [
        createCell({
            text: rowHeader,
            bold: true,
            color: COLORS.WHITE,
            shading: COLORS.NAVY,
        }),
    ];
    columns.forEach((col) => {
        cells.push(
            createCell({
                text: col,
                bold: true,
                color: COLORS.WHITE,
                shading: COLORS.NAVY,
                rotated: rotateColumnHeaders,
            })
        );
    });
    return new TableRow({
        children: cells,
        tableHeader: true,
        height: rotateColumnHeaders
            ? { value: 1500, rule: HeightRule.ATLEAST }
            : undefined,
    });
}

function buildDataRow(row, isAlternate) {
    const shading = isAlternate ? COLORS.LIGHT_GREY : null;
    const cells = [
        createCell({
            text: row.label,
            bold: true,
            shading,
            alignment: AlignmentType.LEFT,
        }),
    ];
    row.marks.forEach((m) => {
        cells.push(createCell({ text: m, shading }));
    });
    return new TableRow({ children: cells });
}

export function buildCheckmarkMatrix({
    rowHeader = "",
    columns = [],
    rotateColumnHeaders = false,
    rows = [],
}) {
    const trs = [buildHeader(rowHeader, columns, rotateColumnHeaders)];
    rows.forEach((r, i) => trs.push(buildDataRow(r, i % 2 === 1)));
    return new Table({
        rows: trs,
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
}