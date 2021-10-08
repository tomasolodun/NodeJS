var fsAwaitable = require("fs").promises;
var fs = require("fs");
const basePath = __dirname + "\\internalFileSystem\\";
const allowedFileExtensions = ["log", "txt", "json", "yaml", "xml", "js"];
const log = require("log-to-file");
manager = {};
const customLoger = (textToLog) => {
  log(textToLog, __dirname + "logs.log");
};

manager.readFile = async (fileTitle) => {
  let filePath = basePath + fileTitle;
  customLoger(`Method execution started (readFile). Parameters : ${fileTitle}`);
  try {
    if (checkIsFileExists(fileTitle)) {
      const result = await fsAwaitable.readFile(filePath, "utf-8");
      customLoger(
        `Method execution successfully finished (readFile). Result: ${result}`
      );
      return result;
    } else {
      throw new Error("File does not exists. Can not read the file.");
    }
  } catch (error) {
    let errorMessage = `Got an error trying to read the file: ${error.message}`;
    customLoger(
      `Method execution finished with exception(readFile). Exception: ${errorMessage}`
    );
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

manager.readFiles = async () => {
  customLoger(`Method execution started (readFiles).`);
  try {
    checkIsFileExists();
    const result = await fsAwaitable.readdir(basePath);
    customLoger(
      `Method execution successfully finished (readFiles). Result: ${result}`
    );
    return result;
  } catch (error) {
    let errorMessage = `Got an error trying to read the files: ${error.message}`;
    customLoger(
      `Method execution finished with exception (readFiles). Exception: ${errorMessage}`
    );
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

manager.upsertFile = async (fileTitle, fileContent, isUpdate) => {
  customLoger(
    `Method execution started (upsertFile). Parameters : ${
      [fileTitle, fileContent, isUpdate]
    }`
  );
  try {
    if (!fileTitle || !fileTitle.length) {
      throw new Error(
        "File title should be provided. Please provide proper file title."
      );
    }
    let splittedFileTitle = fileTitle.split(".");
    if (splittedFileTitle.length == 1) {
      throw new Error(
        "File title should contains both required parts (title and extension), please provide proper file title."
      );
    }
    if (
      !allowedFileExtensions.includes(
        splittedFileTitle[splittedFileTitle.length - 1]
      )
    ) {
      throw new Error(
        "Provided file extension does not allowed, please provide file title with extension from list of allowed extensions.\nList of allowed extensions:" +
          JSON.stringify(allowedFileExtensions)
      );
    }
    let filePath = basePath + fileTitle;
    let isExist = checkIsFileExists(fileTitle);
    if (!isUpdate && isExist) {
      throw new Error(
        "File already exist. Can not create new with same title, delete old one firstly please."
      );
    }
    if (isUpdate && !isExist) {
      throw new Error(
        "File not already exist. Can not update file, use create instead."
      );
    }
    // writeFile function with fileTitle, content and callback function
    await fsAwaitable.writeFile(filePath, fileContent);
    const result = isUpdate
      ? "File successfully updated."
      : "File successfully created.";
      customLoger(
        `Method execution successfully finished (upsertFile). Result: ${result}`
      );
    return result;
  } catch (error) {
    let errorMessage = `Got an error trying to ${
      isUpdate ? "updated" : "created"
    } the file: ${error.message}`;
    customLoger(
      `Method execution finished with exception (upsertFile). Exception: ${errorMessage}`
    );
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

manager.deleteFile = async (fileTitle) => {
  customLoger(
    `Method execution started (deleteFile). Parameters : ${fileTitle}`
  );
  try {
    let filePath = basePath + fileTitle;
    let isExist = checkIsFileExists(fileTitle);
    if (!isExist) {
      throw new Error(`File with file title ${fileTitle} missing.`);
    }
    await fsAwaitable.unlink(filePath);
    const result = "File deleted successfully";
    customLoger(
      `Method execution successfully finished (deleteFile). Result: ${result}`
    );
    return result;
  } catch (error) {
    let errorMessage = `Got an error trying to delete the file: ${error.message}`;
    customLoger(
      `Method execution finished with exception (deleteFile). Exception: ${errorMessage}`
    );
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const checkIsFileExists = (fileTitle) => {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  return fs.existsSync(basePath + fileTitle);
};

module.exports = manager;
