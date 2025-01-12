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
