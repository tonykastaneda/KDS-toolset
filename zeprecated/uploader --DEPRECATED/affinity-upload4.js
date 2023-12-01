const execSync = require('child_process').execSync;
execSync('npm install cli-progress chalk@4 node-fetch@2', { stdio: 'inherit' });

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
            let outputData = []; // Array to store all data objects

            (async () => {
                progressBar.start(files.length, 0); // Start the progress bar
                for (const file of files) {
                    const filePath = path.join(dirPath, file);
                    if (path.extname(file).toLowerCase() === ".png" || path.extname(file).toLowerCase() === ".jpg") {
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

                        outputData.push(data); // Add data object to outputData array

                        // Submit the data
                        try {
                            const response = await submit(data);
                            console.log('\n', chalk.green('✓ Submitted')); // New line before success message
                            progressBar.increment();
                        } catch (error) {
                            console.error('\n', chalk.red('✗ Error'), error); // New line before error message
                            fs.writeFileSync('output.txt', JSON.stringify(outputData, null, 2)); // Write outputData to a text file on error
                            process.exit(1); // Exit the process with an error code
                        }

                        productCategoryId++;
                    }
                }

                progressBar.stop(); // Stop the progress bar
                fs.writeFileSync('output.txt', JSON.stringify(outputData, null, 2)); // Write outputData to a text file
                readline.close(); // Close the readline interface
            })();
        });
    });
});