"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    switch (true) {
        case (!err): {
            res.sendStatus(404);
            break;
        }
        case (isNaN(err.message)): {
            res.sendStatus(500);
            break;
        }
        default: {
            res.sendStatus(err.message);
        }
    }
};
//# sourceMappingURL=error.js.map