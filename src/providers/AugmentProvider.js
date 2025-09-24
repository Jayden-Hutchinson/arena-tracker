import { createContext, useContext, useEffect, useStat } from "react";

const AugmentContext = createContext(null);

export function AugmentProvider({ children }) {
  const [augments, setAugments] = useState(null);
}
