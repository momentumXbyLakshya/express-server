import * as jose from "jose";
import { NextFunction, Request, Response } from "express";

const JWKS = jose.createRemoteJWKSet(
  new URL(`${process.env.HANKO_API_URI}/.well-known/jwks.json`)
);

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.hanko) {
    console.log("hanko", req.cookies.hanko);
    token = req.cookies.hanko;
  }
  if (token === null || token.length === 0) {
    res.status(401).send("Unauthorized");
    return;
  }
  let authError = false;
  await jose.jwtVerify(token, JWKS).catch((err: unknown) => {
    authError = true;
    console.log(err);
  });
  if (authError) {
    res.status(401).send("Authentication Token not valid");
    return;
  }
  next();
};
