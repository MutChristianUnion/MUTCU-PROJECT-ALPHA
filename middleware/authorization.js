require("dotenv").config();
const jwt = require("jsonwebtoken");
class Authorise {
  Access_token = (user) => {
    console.log("gerattion accessToken");
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  };

  Refresh_token = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.EX_DATE,
    });
  };
  Renew_token = (RefreshToken,response) =>{

      if (!RefreshToken)
        return response
          .status(401)
          .send("Access Denied.  No  Refresh token provided.");
      try {
        const decode = jwt.verify(
          RefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        console.log(decode.user);
        const user = decode.user;
        const AccessToken = this.Access_token({ user: user });
        response
          .cookie("refresh_token", RefreshToken, {
            httpOnly: true,
            sameSite: "strict",
          })
          .header("Authorization", AccessToken)
          .json("you have all of you data safe");
      } catch (error) {
        // console.error(error);
        response.status(400).json("invalid RefreshToken");
      }

  }

  Authenticate = (req, res, next) => {
    const AccessToken = req.headers["authorization"]?.split(" ")[1];
    const RefreshToken = req.cookies["refresh_token"];
    if (!AccessToken)
      return res.status(401).send("Access Denied.  No AccessToken token provided.");
    console.log({ accessToken: AccessToken, RefreshToken: RefreshToken });
    try {
      // console.log(process.env.ACCESS_TOKEN_SECRET)
      jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (error) {
      if (!error instanceof jwt.TokenExpiredError)
        return res.status(400).json("invalid AccessToken");
      this.Renew_token(RefreshToken,res)
    }
  };
}

module.exports = new Authorise();
