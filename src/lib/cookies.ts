import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";

const USER_ID_COOKIE_NAME = "user_anonymous_id";
const ONE_YEAR_IN_SECONDS = 31536000;

export const getUserIdCookie = (): string | undefined => {
  const userId = getCookie(USER_ID_COOKIE_NAME);
  return typeof userId === "string" ? userId : undefined;
};

export const setUserIdCookie = (userId: string): void => {
  setCookie(USER_ID_COOKIE_NAME, userId, {
    maxAge: ONE_YEAR_IN_SECONDS,
    path: "/",
    sameSite: "lax",
  });
};

export const deleteUserIdCookie = (): void => {
  deleteCookie(USER_ID_COOKIE_NAME);
};

export const getOrCreateUserId = (): string => {
  let userId = getUserIdCookie();

  if (!userId) {
    userId = uuidv4();
    setUserIdCookie(userId);
  }

  return userId;
};
