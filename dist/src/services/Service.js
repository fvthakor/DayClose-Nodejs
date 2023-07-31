"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor() {
        this.formatDate = (date) => {
            var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-');
        };
    }
    response({ code, message, data, error, total }) {
        return {
            code,
            message: code !== 500 ? message : process.env.DEBUG ? message : 'Request failed due to an internal error.',
            data,
            error,
            total
        };
    }
}
exports.default = Service;
