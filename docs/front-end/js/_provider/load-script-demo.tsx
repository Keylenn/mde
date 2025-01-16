import CodeBlocks from "@site/src/components/CodeBlocks";
import CodeSandboxSandpack from "@site/src/components/Sandpack";

export const types = `interface Option {
  useCache?: boolean
}
`;

export const genCode = (language: string) => `const scriptCache = new Map();
${language === "ts" ? types : ""}
export default function loadScript(url: string, { useCache = true }${
  language === "ts" ? ": Option" : ""
} = {}) {
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
      reject(new Error(\`Failed to load script: \${url}\`));
    };

    document.head.appendChild(script);
  });

  useCache && scriptCache.set(url, promise);
  return promise;
}
`;

const fileName = "loadScript";

const indexCode = `import loadScript from "./loadScript";

loadScript("https://www.unpkg.com/jquery@3.7.1/dist/jquery.js").then(() => {
    $("#app").html("<h1>Hello MDE</h1>")
})

`;

export const Demo = () => {
  return (
    <CodeSandboxSandpack
      template="vanilla-ts"
      files={{
        "/index.ts": indexCode,
        [`/${fileName}.ts`]: genCode("ts"),
      }}
    />
  );
};

const apiCode = `${types}
loadScript(url: string, option?: Option): Promise<void>
`;

export const API = () => (
  <CodeBlocks
    blocks={[
      {
        language: "ts",
        code: apiCode,
      },
    ]}
  />
);

export const Impl = () => (
  <CodeBlocks
    blocks={["ts", "js"].map((language) => ({
      value: language,
      label: `${fileName}.${language}`,
      code: genCode(language),
      language,
    }))}
  />
);
