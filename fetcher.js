const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

// Retrieve command line arguments
const [, , url, filePath] = process.argv;

// Perform the download
axios
  .get(url, { responseType: 'arraybuffer' })
  .then((response) => {
    const contentLength = response.headers['content-length'];

    return writeFileAsync(filePath, response.data)
      .then(() => {
        console.log(`Downloaded and saved ${contentLength} bytes to ${filePath}`);
      })
      .catch((error) => {
        console.error('An error occurred while saving the file:', error.message);
      });
  })
  .catch((error) => {
    console.error('An error occurred during the download:', error.message);
  });