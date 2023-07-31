import { sign, verify, JwtPayload } from "jsonwebtoken";

interface SignOptions {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h",
};

const secret_key = process.env.SECRET_KEY;

export function signToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
): string {
  return sign(payload, secret_key!, options);
}

export function verifyToken(token: string) {
  try {
    return verify(token, secret_key!) as JwtPayload;
  } catch (error) {
    return null;
  }
}
