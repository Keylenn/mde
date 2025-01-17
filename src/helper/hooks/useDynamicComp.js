import { useState, useEffect } from "react";
export default function useDynamicComp(modulePromise, { fallback = null, errorFallback = null, mouldeFilter } = {}) {
    const [Comp, setComp] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        modulePromise
            .then((module) => {
            const m = module?.default || module;
            setComp(() => typeof mouldeFilter === "function" ? mouldeFilter(m) : m);
        })
            .catch(setError);
    }, []);
    if (error && errorFallback) {
        const result = typeof errorFallback === "function"
            ? errorFallback(error)
            : errorFallback;
        return result;
    }
    return Comp ?? fallback;
}
