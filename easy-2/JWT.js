const jwt = require("jsonwebtoken");


const secretKey = "sup3rS3cr3t"
const token = jwt.sign("barath@gmail.com",secretKey)

console.log(token)

jwt.verify(token,secretKey,(err,key)=>{
    if (err) throw err;
    console.log(key)
})