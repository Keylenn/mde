export const readJsonFile = async (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const result = e.target.result;
        if (typeof result === "string") {
          resolve(JSON.parse(result));
        }
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        reject(null);
      }
    };
    reader.readAsText(file);
  });

export const exportJsonFile = (
  data: Record<string, any> | string,
  fileName?: string
) => {
  const jsonData =
    typeof data === "object" ? JSON.stringify(data, null, 2) : data;
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName || "mde.jsonviewer"}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
