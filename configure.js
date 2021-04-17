const fs = require('fs');
fs.readFile("./build/asset-manifest.json", "utf8", function(error,data){
    data = JSON.parse(data);

    console.log(data);
});
