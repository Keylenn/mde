declare module "@theme/Heading" {
  const Heading: ComponentType<any>;
  export default Heading;
}

declare module "@theme/Layout" {
  const Layout: ComponentType<any>;
  export default Layout;
}
declare module "@docusaurus/Link" {
  const Link: ComponentType<any>;
  export default Link;
}

declare module "@docusaurus/BrowserOnly" {
  const BrowserOnly: ComponentType<any>;
  export default BrowserOnly;
}

declare module "@codesandbox/sandpack-themes" {
  // 定义模块的类型
  export const githubLight: any;
  export const dracula: any;
}
