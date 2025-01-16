import { useDomDataTheme, useDynamicComp } from "@site/src/helper/index";
import type { SandpackProps } from "@codesandbox/sandpack-react";
import { FC } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { githubLight, dracula } from "@codesandbox/sandpack-themes";

const CodeSandboxSandpack: FC<SandpackProps> = (props) => {
  const [theme] = useDomDataTheme();

  const Sandpack = useDynamicComp<SandpackProps>(
    import("@codesandbox/sandpack-react"),
    {
      mouldeFilter: (m) => m.Sandpack,
    }
  );

  return (
    <>
      {Sandpack && (
        <Sandpack
          theme={theme === "light" ? githubLight : dracula}
          {...props}
        />
      )}
    </>
  );
};

const BrowserOnlyCodeSandboxSandpack: FC<SandpackProps> = (props) => (
  <BrowserOnly>
    {() => {
      return <CodeSandboxSandpack {...props} />;
    }}
  </BrowserOnly>
);

export default BrowserOnlyCodeSandboxSandpack;
