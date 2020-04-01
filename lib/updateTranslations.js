const path = require("path");
const fs = require("fs");
const process = require("process");
const baseTranslationFile = path.join(__dirname, "../src/locales/en/translation.json");

if (process.argv.length != 3) {
    console.error("Usage: node updateTranslations.js my/path/to/translation.json");
    return 1;
} else if (!fs.existsSync(process.argv[2])) {
    console.error(`Invalid file '${process.argv[2]}'`);
}

const translations = require(baseTranslationFile);
const targetFile = require(path.resolve(process.argv[2]));

for (var translationKey in translations) {
    if (typeof(targetFile[translationKey]) != "string") {
        targetFile[translationKey] = null;
    }
}

fs.writeFileSync(process.argv[2], JSON.stringify(targetFile, null, 2));
