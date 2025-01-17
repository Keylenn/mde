const scriptCache = new Map();
export default function loadScript(url, { useCache = true } = {}) {
    if (useCache && scriptCache.has(url)) {
        return scriptCache.get(url);
    }
    const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.type = "text/javascript";
        script.async = true;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject(new Error(`Failed to load script: ${url}`));
        };
        document.head.appendChild(script);
    });
    useCache && scriptCache.set(url, promise);
    return promise;
}
