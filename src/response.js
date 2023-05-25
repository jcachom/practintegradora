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

 

module.exports.ApiResponse = ApiResponse