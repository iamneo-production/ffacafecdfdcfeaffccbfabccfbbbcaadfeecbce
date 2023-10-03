var jwt = require("jsonwebtoken");
let JWTSECRETKEY="TECHNOELEVATEDEVELOPMENTTEAM"

const createToken = data => {
  var token = jwt.sign(data,JWTSECRETKEY);
  return token;
};

const verifyToken = token => {
  
  return jwt.verify(token,JWTSECRETKEY, function (err, decoded) {
    if (err) return { valid: false };
    return { valid: true, data: decoded };
  });
};

module.exports = { createToken, verifyToken };
