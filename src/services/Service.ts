import { ResponseModel } from "../interfaces";

class Service {
    response({ code, message, data, error, total }: ResponseModel) {
        return {
            code,
            message: code !== 500 ? message : process.env.DEBUG ? message : 'Request failed due to an internal error.',
            data,
            error,
            total
        }
    }

    formatDate = (date:Date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}

export default Service;