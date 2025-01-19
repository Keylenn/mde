import { useDynamicComp } from "@site/src/helper/index";
import { FC } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const Page: FC = () => {
  const ChatComp = useDynamicComp(import("./Chat"));

  return <>{ChatComp && <ChatComp />}</>;
};

const BrowserOnlyPage: FC = () => (
  <BrowserOnly>
    {() => {
      return <Page />;
    }}
  </BrowserOnly>
);

export default BrowserOnlyPage;
