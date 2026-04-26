// builders/obe.js
// ----------------------------------------------------------------------------
// OBE MAPPING BUILDER
// Produces the CLO -> PLO / SDG matrix table.
//
// Design notes (the "Agile" requirement):
//   - Each row TYPE is its own function (header row, CLO row).
//   - generateMappingTable() is the only thing exported — it iterates the data
//     and stitches the rows together.
//   - To improve just the header row later (e.g. add a 2-line PLO label),
//     edit buildHeaderRow() ONLY. Nothing else changes.
// ----------------------------------------------------------------------------

import { Table, TableRow, WidthType, AlignmentType, HeightRule } from "docx";
import { createCell } from "../templates/shared.js";
import { COLORS } from "../styles/constants.js";

// ----------------------------------------------------------------------------
// Row builder #1: header row with rotated PLO/SDG labels.
// ----------------------------------------------------------------------------
function buildHeaderRow(plos, sdgs) {
    const cells = [];

    // First column header
    cells.push(
        createCell({
            text: "CLO",
            bold: true,
            color: COLORS.WHITE,
            shading: COLORS.NAVY,
        })
    );

    // PLO columns (rotated text so narrow columns stay readable)
    plos.forEach((plo) => {
        cells.push(
            createCell({
                text: plo,
                bold: true,
                color: COLORS.WHITE,
                shading: COLORS.NAVY,
                rotated: true,
            })
        );
    });

    // SDG columns (also rotated)
    sdgs.forEach((sdg) => {
        cells.push(
            createCell({
                text: sdg,
                bold: true,
                color: COLORS.WHITE,
                shading: COLORS.NAVY,
                rotated: true,
            })
        );
    });

    return new TableRow({
        children: cells,
        tableHeader: true, // repeats on every page
        // Tall row so rotated text has vertical room to display.
        height: { value: 1500, rule: HeightRule.ATLEAST },
    });
}

// ----------------------------------------------------------------------------
// Row builder #2: a single CLO data row.
// ----------------------------------------------------------------------------
function buildCloRow(cloEntry, plos, sdgs, isAlternate) {
    const rowShading = isAlternate ? COLORS.LIGHT_GREY : null;
    const cells = [];

    // CLO label cell (left-aligned, bold)
    cells.push(
        createCell({
            text: cloEntry.clo,
            bold: true,
            shading: rowShading,
            alignment: AlignmentType.LEFT,
        })
    );

    // Mapping cells for every PLO (in the same order as the header)
    plos.forEach((plo) => {
        cells.push(
            createCell({
                text: cloEntry.mappings[plo] || "",
                shading: rowShading,
            })
        );
    });

    // Mapping cells for every SDG
    sdgs.forEach((sdg) => {
        cells.push(
            createCell({
                text: cloEntry.mappings[sdg] || "",
                shading: rowShading,
            })
        );
    });

    return new TableRow({ children: cells });
}

// ----------------------------------------------------------------------------
// PUBLIC: generateMappingTable
// Input shape:
//   {
//     plos: ["PLO1", "PLO2", ...],
//     sdgs: ["SDG4", "SDG9", ...],
//     clos: [
//       { clo: "CLO1", mappings: { PLO1: "✔", PLO2: "", ... } },
//       ...
//     ]
//   }
// ----------------------------------------------------------------------------
export function generateMappingTable(data) {
    const { plos = [], sdgs = [], clos = [] } = data;

    const rows = [buildHeaderRow(plos, sdgs)];

    clos.forEach((cloEntry, index) => {
        // Alternating shading: even index = white, odd index = light grey.
        const isAlternate = index % 2 === 1;
        rows.push(buildCloRow(cloEntry, plos, sdgs, isAlternate));
    });

    return new Table({
        rows,
        width: { size: 100, type: WidthType.PERCENTAGE },
    });
}