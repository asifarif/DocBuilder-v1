// styles/constants.js
// ----------------------------------------------------------------------------
// Single source of truth for visual tokens. Edit here, the whole doc updates.
// ----------------------------------------------------------------------------

export const COLORS = {
    NAVY: "1F3864",
    LIGHT_GREY: "F2F2F2",
    WHITE: "FFFFFF",
    BLACK: "000000",
    DARK_GREY: "595959",
};

export const FONTS = {
    BODY: "Arial",
    HEADING: "Arial",
};

// docx uses HALF-POINTS. So 11pt = 22, 12pt = 24, 14pt = 28, 16pt = 32.
export const SIZES = {
    BODY: 24,           // 11pt body text
    SMALL: 20,          // 10pt — table cells, captions
    HEADING_3: 24,      // 12pt — sub-section
    HEADING_2: 26,      // 13pt — section (1.1, 1.2)
    HEADING_1: 32,      // 16pt — chapter title
    TITLE_LARGE: 40,    // 20pt — title page main heading
    TITLE_MEDIUM: 32,   // 16pt — title page sub-heading
};

// Cell margins and page margins are in TWIPS (1/20 of a point).
export const CELL_MARGINS = {
    top: 80,
    bottom: 80,
    left: 110,
    right: 110,
};

export const PAGE_MARGINS = {
    top: 1080,    // 0.75"
    bottom: 1080,
    left: 1080,
    right: 1080,
};

// Spacing between paragraphs (twips). 200 ≈ 10pt after-paragraph.
export const SPACING = {
    PARAGRAPH: 200,
    HEADING_BEFORE: 360,
    HEADING_AFTER: 200,
    LIST_ITEM: 100,
    LINE: 300,           // 240=single, 360=1.5x, 480=double

};