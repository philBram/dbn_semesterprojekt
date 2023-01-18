import { fetchData } from "./fetch.js";

const arrayQueryOptions = [
    "SELECT DISTINCT <span>schueler.schueler_nachname, schueler.schueler_vorname, klasse.klasse_name</span> " +
    "FROM <span>schueler</span> NATURAL JOIN <span>klasse</span> NATURAL JOIN <span>unterrichtungsort</span> " +
    "NATURAL JOIN <span>raum</span> WHERE <span>raum.raum_digitalisiert = 1</span> " +
    "ORDER BY <span>schueler.schueler_nachname</span> ASC, <span>schueler.schueler_vorname</span> ASC;",

    "SELECT <span>klasse.klasse_name</span>, COUNT(<span>*</span>) AS <span>bestanden</span> FROM <span>schueler</span> " +
    "NATURAL JOIN <span>klasse</span> WHERE <span>schueler.schueler_abiturnote < 5</span> GROUP BY <span>klasse.klasse_name</span> " +
    "ORDER BY <span>klasse.klasse_name</span> ASC;",

    "SELECT <span>klasse.klasse_name</span>, AVG(<span>schueler.schueler_abiturnote</span>) AS <span>Abiturnotendurchschnitt</span> " +
    "FROM <span>schueler</span> INNER JOIN <span>klasse</span> ON <span>schueler.klasse_id = klasse.klasse_id</span> " +
    "WHERE <span>schueler.schueler_abiturnote</span> IS NOT NULL " +
    "GROUP BY <span>klasse.klasse_name</span> ORDER BY <span>klasse.klasse_name</span> ASC;",

    "SELECT <span>unterrichtsfach.unterrichtsfach_abkuerzung</span>, COUNT(<span>*</span>) AS <span>lehrer_anzahl</span> FROM " +
    "<span>lehrer</span> NATURAL JOIN <span>unterrichtsfach</span> NATURAL JOIN <span>lehrung</span> GROUP BY " +
    "<span>unterrichtsfach.unterrichtsfach_abkuerzung</span> ORDER BY <span>unterrichtsfach.unterrichtsfach_abkuerzung</span> ASC;",

    "SELECT <span>klasse.klasse_name</span>, COUNT(<span>*</span>) AS <span>schueler_anzahl</span> FROM <span>klasse</span> " +
    "INNER JOIN <span>schueler</span> ON <span>klasse.klasse_id = schueler.klasse_id</span> GROUP BY <span>klasse.klasse_name </span>" +
    "ORDER BY <span>klasse.klasse_name</span> ASC;",

    "SELECT DISTINCT <span>l.lehrer_nachname, l.lehrer_vorname, k.klasse_name</span> FROM <span>lehrer l</span> NATURAL JOIN " +
    "<span>unterrichtung</span> NATURAL JOIN <span>klasse k</span> ORDER BY <span>l.lehrer_nachname</span> ASC, <span>l.lehrer_vorname</span> ASC;",

    "SELECT <span>k.klasse_name</span>, AVG( YEAR( FROM_DAYS( DATEDIFF( CURRENT_DATE(), <span>s.schueler_geburtsdatum</span> ) ) ) ) AS " +
    "<span>durchschnittsalter</span> FROM <span>schueler s</span> INNER JOIN <span>klasse k</span> ON <span>s.klasse_id = k.klasse_id</span> " +
    "GROUP BY <span>k.klasse_name</span> ORDER BY <span>k.klasse_name</span> ASC;",

    "SELECT <span>l.lehrer_nachname, l.lehrer_vorname</span>, YEAR( FROM_DAYS( DATEDIFF( CURRENT_DATE(), <span>l.lehrer_geburtsdatum</span> " +
    ") ) ) AS <span>lehrer_alter</span> FROM <span>lehrer l</span> WHERE <span>l.lehrer_parkplatznummer</span> IS NOT NULL AND " +
    "<span>l.lehrer_parkplatz_behindertengerecht = 1</span> ORDER BY <span>l.lehrer_nachname, l.lehrer_vorname</span> ASC",

    "SELECT <span>s.schueler_ort</span>, COUNT(<span>*</span>) AS <span>anzahl</span> FROM <span>schueler s</span> GROUP BY <span>s.schueler_ort</span> " +
    "ORDER BY <span>s.schueler_ort</span> ASC;",

    "SELECT <span>l.lehrer_ort</span>, COUNT(<span>*</span>) AS <span>anzahl</span> FROM <span>lehrer l</span> GROUP BY <span>l.lehrer_ort</span> " +
    "ORDER BY <span>l.lehrer_ort</span> ASC"
];

const selectForm = document.getElementById("selectForm");
const selectQuery = document.getElementById("selectQuery");
const responseTextReceiver = document.getElementById("divTableQuery");
const queryHelp = document.getElementById("queryHelp");

// Div zeigt Query aus arrayQueryOption an abhängig vom ausgewähltem Option
queryHelp.innerHTML = `<h2>${arrayQueryOptions[selectQuery.selectedIndex]}</h2>`;

selectQuery.addEventListener("change", e => {
    // Immer aktuell ausgewählten Option und somit in arrayQueryOptions hinterlegten Query anzeigen
    queryHelp.innerHTML = `<h2>${arrayQueryOptions[selectQuery.selectedIndex]}</h2>`;
});

selectForm.addEventListener("submit", e => {
    // wird benötigt, da AJAX verwendet wird (kein action in form / soll auf dieser Seite bleiben)
    e.preventDefault();

    const matchTag = /<(?:.|\s)*?>/g;
    // Alle Tags aus dem String, des ausgewählten Option => arrayQueryOptions hinterlegten Query, entfernen
    let queryRequest = arrayQueryOptions[selectQuery.selectedIndex].replaceAll(matchTag, "");
    const url = `/db/query?queryRequest=${queryRequest}`;

    fetchData("get", url, responseTextReceiver, null).then();
})