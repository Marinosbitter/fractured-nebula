var fs = require('fs');
const path = require('path');
const { Jomini } = require("jomini");
var jominiParser, stellarisVersion;

function setupFolder(folderName) {
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
            // console.info("Generated folder name: " + folderName + " in " + path);
        }
    } catch (err) {
        // console.error(err)
    }
}
function stellarisCrawl(dirname, directory) {
    fs.readdir(dirname + directory, function (err, files) {
        if (err) throw err;

        // Filter txt files and for each file
        files.forEach(function (filename) {
            fs.stat(dirname + directory + "/" + filename, (err, item) => {
                if (err) throw err;
                // In case of directory
                if (item.isDirectory()) {
                    setupFolder("data/" + stellarisVersion + "/" + directory + "/" + filename);
                    stellarisCrawl(dirname, directory + "/" + filename);
                }
                // In case of file
                if (item.isFile()) {
                    if (path.extname(filename) === ".txt" || path.extname(filename) === ".TXT") {
                        fs.readFile(dirname + directory + "/" + filename, 'utf8', function (err, data) {
                            if (err) throw err;
                            // console.log("Reading: " + filename);
                            try {
                                json = jominiParser.parseText(data, { encoding: "utf8" }, (q) => q.json());
                                savename = filename.replace(path.extname(filename), ".json");
                                fs.writeFile("data/" + stellarisVersion + "/" + directory + "/" + savename, json, err => {
                                    if (err) throw err;
                                })
                            } catch (error) {
                                // console.error(error);
                            }
                        });
                    }
                }
            });
        });
    });

}
function exportFracturedNebulaTech(gameVersions) {
    gameVersions.forEach((gameVersion) => {
        // Tech Data
        const techFile = `tech_${gameVersion}.json`;
        var techData = getCombinedJSON(`./data/${gameVersion}/common/technology`);
        techData = cleanupTechJSON(techData);

        fs.writeFile(`../fractured-nebula-tech/src/data/${techFile}`, JSON.stringify(techData), (err) => {
            if (err)
                console.log(err);
            else {
                console.info("Tech is done");
            }
        });
    });
}
function getCombinedJSON(dir) {
    var combinedJSON = {};
    var files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        if (file.isFile()) {
            const data = fs.readFileSync(`${dir}/${file.name}`, 'utf8');
            const newJSON = JSON.parse(data);
            combinedJSON = { ...combinedJSON, ...newJSON };
        }
    }
    return combinedJSON;
}

function exportToolData() {
    var gameVersions = [];
    fs.readdir("./data",
        { withFileTypes: true },
        (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    if (dirent => dirent.isDirectory()) {
                        gameVersions.push(file.name);

                        // Export data for fractured-nebubla-tech
                        exportFracturedNebulaTech(gameVersions);
                    }
                })
            }
        });
}
function CleanupTechJSON(techData){
    var newTechData = [];
    var techWeights = [];

    // Seperate techData and weights
    // Save techData in array for easy WP import

    return newTechData;
}

async function asyncCall() {
    // Steps
    // Init Jomini
    console.log("Initializing Jomini parser");
    jominiParser = await Jomini.initialize();

    // Get Stellaris directory
    var stellarisDir = "C:/Program Files (x86)/Steam/steamapps/common/Stellaris/";

    // Get Stellaris version
    fs.readFile(stellarisDir + "launcher-settings.json", 'utf-8', function (err, content) {
        if (err) throw err;
        const launcherData = JSON.parse(content);
        stellarisVersion = launcherData.rawVersion.replace(/\./g, '-');
        console.log("Found game version: " + stellarisVersion);

        // Make a folder for current Stellaris version
        setupFolder("data/" + stellarisVersion);

        // Start crawling
        stellarisCrawl(stellarisDir, "");

        // Export data
        exportToolData();
    });
}
asyncCall();