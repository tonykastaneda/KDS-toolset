const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fetch = require('node-fetch');
const cliProgress = require('cli-progress');
const chalk = require('chalk');

const ORGANIZATION_ID = 0;
const PRODUCT_CATEGORY_ID = 0;
const API_KEY = "";
const ENDPOINT = "https://api.affinitygateway.com/designs";

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

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const projectName = path.basename(process.cwd());
readline.question('Enter primary client id: ', (primaryClientId) => {
    readline.question('Enter is expedited (true or false): ', (isExpedited) => {
        readline.question('Enter description: ', (description) => {
            const dirPath = __dirname;
            const files = fs.readdirSync(dirPath);

            let productCategoryId = 1;
            let imageFiles = 0; // Counter for image files
            let imageData = [];

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                if (path.extname(file).toLowerCase() === ".png" || path.extname(file).toLowerCase() === ".jpg") {
                    imageFiles++; // Increment the counter if the file is an image
                    const base64str = base64_encode(filePath);
                    const data = {
                        title: projectName,
                        product_category_id: productCategoryId,
                        image: base64str,
                        image_filename: file,
                        description: description,
                        primary_client_id: parseInt(primaryClientId, 10),
                        is_expedited: isExpedited === 'true'
                    };
                    imageData.push(data);
                    console.log(`Reading -> ${file}`);
                    console.log(JSON.stringify(data, null, 2));
                    productCategoryId++;
                }
            }

            // Start the progress bar with the number of image files
            progressBar.start(imageFiles, 0);

            readline.question('Is this correct? (Y/N) ', (answer) => {
                if (answer.toLowerCase() === 'y') {
                    // If 'y', continue with the loop
                    console.log('Continuing...');
                    (async () => {
                        for (const data of imageData) {
                            // Submit the data
                            try {
                                const response = await submit(data);
                                progressBar.increment(); // Increment the progress bar
                                console.log('\n', chalk.green('✓ Submitted')); // New line before success message
                            } catch (error) {
                                progressBar.increment(); // Increment the progress bar
                                console.error('\n', chalk.red('✗ Error'), error); // New line before error message
                                process.exit(1); // Exit the process with an error code
                            }
                        }
                        progressBar.stop();
                        readline.close();  // Close the readline interface
                    })();
                } else {
                    console.log('Data not submitted.');
                    process.exit(); // Exit the process if the data is not correct
                }
            });
        });
    });
});