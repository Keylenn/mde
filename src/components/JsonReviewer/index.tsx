import { useRef, useState } from "react";
import {
  showToast,
  readJsonFile,
  useDomDataTheme,
  useDynamicComp,
} from "@site/src/helper/index";
import "./index.css";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { exportJsonFile } from "@site/src/helper/util";

import { ReactJsonViewProps } from "react-json-view";

const JsonReviewer = () => {
  const [theme] = useDomDataTheme();
  const [jsonData, setJsonData] = useState(null);
  const reviewInfoRef = useRef({
    uploadFileName: "",
  });

  const ReactJson = useDynamicComp<ReactJsonViewProps | void>(
    import("react-json-view")
  );

  const handleSyncJsonData = (data: any) => {
    if (data?.updated_src) setJsonData(data.updated_src);
  };

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

              if (typeof json === "object") {
                const [name] = selectedFile.name.split(".");
                reviewInfoRef.current.uploadFileName = name;
                setJsonData(json);
              }
            }
          }}
          className="file"
          accept=".json"
        />
      </div>
      {ReactJson && (
        <>
          <ReactJson
            src={jsonData || {}}
            theme={theme === "light" ? "rjv-default" : "monokai"}
            onEdit={handleSyncJsonData}
            onAdd={handleSyncJsonData}
            onDelete={handleSyncJsonData}
          />
        </>
      )}
      {jsonData && (
        <div style={{ marginTop: "2em" }}>
          <button
            onClick={() => {
              const uploadFileName = reviewInfoRef.current.uploadFileName;
              console.log("uploadFileName", uploadFileName);
              if (jsonData) {
                exportJsonFile(jsonData, uploadFileName);
              }
            }}
          >
            生成文件
          </button>
          <span style={{ marginLeft: "1em" }}>
            根据编辑器内容生成JSON文件👆
          </span>
        </div>
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
