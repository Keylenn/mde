import { ReactNode, useState, useEffect } from "react";

interface Options {
  fallback?: ReactNode;
  mouldeFilter?: (module: any) => any;
}

export default function useDynamicNpmComp(
  importPromise: Promise<any>,
  { fallback = null, mouldeFilter }: Options = {}
) {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    importPromise
      .then((module) => {
        const m = module?.default || module;
        setComp(() =>
          typeof mouldeFilter === "function" ? mouldeFilter(m) : m
        );
      })
      .catch((error) => {
        console.error("Failed to dynamically import react-json-view", error);
      });
  }, []);
  return Comp ?? fallback;
}
