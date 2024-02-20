import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import "./theme-toggle.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/themeSlice";

export default function ThemeToggle() {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <button className="theme-toggle-button" onClick={handleClick}>
      {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
    </button>
  );
}
