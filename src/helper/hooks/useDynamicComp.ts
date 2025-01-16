import { ReactNode, useState, useEffect } from "react";

interface Options {
  fallback?: ReactNode;
  errorFallback?: ReactNode | ((error: Error) => ReactNode);
  mouldeFilter?: (module: any) => any;
}

type CompPropsType = any;

export default function useDynamicComp<T extends CompPropsType>(
  modulePromise: Promise<any>,
  { fallback = null, errorFallback = null, mouldeFilter }: Options = {}
): React.ComponentType<T> | null {
  const [Comp, setComp] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    modulePromise
      .then((module: any) => {
        const m = module?.default || module;
        setComp(() =>
          typeof mouldeFilter === "function" ? mouldeFilter(m) : m
        );
      })
      .catch(setError);
  }, []);

  if (error && errorFallback) {
    const result: any =
      typeof errorFallback === "function"
        ? errorFallback(error)
        : errorFallback;

    return result;
  }

  return Comp ?? fallback;
}
