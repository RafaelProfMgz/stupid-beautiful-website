import { getCookie, setCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "user_unique_id";

export const getUserId = (): string | undefined => {
  const userId = getCookie(COOKIE_NAME);
  return typeof userId === "string" ? userId : undefined;
};

export const ensureUserId = (): string => {
  let userId = getUserId();

  if (!userId) {
    userId = uuidv4();
    setCookie(COOKIE_NAME, userId, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }
  return userId;
};
