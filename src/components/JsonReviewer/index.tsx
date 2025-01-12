import { useState, useEffect } from "react";
import {
  showToast,
  readJsonFile,
  useDomDataTheme,
  useDynamicNpmComp,
} from "../../helper/index";
import "./index.css";

const JsonReviewer = () => {
  const [theme] = useDomDataTheme();
  const [jsonData, setJsonData] = useState({});

  const ReactJson = useDynamicNpmComp(import("react-json-view"));

  return (
    <>
      <input
        type="file"
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

export default JsonReviewer;
