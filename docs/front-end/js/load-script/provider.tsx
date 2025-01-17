import CodeBlocks from "@site/src/components/CodeBlocks";
import CodeSandboxSandpack from "@site/src/components/Sandpack";

// @ts-ignore
import tsSource from "!!raw-loader!./load-script.share.ts";
// @ts-ignore
import jsSource from "!!raw-loader!./load-script.share.js";
import { extractTypeDeclarations } from "@site/src/helper/util";

const types = extractTypeDeclarations(tsSource);

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
        [`/${fileName}.ts`]: tsSource,
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
    blocks={[
      {
        language: "ts",
        code: tsSource,
      },
      {
        language: "js",
        code: jsSource,
      },
    ].map(({ language, code }) => ({
      value: language,
      label: `${fileName}.${language}`,
      code,
      language,
    }))}
  />
);
