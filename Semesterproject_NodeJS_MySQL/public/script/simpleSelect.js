import { fetchData } from "./fetch.js";

let selectArray = [];

eventListenerSetup();
fetchDataSetup().then();

function eventListenerSetup() {
    const selectFrom = document.getElementById("selectFrom");
    const selectHowMany = document.getElementById("selectHowMany");
    const selectForm = document.getElementById("selectForm");
    const selectWhat = document.getElementById("selectWhat");

    selectFrom.addEventListener("change", async e => {
        // Anfrage an Server nach den Attributen der Table, die von selectFrom gerade ausgewählt, ist
        const urlShowPropOfTable = `/db/show/attributes?from=${selectFrom.value}`;

        await fetchData("get", urlShowPropOfTable, selectWhat, null);
        showPropAmountSetup();
        showPropAmount();
    });

    // wenn sich die ausgewählte Anzahl von select id=selectHowMany verändert, sollen dynamisch neue select tag für zusätzliche
    // Attributauswahlmöglichkeiten erzeugt werden
    selectHowMany.addEventListener("change", e => {
        showPropAmount();
    });

    selectForm.addEventListener("submit", e => {
        // wird benötigt, da AJAX verwendet wird (kein action in form / soll auf dieser Seite bleiben)
        e.preventDefault();

        selectQuerySubmit();
    })
}

async function fetchDataSetup() {
    const selectWhat = document.getElementById("selectWhat");
    const selectFrom = document.getElementById("selectFrom");

    // fetchData gibt Promise zurück => die Attributes die angezeigt werden, sind von Tables abhängig => daher await
    const urlShowTables = "/db/show/tables";
    await fetchData("get", urlShowTables, selectFrom, null);

    const urlShowPropOfTable = `/db/show/attributes?from=${selectFrom.value}`;
    await fetchData("get", urlShowPropOfTable, selectWhat, null);

    showPropAmountSetup();
}

function showPropAmountSetup() {
    const selectHowMany = document.getElementById("selectHowMany");
    const selectWhat = document.getElementById("selectWhat");

    let selectHowManyAmount = "";

    // selectHowMany soll bestimmen, wieviele Attribute mit SELECT ermittelt werden sollen
    // (length - 1 da * ans Ende angefügt wird)
    for (let i = 0; i < selectWhat.length - 1; i++) {
        selectHowManyAmount += `<option>${i+1}</option>`;
    }

    selectHowManyAmount += "<option>*</option>";

    selectHowMany.innerHTML = selectHowManyAmount;
}

function showPropAmount() {
    const selectForm = document.getElementById("selectForm");
    const selectWhat = document.getElementById("selectWhat");
    const selectFrom = document.getElementById("selectFrom");

    let amount = document.getElementById("selectHowMany").value;

    // select tags müssen entfernt werden, da bei jeder Anzahländerung neue erstellt werden
    selectArray.forEach(select => {
        select.remove();
    });

    selectArray = [];

    // Wenn eine numerische Anzahl ausgewählt wurde, werden (Anzahl - 1) mal select tags mit dem html Inhalt von
    // select tag id=selectWhat erstellt (Anzahl - 1 da select tag id=selectWhat nicht aus der html Hierarchie entfernt
    // werden soll)
    if (amount !== "*") {
        selectWhat.style.display = "block";

        for (let i = 0; i < amount - 1; i++) {
            let tmpDiv = document.createElement("select");

            tmpDiv.innerHTML = selectWhat.innerHTML;

            selectArray.push(tmpDiv);
        }
    }
    else {
        // bei * sollen keine Attributsauswahlsmöglichkeiten angezeigt werden sollen
        selectWhat.style.display = "none";
    }

    selectArray.forEach(select => {
        // neu erstellten select tag in die html Hierarchie einfügen
        selectForm.insertBefore(select, selectFrom);
    });
}

function selectQuerySubmit() {
    // Hilfvariablen für den request
    const from = document.getElementById("selectFrom").value;
    const what = getSelectQueryString();
    const specify = document.getElementById("specifyQuery").value;
    const responseTextReceiver = document.getElementById("divTableQuery");

    const url = `/db/select?from=${from}&what=${what}&specify=${specify}`;

    fetchData("get", url, responseTextReceiver, null).then();
}

function getSelectQueryString() {
    const selectHowMany = document.getElementById("selectHowMany");

    let attributeString = document.getElementById("selectWhat").value;

    if (selectHowMany.value === "*") {
        return selectHowMany.value;
    }

    // Alle ausgewählten Attribute werden für den query-String mit einem ',' aneinandergereit
    selectArray.forEach(select => {
        attributeString += `, ${select.value}`;
    });

    return attributeString;
}