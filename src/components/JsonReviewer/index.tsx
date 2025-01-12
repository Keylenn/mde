import { useState, useEffect } from "react";
import useDomDataTheme from "../../helper/hooks/useDomDataTheme";
import { readJsonFile } from "../../helper/util";
import showToast from "../../helper/toast";
import "./index.css";

const JsonReviewer = () => {
  const [theme] = useDomDataTheme();
  const [jsonData, setJsonData] = useState({});

  const [ReactJson, setReactJson] = useState(null);

  useEffect(() => {
    // 动态导入 react-json-view 组件
    import("react-json-view")
      .then((module) => {
        // 使用 setJsonViewer 来更新状态，这样会触发组件重新渲染
        setReactJson(() => module.default);
      })
      .catch((error) => {
        console.error("Failed to dynamically import react-json-view", error);
      });
  }, []); // 空依赖数组表示这个 effect 只会在组件挂载时运行一次

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
