const jwt = require('jsonwebtoken');

const authtenticate = (req, res, next) => {


  const token = req.headers.auth?.split(" ")[1] ?? null;
  
  if(token){
    try {
      
      const verified = jwt.verify(token, `${process.env.SECRET_KEY_JWT}`);
      console.log(verified);
      req.verifiedUser = verified.user;
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
  };
 };
   next()
};

module.exports = {authtenticate};

