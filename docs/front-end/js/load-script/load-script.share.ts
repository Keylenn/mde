const scriptCache = new Map<string, Promise<void>>();

interface Option {
  useCache?: boolean;
}

export default function loadScript(
  url: string,
  { useCache = true }: Option = {}
) {
  if (useCache && scriptCache.has(url)) {
    return scriptCache.get(url);
  }

  const promise = new Promise<void>((resolve, reject) => {
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
