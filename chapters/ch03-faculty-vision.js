// chapters/ch03-faculty-vision.js
// ----------------------------------------------------------------------------
// Chapter 3: Faculty Vision and Mission.
// NOTE: Approval text is "Approved ???" in the source PDF.
// Update APPROVALS.facultyV / .facultyM in config.js when known.
// ----------------------------------------------------------------------------

import fs from "fs";
import { createParagraph, createApprovalLine } from "../templates/shared.js";
import { createChapterTitle, createSectionTitle } from "../templates/headings.js";
import { APPROVALS } from "../config.js";

const data = JSON.parse(fs.readFileSync("./data/university.json", "utf-8"));

export function buildChapter3() {
    const children = [
        createChapterTitle("3. Faculty Vision and Mission"),

        createSectionTitle("Faculty of Engineering & Technology Vision"),
        createParagraph({ text: data.facultyVision }),
        createApprovalLine(APPROVALS.facultyV),

        createSectionTitle("Faculty of Engineering & Technology Mission"),
        createParagraph({ text: data.facultyMission }),
        createApprovalLine(APPROVALS.facultyM),
    ];

    return [{ orientation: "portrait", children }];
}
