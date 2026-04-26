// chapters/ch02-vision-mission.js
// ----------------------------------------------------------------------------
// Chapter 2: HITEC University Vision and Mission.
// ----------------------------------------------------------------------------

import fs from "fs";
import { AlignmentType } from "docx";
import { createParagraph, createApprovalLine } from "../templates/shared.js";
import { createChapterTitle, createSectionTitle } from "../templates/headings.js";
import { APPROVALS } from "../config.js";

const data = JSON.parse(fs.readFileSync("./data/university.json", "utf-8"));

export function buildChapter2() {
    const children = [
        createChapterTitle("2. HITEC University Vision and Mission"),
        createParagraph({
            text:
                "The University vision and mission are well defined, published, and publicized " +
                "and also available on university website at: " +
                "(https://www.hitecuni.edu.pk/About/VisionMission.aspx)",
        }),

        createSectionTitle("University Vision"),
        createParagraph({ text: data.universityVision }),
        createApprovalLine(APPROVALS.universityVM),

        createSectionTitle("University Mission"),
        createParagraph({ text: data.universityMission }),
        createApprovalLine(APPROVALS.universityVM),
    ];

    return [{ orientation: "portrait", children }];
}
