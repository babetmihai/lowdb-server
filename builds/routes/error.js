"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    switch (true) {
        case (!err): {
            res.status(404).send(err);
            break;
        }
        case (isNaN(err.message)): {
            res.status(500).send(err);
            break;
        }
        default: {
            res.status(err.message).send(err);
        }
    }
};
//# sourceMappingURL=error.js.map