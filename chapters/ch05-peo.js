// chapters/ch05-peo.js
// ----------------------------------------------------------------------------
// Chapter 5: Program Educational Objectives (PEO).
// 5.1 — Alignment of PEOs with V&M (Tables 5.1, 5.2, 5.3)
// 5.2 — Strategic Plan to Achieve PEOs
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph, createApprovalLine } from "../templates/shared.js";
import {
    createChapterTitle,
    createSectionTitle,
    createTableCaption,
} from "../templates/headings.js";
import { createLabeledBulletList } from "../templates/lists.js";
import { buildTextTable } from "../builders/textTable.js";
import { buildCheckmarkMatrix } from "../builders/checkmarkMatrix.js";
import { APPROVALS } from "../config.js";

const data = JSON.parse(fs.readFileSync("./data/peo.json", "utf-8"));

export function buildChapter5() {
    const intro = [
        createChapterTitle("5. Program Educational Objectives (PEO)"),
        ...createLabeledBulletList(data.peoStatements),
        createApprovalLine(APPROVALS.peo),

        createSectionTitle("5.1. Alignment of PEOs with Vision and Mission Statements"),
        ...data.alignmentIntro.map((p) => createParagraph({ text: p })),

        createTableCaption("Table 5.1", data.table_5_1.caption),
        buildTextTable(data.table_5_1),

        createTableCaption("Table 5.2", data.table_5_2.caption),
        buildTextTable(data.table_5_2),

        createTableCaption("Table 5.3", data.table_5_3.caption),
        buildCheckmarkMatrix({
            rowHeader: data.table_5_3.rowHeader,
            columns: data.table_5_3.columns,
            rotateColumnHeaders: false,
            rows: data.table_5_3.rows,
        }),

        createSectionTitle("5.2. Strategic Plan to Achieve PEOs"),
        ...data.strategicPlan.map((p) => createParagraph({ text: p })),
    ];

    return [{ orientation: "portrait", children: intro }];
}
