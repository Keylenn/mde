import { useState } from "react";
import ReactJson from "react-json-view";
// import useDomDataTheme from "../../helper/hooks/useDomDataTheme";
import { readJsonFile } from "../../helper/util";
import showToast from "../../helper/toast";
import "./index.css";

const JsonReviewer = () => {
  //   const [theme] = useDomDataTheme();
  const theme = "light";
  const [jsonData, setJsonData] = useState({});

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
    </>
  );
};

export default JsonReviewer;
