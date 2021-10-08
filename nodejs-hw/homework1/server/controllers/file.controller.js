const fileSystemManager = require("../managers/fileSystemManager");

exports.readOneRequest = async (req, res) => {
  try {
    const { filename } = req.params;
    var result = await fileSystemManager.readFile(filename);
    res.status(200).json({ fileContent: result });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

exports.readAllRequest = async (req, res) => {
  try {
    var result = await fileSystemManager.readFiles();
    res.status(200).json({ existingFiles: result });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

exports.createOneRequest = async (req, res) => {
  try {
    const { filename, content } = req.body;
    var result = await fileSystemManager.upsertFile(
      filename,
      content,
      false
    );
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

exports.updateOneRequest = async (req, res) => {
  try {
    const { filename } = req.params;
    const { content } = req.body;
    var result = await fileSystemManager.upsertFile(
      filename,
      content,
      true
    );
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};

exports.deleteOneRequest = async (req, res) => {
  try {
    const { filename } = req.params;
    var result = await fileSystemManager.deleteFile(filename);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
