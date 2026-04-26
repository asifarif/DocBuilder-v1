// chapters/ch09-ec.js
// ----------------------------------------------------------------------------
// Chapter 9: Professional Competence (ECs) Profiles.
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph } from "../templates/shared.js";
import { createChapterTitle } from "../templates/headings.js";
import { createLabeledBulletList } from "../templates/lists.js";

const data = JSON.parse(fs.readFileSync("./data/ec.json", "utf-8"));

export function buildChapter9() {
    const children = [
        createChapterTitle("9. Professional Competence (ECs) Profiles"),
        createParagraph({ text: data.intro }),
        ...createLabeledBulletList(data.items),
    ];

    return [{ orientation: "portrait", children }];
}
