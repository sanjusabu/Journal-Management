const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (id,file) => {
  const parser = new DataUriParser();
  // console.log(file); 
  // const extName = path.extname(id).toString();
  // console.log("extname",extName);
  return parser.format(id.toString(), file.buffer);
};

module.exports =  getDataUri;