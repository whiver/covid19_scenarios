const path = require("path")
const fs = require("fs")
const process = require("process")

// Reference file used for translation (the English one)
const baseTranslationFile = path.join(__dirname, "../src/locales/en/translation.json")

if (process.argv.length != 3) {
    console.error("Usage: node updateTranslations.js my/path/to/translation.json")
    return 1
} else if (!fs.existsSync(process.argv[2])) {
    console.error(`Invalid file '${process.argv[2]}'`)
}

const translations = require(baseTranslationFile)
const targetFileTranslations = require(path.resolve(process.argv[2]))

// Remove keys not present anymore in the reference file
for (var translationKey in targetFileTranslations) {
    if (typeof(translations[translationKey]) != "string") {
        delete targetFileTranslations[translationKey]
    }
}

// Add missing keys in the target file
for (var translationKey in translations) {
    if (typeof(targetFileTranslations[translationKey]) != "string") {
        targetFileTranslations[translationKey] = null
    }
}

fs.writeFileSync(process.argv[2], JSON.stringify(targetFileTranslations, null, 2))
