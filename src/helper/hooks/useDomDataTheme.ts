import { useState, useEffect } from "react";

export default function useDomDataTheme(
  target = document.documentElement,
  { name = "theme" } = {}
) {
  const getTheme = () => target?.dataset?.[name] || "light";

  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === `data-${name}`
        ) {
          setTheme(getTheme);
        }
      }
    });

    observer.observe(target, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    target.dataset[name] = newTheme;
  };

  return [theme, toggleTheme] as const;
}
