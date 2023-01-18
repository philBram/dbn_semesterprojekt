const express = require("express");
const path = require("path");
const mysql = require("mariadb");

// Datenbank Connection Daten
const myHost = "localhost";
const myUser = "root";
const myPassword = "";
const myDatabase = "SemProj_Schule";

const pool = mysql.createPool({
    host: myHost,
    user: myUser,
    password: myPassword,
    database: myDatabase
});

const PORT = 3000;
const staticFolder = path.join(__dirname, "public");
const app = express();

// Statischer Ordner (Sachen die sich in dem public Ordner befinden, werden ohne eine route zu brauchen, von express als
// response zurückgeschickt bei entsprechendem request) / (/ gibt index.html zurück)
app.use(express.static(staticFolder));

// Body Parser Middleware (wird für Post requests benötigt / support für URL-encoded bodies)
app.use(express.urlencoded( {extended: false} ));

async function execSQLAsync(sql) {
    let conn;
    let result = "";

    try {
        conn = await pool.getConnection();
        result = await conn.query(sql);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn) {
            conn.release();
        }
    }

    return result;
}


app.route("/db/select")
    .get(async (req, res) => {
        // URL-Parameter
        const from = req.query.from;
        const what = req.query.what;
        const specify = req.query.specify;
        const sql = `SELECT ${what} FROM ${from} ${specify}`;

        let error = false;
        let errorText = "";
        let result;

        try {
            result = await execSQLAsync(sql);
        }
        catch(err) {
            error = true;
            errorText = `<h1>${err.code}</h1>`;
        }

        if (error) {
            res.status(400).send(errorText);
        }
        else {
            const header = createTableHeader(result);
            const output = createTableResponse(result, header);

            res.status(200).send(output);
        }
    });

app.route("/db/show/tables")
    .get(async (req, res) => {
        const sql = "SHOW TABLES";

        let error = false;
        let result;

        try {
            result = await execSQLAsync(sql);
        }
        catch(err) {
            error = true;
        }

        if (error) {
            res.status(204).send();
        }
        else {
            const tableOptionNames = createTableOptions(result);

            res.status(200).send(tableOptionNames);
        }
    });

app.route("/db/show/attributes")
    .get(async (req, res) => {
        // URL-Parameter
        const from = req.query.from;
        const sql = `SELECT * FROM ${from}`;

        let error = false;
        let result;

        try {
            result = await execSQLAsync(sql);
        }
        catch(err) {
            error = true;
        }

        if (error) {
            res.status(204).send();
        }
        else {
            const output = createAttributeOptions(result);

            res.status(200).send(output);
        }
    });

app.route("/db/query")
    .get(async (req, res) => {
        const sql = req.query.queryRequest;

        let error = false;
        let result;

        try {
            result = await execSQLAsync(sql);
        }
        catch(err) {
            error = true;
        }

        if (error) {
            res.status(204).send();
        }
        else {
            const header = createTableHeader(result);
            const output = createTableResponse(result, header);

            res.status(200).send(output);
        }
    });

function createTableHeader(result) {
    let output =
        `<table>
            <tr>`;

    // Da nur die Spaltenüberschriften benötigt werden, soll nur das erste Object betrachtet werden, da es sonst zu
    // Dopplungen kommen könnte
    for (let prop in result[0]) {
        if (result[0].hasOwnProperty(prop)) {
            output += `<th>${prop}</th>`
        }
    }

    output += "</tr>";

    return output
}

function createTableResponse(result, header) {
    let output = header;

    // result = Array of Objects; Jedes Objekt ist eine Reihe der der Anfrage => Jede Reihe also tableRow und jedes Attribute des
    // Object tableData
    for (let obj of result) {
        output +=
            "<tr>";

        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                output +=
                    `<td>${obj[prop]}</td>`;
            }
        }

        output +=
            "</tr>";
    }

    return output;
}

function createAttributeOptions(result) {
    let output = "";

    // Da nur die Spaltenüberschriften benötigt werden, soll nur das erste Object betrachtet werden, da es sonst zu
    // Dopplungen kommen könnte
    for (let prop in result[0]) {
        if (result[0].hasOwnProperty(prop)) {
            output += `<option>${prop}</option>`
        }
    }

    return output;
}

function createTableOptions(result) {
    let output = "";

    // result ist ein Array of Objects => (for of) jedes ArrayElement => (for in) über key, value des Objects => somit
    // können alles Spaltenüberschriften beschaft werden
    for (let obj of result) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                output += `<option>${obj[prop]}</option>`
            }
        }
    }

    return output;
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));