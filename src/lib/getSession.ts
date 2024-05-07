import { cache } from "react";
import { getAuthSession } from "./auth";

export default cache(getAuthSession);
