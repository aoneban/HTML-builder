const fs = require("fs");
const path = require("path");

// Function to get current filenames
// in directory
fs.readdir(path.join(__dirname, "secret-folder"), (err, files) => {
  if (err) console.log(err);
  else {
    console.log("\nCurrent files in secret-folder:");
    files.forEach((file) => {
      console.log(
        file +
          "\t\t" +
          " extention: " +
          path.extname(file) +
          "\t\t" +
          fs.statSync("03-files-in-folder/secret-folder/" + file).size +
          " bite"
      );
      //console.log('extention: ' + path.extname(file))
    });
  }
});
