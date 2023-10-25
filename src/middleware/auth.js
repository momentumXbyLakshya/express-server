import * as jose from "jose";

const JWKS = jose.createRemoteJWKSet(
  new URL(`${process.env.HANKO_API_URI}/.well-known/jwks.json`)
);

export const isAuthenticated = async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.hanko) {
    token = req.cookies.hanko;
  }
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  await jose.jwtVerify(token, JWKS).catch((err) => {
    res.status(401).send("Authentication Token not valid");
    return;
  });
  next();
};
