// chapters/ch10-correlation-matrix.js
// ----------------------------------------------------------------------------
// Chapter 10: Correlation Matrix PLOs–ECs–WKs–SDGs.
// Table 10.1 has long text in each cell — landscape gives it room to breathe.
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph } from "../templates/shared.js";
import { createChapterTitle, createTableCaption } from "../templates/headings.js";
import { buildTextTable } from "../builders/textTable.js";

const data = JSON.parse(fs.readFileSync("./data/correlationMatrix.json", "utf-8"));

export function buildChapter10() {
    const portrait = [
        createChapterTitle("10. Correlation Matrix PLOs-ECs-WKs-SDGs"),
        createParagraph({ text: data.intro }),
    ];

    const landscape = [
        createTableCaption("Table 10.1", data.table_10_1.caption),
        buildTextTable(data.table_10_1),
    ];

    return [
        { orientation: "portrait", children: portrait },
        { orientation: "landscape", children: landscape },
    ];
}
