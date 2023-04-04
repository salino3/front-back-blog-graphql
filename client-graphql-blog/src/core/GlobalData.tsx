import React from "react";
import { MyState } from "./interface";


export const GlobalData = React.createContext<MyState>({} as MyState);