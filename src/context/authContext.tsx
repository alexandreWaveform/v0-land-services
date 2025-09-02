import { createContext } from "react";

// undefined is used to ensure when the context has not been set yet
export const AuthContext = createContext<string | undefined>(undefined);