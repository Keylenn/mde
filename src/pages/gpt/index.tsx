import { useDynamicComp } from "@site/src/helper/index";
import { FC } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const Page: FC = () => {
  const GPT = useDynamicComp(import("./GPT"));

  return <>{GPT && <GPT />}</>;
};

const BrowserOnlyPage: FC = () => (
  <BrowserOnly>
    {() => {
      return <Page />;
    }}
  </BrowserOnly>
);

export default BrowserOnlyPage;
