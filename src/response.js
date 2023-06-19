class ApiResponse {

    constructor(status, msg, payload) {
        this.status = status;
        this.msg = msg;
        this.payload = payload;
        
    }

    response(){
        return {
            status:  this.status,
            msg:   this.msg ,
            payload:  this.payload
        }
    }

}

 
let ___dirname = __dirname;

 
module.exports  ={ ApiResponse,___dirname}