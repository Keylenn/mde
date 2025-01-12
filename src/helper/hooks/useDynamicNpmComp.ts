import { ReactNode, useState, useEffect } from "react";

interface Options {
  fallback?: ReactNode;
}

export default function useDynamicNpmComp(
  importPromise: Promise<any>,
  { fallback = null }: Options = {}
) {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    importPromise
      .then((module) => {
        setComp(() => module?.default);
      })
      .catch((error) => {
        console.error("Failed to dynamically import react-json-view", error);
      });
  }, []);
  return Comp ?? fallback;
}
