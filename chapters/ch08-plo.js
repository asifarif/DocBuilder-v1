// chapters/ch08-plo.js
// ----------------------------------------------------------------------------
// Chapter 8: Program Learning Outcomes (PLOs).
// 8.1 — Mapping between PLOs and PEOs (Table 8.1)
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph } from "../templates/shared.js";
import {
    createChapterTitle,
    createSectionTitle,
    createSubsectionTitle,
    createTableCaption,
} from "../templates/headings.js";
import { createLabeledBulletList } from "../templates/lists.js";
import { buildCheckmarkMatrix } from "../builders/checkmarkMatrix.js";

const data = JSON.parse(fs.readFileSync("./data/plo.json", "utf-8"));

export function buildChapter8() {
    const children = [
        createChapterTitle("8. Program Learning Outcomes (PLOs)"),
        createParagraph({ text: data.intro }),
        ...createLabeledBulletList(data.items),

        createSectionTitle(
            "8.1. Mapping between Programme Learning Outcomes (PLOs) and Programme Educational Objectives (PEOs)"
        ),
        createParagraph({ text: data.mappingIntro }),
    ];

    // Each PLO mapping prose block: small heading + paragraph
    data.mappingProse.forEach((m) => {
        children.push(createSubsectionTitle(m.heading));
        children.push(createParagraph({ text: m.text }));
    });

    children.push(createTableCaption("Table 8.1", data.table_8_1.caption));
    children.push(
        buildCheckmarkMatrix({
            rowHeader: data.table_8_1.rowHeader,
            columns: data.table_8_1.columns,
            rotateColumnHeaders: false,
            rows: data.table_8_1.rows,
        })
    );

    return [{ orientation: "portrait", children }];
}
