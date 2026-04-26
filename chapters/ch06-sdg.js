// chapters/ch06-sdg.js
// ----------------------------------------------------------------------------
// Chapter 6: Sustainable Development Goals (SDGs).
// Table 6.2 (BME × 17 SDGs) is too wide for portrait — landscape section.
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph } from "../templates/shared.js";
import {
    createChapterTitle,
    createSectionTitle,
    createTableCaption,
} from "../templates/headings.js";
import { createLabeledBulletList } from "../templates/lists.js";
import { buildTextTable } from "../builders/textTable.js";
import { buildCheckmarkMatrix } from "../builders/checkmarkMatrix.js";

const data = JSON.parse(fs.readFileSync("./data/sdg.json", "utf-8"));

export function buildChapter6() {
    // Portrait part: chapter title, intro, Table 6.1, the 17 SDG bullets,
    // and the section heading for 6.1.
    const portrait = [
        createChapterTitle("6. Sustainable Development Goals (SDGs)"),
        createParagraph({ text: data.intro }),

        createTableCaption("Table 6.1", data.table_6_1.caption),
        buildTextTable(data.table_6_1),

        ...createLabeledBulletList(data.sdgList),

        createSectionTitle("6.1. Mapping of BS Biomedical Engineering Program with UN SDGs"),
    ];

    // Landscape part: just the wide Table 6.2.
    const landscape = [
        createTableCaption("Table 6.2", data.table_6_2.caption),
        buildCheckmarkMatrix({
            rowHeader: data.table_6_2.rowHeader,
            columns: data.table_6_2.columns,
            rotateColumnHeaders: false, // 17 short numeric headers fit fine
            rows: data.table_6_2.rows,
        }),
    ];

    return [
        { orientation: "portrait", children: portrait },
        { orientation: "landscape", children: landscape },
    ];
}
