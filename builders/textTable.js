// builders/textTable.js
// ----------------------------------------------------------------------------
// Reusable builder for text-content tables (Tables 5.1, 5.2, 6.1, 10.1).
// Each cell can hold a multi-line paragraph; first column is bold/labeled.
//
// Input shape:
//   {
//     headers: ["PEO", "University Vision", "University Mission"],
//     rows: [
//       ["PEO-1 ...", "explanation", "explanation"],
//       ["PEO-2 ...", "...",         "..."],
//     ],
//     columnWidths: [25, 37, 38],   // optional, percentages summing to 100
//   }
// ----------------------------------------------------------------------------

import { Table, TableRow, WidthType, AlignmentType, VerticalAlign } from "docx";
import { createCell } from "../templates/shared.js";
import { COLORS, SIZES } from "../styles/constants.js";

function buildHeaderRow(headers, widths) {
    const cells = headers.map((h, i) =>
        createCell({
            text: h,
            bold: true,
            color: COLORS.WHITE,
            shading: COLORS.NAVY,
            size: SIZES.BODY,
            width: widths
                ? { size: widths[i], type: WidthType.PERCENTAGE }
                : null,
        })
    );
    return new TableRow({ children: cells, tableHeader: true });
}

function buildBodyRow(row, isAlternate, widths) {
    const shading = isAlternate ? COLORS.LIGHT_GREY : null;
    const cells = row.map((cellText, i) =>
        createCell({
            text: cellText,
            shading,
            alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.LEFT,
            verticalAlign: VerticalAlign.TOP,
            size: SIZES.SMALL,
            bold: i === 0,
            width: widths
                ? { size: widths[i], type: WidthType.PERCENTAGE }
                : null,
        })
    );
    return new TableRow({ children: cells });
}

export function buildTextTable({ headers = [], rows = [], columnWidths = null }) {
    const trs = [buildHeaderRow(headers, columnWidths)];
    rows.forEach((r, i) => trs.push(buildBodyRow(r, i % 2 === 1, columnWidths)));
    return new Table({
        rows: trs,
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
}