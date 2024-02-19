import { useEffect, useState } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function ThemeToggle() {
  const [matchesDark, setMatchesDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.dataset.theme = matchesDark ? "dark" : "light";
  }, [matchesDark]);

  const handleClick = () => {
    setMatchesDark((prevState) => !prevState);
  };

  return (
    <button onClick={handleClick}>
      {matchesDark ? <DarkMode /> : <LightMode />}
    </button>
  );
}
