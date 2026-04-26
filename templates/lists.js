// templates/lists.js
// ----------------------------------------------------------------------------
// Bullet list helpers.
// Common pattern in this document: bullets have a bold leading label
// followed by descriptive text, e.g. "PLO-1 Engineering Knowledge: Apply ..."
// ----------------------------------------------------------------------------

import { Paragraph, AlignmentType } from "docx";
import { createStyledText } from "./shared.js";
import { SIZES, SPACING } from "../styles/constants.js";

// Plain bullet
export function createBullet(text) {
    return new Paragraph({
        bullet: { level: 0 },
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: SPACING.LIST_ITEM },
        children: [createStyledText({ text, size: SIZES.BODY })],
    });
}

// Bullet with bold leading label, e.g. "PLO-1 Engineering Knowledge: Apply ..."
export function createLabeledBullet({ label, text }) {
    return new Paragraph({
        bullet: { level: 0 },
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: SPACING.LIST_ITEM },
        children: [
            createStyledText({ text: `${label} `, bold: true, size: SIZES.BODY }),
            createStyledText({ text, size: SIZES.BODY }),
        ],
    });
}

// Helper: turn an array of {label, text} objects into bullet paragraphs
export function createLabeledBulletList(items) {
    return items.map((item) => createLabeledBullet(item));
}

// Helper: turn an array of strings into plain bullets
export function createBulletList(items) {
    return items.map((t) => createBullet(t));
}