// chapters/ch04-dept-mission.js
// ----------------------------------------------------------------------------
// Chapter 4: Department Mission of Biomedical Engineering.
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph, createApprovalLine } from "../templates/shared.js";
import { createChapterTitle } from "../templates/headings.js";
import { APPROVALS } from "../config.js";

const data = JSON.parse(fs.readFileSync("./data/university.json", "utf-8"));

export function buildChapter4() {
    const children = [
        createChapterTitle("4. Department Mission of Biomedical Engineering"),
        createParagraph({ text: data.departmentMission }),
        createApprovalLine(APPROVALS.deptMission),
    ];

    return [{ orientation: "portrait", children }];
}
