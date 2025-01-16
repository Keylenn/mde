import CodeSandboxSandpack from "@site/src/components/Sandpack";

const indexCode = `import "./style.css";
import createBox from "@boxly/core";
import setupCounter from "./setup";


const counterBox = createBox(0);

setupCounter("#counter", {
  box: counterBox,
});

`;

const setupCode = `
import type { ProtectedBox } from "@boxly/core";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = \`
  <div>
    <a href="https://www.npmjs.com/package/@boxly/core" target="_blank" class="package">
      <img
        referrerpolicy="no-referrer"
        src="https://gitee.com/keylenn/cos/raw/master/imgs/@boxly-logo.png"
        loading="lazy"
        class="logo"
      />
      <code>@boxly/core</code>
    </a>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Logo and Package Name to learn more
    </p>
  </div>
\`;

export default function setupCounter(
  selector: string,
  {
    box,
    customHtml,
  }: { box: ProtectedBox; customHtml?: (count: number) => string }
) {
  const element = document.querySelector<HTMLButtonElement>(selector)!

  const setCounter = () => {
    const count = box.getData();
    element.innerHTML = customHtml ? customHtml(count) : \`count is \${count}\`;
  };
  element.addEventListener("click", () => {
    box.setData((c: number) => c + 1);
    setCounter();
  });
  setCounter();
}
`;

const styleCssCode = `
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #213547;
  background-color: #ffffff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
    color: #747bff;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 2em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.read-the-docs {
  color: #888;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
 background-color: #f9f9f9;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;

}


button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
.package {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  margin-bottom: 1em;
}
`;

const BoxlyCoreDemo = () => {
  return (
    <CodeSandboxSandpack
      template="vanilla-ts"
      files={{
        "/index.ts": indexCode,
        "/setup.ts": setupCode,
        "/style.css": styleCssCode,
      }}
      customSetup={{ dependencies: { "@boxly/core": "latest" } }}
    />
  );
};

export default BoxlyCoreDemo;
