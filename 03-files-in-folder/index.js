const fs = require("fs");
const path = require("path");

// Function to get current filenames
// in directory
fs.readdir(path.join(__dirname, "secret-folder"), (err, files) => {
  if (err) console.log(err);
  else {
    console.log("\nCurrent files in secret-folder:");
    files.forEach((file) => {
      if (fs.statSync("03-files-in-folder/secret-folder/" + file).size !== 0) {
        console.log(
            " filename: " + file.slice(0, file.indexOf(".")) + "\t\t\t" +
            " extention: " + path.extname(file).slice(1) + "\t\t\t" +
            " size: " + fs.statSync("03-files-in-folder/secret-folder/" + file).size + " bite"
        );
      }
      //console.log('extention: ' + path.extname(file))
    });
  }
});
