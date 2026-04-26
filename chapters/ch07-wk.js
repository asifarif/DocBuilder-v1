// chapters/ch07-wk.js
// ----------------------------------------------------------------------------
// Chapter 7: Knowledge and Attitude (WKs) Profiles.
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph } from "../templates/shared.js";
import { createChapterTitle } from "../templates/headings.js";
import { createLabeledBulletList } from "../templates/lists.js";

const data = JSON.parse(fs.readFileSync("./data/wk.json", "utf-8"));

export function buildChapter7() {
    const children = [
        createChapterTitle("7. Knowledge and Attitude (WKs) Profiles"),
        createParagraph({ text: data.intro }),
        ...createLabeledBulletList(data.items),
    ];

    return [{ orientation: "portrait", children }];
}
