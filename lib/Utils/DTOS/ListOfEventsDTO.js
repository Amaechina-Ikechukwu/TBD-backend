"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOfEventDTO = void 0;
const ListOfEventDTO = (data) => {
    delete data.created;
    delete data.etag;
    delete data.iCalUID;
    delete data.updated;
    delete data.htmlLink;
    delete data.kind;
    return data;
};
exports.ListOfEventDTO = ListOfEventDTO;
//# sourceMappingURL=ListOfEventsDTO.js.map