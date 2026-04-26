// config.js
// ----------------------------------------------------------------------------
// Central configuration. Change ANY of these without touching chapter logic.
// ----------------------------------------------------------------------------

export const DOC_META = {
    universityName: "HITEC University, Taxila",
    departmentName: "Department of Biomedical Engineering",
    programName: "BS Biomedical Engineering",
    batch: "Batch 2024 & onwards",
    secondaryBatch: "Batch 2025 & onwards",
    documentTitle: "DEPARTMENTAL OUTCOME BASED EDUCATION (OBE) FRAMEWORK",
    documentDate: "March 2026",
    creator: "Department of Biomedical Engineering, HITEC University",
    outputFile: "HITEC-BME-OBE-Framework.docx",
    logoPath: "./assets/logo.png", // optional — leave file missing if no logo
};

// One place for all "Approved by ..." lines so you can update the date once.
export const APPROVALS = {
    universityVM: "Approved by 40th Academic Council, March 4, 2026",
    facultyV: "Approved ???",  // <-- TODO: confirm
    facultyM: "Approved ???",  // <-- TODO: confirm
    deptMission: "Approved by 40th Academic Council, March 4, 2026",
    peo:
        "Approved by 48th Board of Faculty of Engineering & Technology, May 21, 2025, " +
        "Approved by 40th Academic Council, March 4, 2026",
};

// Master switch — comment out a chapter to skip it.
// Order in this array determines order in the document.
export const CHAPTER_FLAGS = {
    frontMatter: true,
    ch01_universityInfo: true,
    ch02_universityVM: true,
    ch03_facultyVM: true,
    ch04_deptMission: true,
    ch05_peo: true,
    ch06_sdg: true,
    ch07_wk: true,
    ch08_plo: true,
    ch09_ec: true,
    ch10_correlation: true,
};
