"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexDistance = void 0;
function regexDistance(data) {
    const regex = /(\d+\.\d+ km)/g;
    const results = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
        results.push(match[1]);
    }
    return results;
}
exports.regexDistance = regexDistance;
//# sourceMappingURL=distance.js.map