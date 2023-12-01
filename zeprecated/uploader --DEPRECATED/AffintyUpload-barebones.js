const execSync = require('child_process').execSync;

// Install the packages
execSync('npm install cli-progress chalk@4 node-fetch@2', { stdio: 'inherit' });



const fs = require('fs');
const path = require('path');
const readline = require('readline');
const fetch = require('node-fetch');
const cliProgress = require('cli-progress');
const chalk = require('chalk');

const ORGANIZATION_ID = 0;
const PRODUCT_CATEGORY_ID = 0;
const API_KEY = "";
const ENDPOINT = "https://api.affinitygateway.com/designs";

// Function to encode file data to base64 encoded string
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}

async function submit(data) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'Organization-ID': ORGANIZATION_ID.toString()
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const responseData = await response.json();
  return responseData;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// create new progress bar
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

rl.question('Enter project name: ', (projectName) => {
  rl.question('Enter primary client id: ', (primaryClientId) => {
    rl.question('Enter is expedited (true or false): ', (isExpedited) => {
      rl.question('Enter description: ', (description) => {
      
        // get the list of image files in the directory
        const dirPath = __dirname; // current directory
        fs.readdir(dirPath, async (err, files) => {
            if (err) {
                console.error("Could not list the directory.", err);
                process.exit(1);
            } 

            let productCategoryId = 1;

            // start the progress bar with the total number of image files
            progressBar.start(files.length, 0);

            for (const file of files) {
                // get the full path of the file
                const filePath = path.join(dirPath, file);
                // check if the file is an image (you can add more types if needed)
                if (path.extname(file).toLowerCase() === ".png" || path.extname(file).toLowerCase() === ".jpg") {
                    // encode the image to base64
                    const base64str = base64_encode(filePath);

                    // Upload Requesst String https://apidocs.affinitygateway.com/#operation/addDesign under Upload a new Design
                    const data = {
                      title: projectName,
                      product_category_id: productCategoryId,
                      image: base64str,
                      image_filename: file,
                      description: description,
                      primary_client_id: parseInt(primaryClientId, 10),
                      is_expedited: isExpedited === 'true'
                    };
                    
                    
                    /*
                    // File output checker UNFLAG if you wish to see output strings    
                    const dataString = JSON.stringify(data, null, 2); // Convert the data to a nicely formatted JSON string
                    fs.appendFileSync('output.txt', dataString + '\n'); // Append the data string to the file
                    
                    */


                    console.log(`Reading -> ${file}`);  // Adds a reading output for user such that Reading -> design.png


                    try {
                      const response = await submit(data);
                      console.log(chalk.green('✓ Submitted'));
                      // increment the progress bar
                      progressBar.increment();
                    } catch (error) {
                      console.error(chalk.red('✗ Error'), error);
                    }

                    productCategoryId++;
                }
            }

            // stop the progress bar
            progressBar.stop();
            rl.close();
        });
      });
    });
  });
});