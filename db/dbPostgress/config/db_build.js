const { readFileSync } = require('fs');
const { join } = require('path');
const { query } = require('./db_connection')
const dbBuild = () => {
    new Promise((resolve, reject) => {
        console.log('building database')
        readFileSync(join(__dirname, 'db_build.sql'), (errInFindingFile, sql) => {
            console.log('getting file')
            if (errInFindingFile) reject(errInFindFile);
            query(sql)
                .then(() => {
                    console.log('Database was built successfully');
                    resolve(true)
                }).catch((errInQuery) => {
                    reject(errInQuery)
                });
        });

    })
}
dbBuild();
module.exports = dbBuild;
