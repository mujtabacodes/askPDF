"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConvHistory = exports.combineDocuments = void 0;
const combineDocuments = (docs) => {
    return docs.map((doc) => doc.pageContent).join('\n\n');
};
exports.combineDocuments = combineDocuments;
const formatConvHistory = (messages) => {
    return messages
        .map((message, i) => {
        if (i % 2 === 0) {
            return `Human: ${message}`;
        }
        else {
            return `AI: ${message}`;
        }
    })
        .join('\n');
};
exports.formatConvHistory = formatConvHistory;
//# sourceMappingURL=funct.js.map