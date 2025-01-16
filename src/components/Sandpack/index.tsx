import { useDomDataTheme, useDynamicNpmComp } from "@site/src/helper/index";
import type { SandpackProps } from "@codesandbox/sandpack-react";
import { FC } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { githubLight, dracula } from "@codesandbox/sandpack-themes";

const CodeSandboxSandpack: FC<SandpackProps> = (props) => {
  const [theme] = useDomDataTheme();

  const Sandpack = useDynamicNpmComp(import("@codesandbox/sandpack-react"), {
    mouldeFilter: (m) => m.Sandpack,
  });

  return (
    <BrowserOnly>
      {() => {
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
      }}
    </BrowserOnly>
  );
};

export default CodeSandboxSandpack;