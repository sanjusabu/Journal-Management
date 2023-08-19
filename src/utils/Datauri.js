const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (id,file) => {
  const parser = new DataUriParser();
  return parser.format(id.toString(), file.buffer);
};

module.exports =  getDataUri;