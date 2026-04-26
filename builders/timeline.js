// builders/timeline.js
// ----------------------------------------------------------------------------
// Figure 1.1 timeline. Rendered as a 3-row table:
//   row 0: events above the line
//   row 1: years (the timeline itself, navy band)
//   row 2: events below the line
// ----------------------------------------------------------------------------

import { Table, TableRow, WidthType, AlignmentType } from "docx";
import { createCell } from "../templates/shared.js";
import { COLORS, SIZES } from "../styles/constants.js";

const TIMELINE_DATA = {
    years: ["2020", "2021", "2024", "2025", "2025", "2026"],
    above: [
        "Zero Visit\n(Aug 21)",
        "",
        "Interim Visit\n(Jan 29)",
        "",
        "Accredited for 1 year\n(Level-II OBE)",
        "",
    ],
    below: [
        "",
        "Program Launch\n(Intake: 50)",
        "",
        "First Accreditation Visit\n(Feb 26-27)",
        "",
        "Re-accreditation Visit\n(Current)",
    ],
};

function eventCell(text) {
    return createCell({
        text,
        size: SIZES.SMALL,
        alignment: AlignmentType.CENTER,
    });
}

function yearCell(year) {
    return createCell({
        text: year,
        bold: true,
        color: COLORS.WHITE,
        shading: COLORS.NAVY,
        size: SIZES.BODY,
        alignment: AlignmentType.CENTER,
    });
}

export function buildTimeline() {
    const aboveRow = new TableRow({
        children: TIMELINE_DATA.above.map(eventCell),
    });
    const yearRow = new TableRow({
        children: TIMELINE_DATA.years.map(yearCell),
    });
    const belowRow = new TableRow({
        children: TIMELINE_DATA.below.map(eventCell),
    });
    return new Table({
        rows: [aboveRow, yearRow, belowRow],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
}