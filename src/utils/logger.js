const logwinston =require("winston")

const logger=logwinston.createLogger({
    transports:[
        new logwinston.transports.Console({level:"http"}),
        new logwinston.transports.File({filename:'./errors.log',level:"warn"})
    ]
})

const addLogger=(req,res,next)=>{
    req.logger=logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    next();
}

module.exports = { addLogger};