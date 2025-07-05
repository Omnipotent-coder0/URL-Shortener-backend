import { body } from "express-validator";

const postRecord = [
     body("originalURL")
    .notEmpty().withMessage("Original URL is required")
    .isURL({ require_protocol: true }).withMessage("Original URL must be a valid URL"),
];

const patchRecord = [
    body("originalURL")
    .notEmpty().withMessage("Original URL is required")
    .isURL({ require_protocol: true }).withMessage("Original URL must be a valid URL"),
]

export {
    postRecord,
    patchRecord
}