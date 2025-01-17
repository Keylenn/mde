declare module "@theme/Heading" {
  import type { Props } from "@theme/Heading";
  const Heading: ComponentType<Props>;
  export default Heading;
}

declare module "@theme/Layout" {
  import type { Props } from "@theme/Layout";
  const Layout: ComponentType<Props>;
  export default Layout;
}
declare module "@docusaurus/Link" {
  import type { Props } from "@theme/Link";
  const Link: ComponentType<Props>;
  export default Link;
}

declare module "@docusaurus/BrowserOnly" {
  import type { Props } from "@docusaurus/BrowserOnly";
  const BrowserOnly: ComponentType<Props>;
  export default BrowserOnly;
}

declare module "@theme/Tabs" {
  import type { Props } from "@theme/Tabs";
  const Tabs: ComponentType<Props>;
  export default Tabs;
}

declare module "@theme/TabItem" {
  import type { Props } from "@theme/TabItem";
  const TabItem: ComponentType<Props>;
  export default TabItem;
}

declare module "@theme/CodeBlock" {
  import type { Props } from "@theme/CodeBlock";
  const CodeBlock: ComponentType<Props>;
  export default CodeBlock;
}

declare module "@codesandbox/sandpack-themes" {
  // 定义模块的类型
  export const githubLight: any;
  export const dracula: any;
}

declare module "antd-style" {
  // 定义模块的类型
  export const ThemeProvider: ComponentType<any>;
}
