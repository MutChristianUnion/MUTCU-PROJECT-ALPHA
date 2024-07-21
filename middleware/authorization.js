require("dotenv").config();
const jwt = require("jsonwebtoken");
class Authorise {
  #access_token = (user) => {
    console.log("gerattion accessToken")
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  };
  #refresh_token=(user)=> {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.EX_DATE,
    });
  }

  Access_token=(user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
  }

  Refresh_token=(user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.EX_DATE,
    });
  }

  Authenticate = (req, res, next)=> {
    const AccessToken = req.headers["authorization"].split(" ")[1];
    const RefreshToken = req.cookies["refresh_token"];
    if (!AccessToken && !RefreshToken)
      return res.status(401).send("Access Denied.  No token provided.");
    console.log({ accessToken: AccessToken, RefreshToken: RefreshToken });
    try {
      // console.log(process.env.ACCESS_TOKEN_SECRET)
      jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (error) {
      // console.log("access_token :::", error);
      if (!error instanceof jwt.TokenExpiredError)
        return res.status(400).json("invalid AccessToken");
      if (!RefreshToken)
        return res
          .status(401)
          .send("Access Denied.  No  Refresh token provided.");
      try {
        const decode = jwt.verify(
          RefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        console.log(decode.user);
        const user = decode.user;
        const AccessToken = this.#access_token({ user: user });
        res
          .cookie("refresh_token", RefreshToken,{ httpOnly: true, sameSite: 'strict' })
          .header("Authorization", AccessToken)
          .json("you have all of you data safe");
      } catch (error) {
        console.error(error);
        res.status(400).json("invalid RefreshToken");
      }
    }
  }
}

module.exports = new Authorise();
