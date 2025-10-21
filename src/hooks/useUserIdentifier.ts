// /hooks/useUserIdentifier.ts
"use client"; // Obrigatório para hooks

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "user_unique_id";

export const useUserIdentifier = () => {
  const [userId, setUserIdState] = useState<string | undefined>(() =>
    getCookie(COOKIE_NAME)
  );

  useEffect(() => {
    if (!userId) {
      const newUserId = uuidv4();
      setCookie(COOKIE_NAME, newUserId, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      setUserIdState(newUserId);
    }
  }, [userId]);

  return userId;
};

// Como usar em um componente:
// const MyClientComponent = () => {
//   const userId = useUserIdentifier();
//   return <div>O ID do usuário é: {userId}</div>;
// }
