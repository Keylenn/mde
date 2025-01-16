import { useState } from "react";
import {
  showToast,
  readJsonFile,
  useDomDataTheme,
  useDynamicNpmComp,
} from "@site/src/helper/index";
import "./index.css";
import BrowserOnly from "@docusaurus/BrowserOnly";

const JsonReviewer = () => {
  const [theme] = useDomDataTheme();
  const [jsonData, setJsonData] = useState({});

  const ReactJson = useDynamicNpmComp(import("react-json-view"));

  return (
    <>
      <div style={{ marginBottom: "2em" }}>
        <button>
          <label htmlFor="file-upload">选择文件</label>
        </button>
        <span style={{ marginLeft: "1em" }}>
          选择json文件后会自动解析到下面的编辑器👇
        </span>
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={async (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
              const json = await readJsonFile(selectedFile).catch(() => {
                showToast("解析失败，请检查 json 文件");
              });
              if (typeof json === "object") setJsonData(json);
            }
          }}
          className="file"
          accept=".json"
        />
      </div>
      {ReactJson && (
        <ReactJson
          src={jsonData}
          theme={theme === "light" ? "rjv-default" : "monokai"}
          onEdit={(edit) => {
            console.log("编辑内容:", edit);
          }}
          onAdd={(add) => {
            console.log("新增内容:", add);
          }}
          onDelete={(del) => {
            console.log("删除内容:", del);
          }}
        />
      )}
    </>
  );
};

const BrowserOnlyJsonReviewer = () => (
  <BrowserOnly>
    {() => {
      return <JsonReviewer />;
    }}
  </BrowserOnly>
);

export default BrowserOnlyJsonReviewer;
