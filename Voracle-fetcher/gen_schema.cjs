const { default: genTypeSchema } = require('fast-typescript-to-jsonschema');
const path = require('path');
const fs = require('fs');

// target file
const file = path.resolve(__dirname, './src/swagger.type.ts');

const schemaFile = path.resolve(__dirname, './src/swagger_schemas.json');

// generate data
genTypeSchema.genJsonDataFormFile(file);

// get all jsonschema data of current file
const json = genTypeSchema.genJsonData();

// get jsonschema of specific type
 //const jsonSchema = genTypeSchema.getJsonSchema(file, 'AccountJSON');

// result
let result = json[Object.keys(json)[0]];

let objNum = Object.keys(result).length;
for(let i=0; i<objNum; i++) {
   delete result[Object.keys(result)[i]].additionalProperties;
}

let str = JSON.stringify(result).replaceAll('#', '#/components/schemas/');
console.log(str);

fs.writeFile(schemaFile, str, () => {
    console.log("gen schema done: ", schemaFile);
});


