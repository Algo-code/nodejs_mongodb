const fs = require('fs');
const path = require('path');

const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
    constructor(title){
        this.title = title;
    }

    save(){
        fs.readFile(myPath, (err, fileContent) => {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(myPath, JSON.stringify(products),(err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback){
        fs.readFile(myPath, (err, fileContent) => {
            if(err){
                return callback([]);
            }
                callback(JSON.parse(fileContent));
            
        });
    }
}