const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");
const outputFile = path.join(__dirname, "all-code.txt");

function readDirRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(readDirRecursive(filePath));
    } else if (
      filePath.endsWith(".ts") ||
      filePath.endsWith(".html") ||
      filePath.endsWith(".css")
    ) {
      // Include only Angular-related files
      results.push(filePath);
    }
  });
  return results;
}

const allFiles = readDirRecursive(srcDir);

fs.writeFileSync(outputFile, "", "utf-8"); // Clear the output file

allFiles.forEach((file) => {
  const fileContent = fs.readFileSync(file, "utf-8");
  fs.appendFileSync(outputFile, `\n\n// File: ${file}\n\n`);
  fs.appendFileSync(outputFile, fileContent);
});

console.log(`All code has been concatenated into ${outputFile}`);


// Terminal Command to run file : node concat-code.js
