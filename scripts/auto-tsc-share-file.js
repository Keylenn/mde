const fs = require("fs").promises;
const path = require("path");
const exec = require("exec-sh");
const pc = require("picocolors");

async function autoTscShareFile() {
  const root = process.cwd();
  const srcPath = path.resolve(root, "src");
  const docsPath = path.resolve(root, "docs");

  const extension = ".share.ts";

  let files = [];

  return Promise.all([
    findFilesWithExtension(srcPath, extension),
    findFilesWithExtension(docsPath, extension),
  ])
    .then(([srcFiles, docsFiles]) => {
      files = [...srcFiles, ...docsFiles];
      if (files.length === 0) return;

      const shs = files.map((file) =>
        exec
          .promise(`npx tsc ${file}  --target ESNext --skipLibCheck`)
          .catch((reason) => {
            return { fail: true, file, reason };
          })
      );
      console.log(
        `检测到有${pc.blueBright(
          files.length
        )}个需要同步生成js的文件，${pc.cyan("正在自动解析生成对应的js文件...")}`
      );
      Promise.all(shs).then((results) => {
        const failRes = results.filter((r) => r.fail);
        if (failRes.length) {
          failRes.forEach(({ file, reason }) => {
            console.log(`文件 (${pc.gray(file)})解析失败❌ ${reason}`);
          });
          return;
        }
        console.log(pc.greenBright("所有文件解析完成 ✅"));
      });
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
}

module.exports = autoTscShareFile;
async function findFilesWithExtension(basePath, extension) {
  const files = await fs.readdir(basePath, { withFileTypes: true });
  const filteredFiles = [];

  for (const file of files) {
    const fullPath = path.join(basePath, file.name);
    if (file.isDirectory()) {
      // 如果是目录，则递归调用
      const nestedFiles = await findFilesWithExtension(fullPath, extension);
      filteredFiles.push(...nestedFiles);
    } else if (file.name.endsWith(extension)) {
      // 如果文件名以指定扩展名结尾，则添加到结果数组
      filteredFiles.push(fullPath);
    }
  }

  return filteredFiles;
}
