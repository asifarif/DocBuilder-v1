// chapters/ch01-university-info.js
// ----------------------------------------------------------------------------
// Chapter 1: University Information.
// 1.1 HITEC University   — prose
// 1.2 Department of BME  — prose + Figure 1.1 (timeline)
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph } from "../templates/shared.js";
import {
    createChapterTitle,
    createSectionTitle,
    createFigureCaption,
} from "../templates/headings.js";
import { buildTimeline } from "../builders/timeline.js";

const data = JSON.parse(fs.readFileSync("./data/university.json", "utf-8"));

export function buildChapter1() {
    const children = [
        createChapterTitle("1. University Information"),

        createSectionTitle("1.1. HITEC University"),
        ...data.hitecUniversity.map((p) => createParagraph({ text: p })),

        createSectionTitle("1.2. Department of Biomedical Engineering"),
        ...data.department.map((p) => createParagraph({ text: p })),

        // Figure 1.1
        buildTimeline(),
        createFigureCaption(
            "Figure 1.1",
            "Department of Biomedical Engineering - Timeline"
        ),
    ];

    return [{ orientation: "portrait", children }];
}
