export function fetchData(method, url, select, params) {
    return new Promise(resolve => {
        const request = new XMLHttpRequest();
        const divTableQuery = document.getElementById("divTableQuery");

        request.open(method, url, true);
        // Falls es sich bei dem request nicht um einen get-request handelt, muss im requestheader der contetn-type
        // übergeben werden
        method !== "get" ? request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded") : null;

        request.onload = () => {
            // Erfolgreich => response in div anzeigen
            if (request.status === 200) {
                select.innerHTML = request.responseText;

                // div, der response anzeigt, sichtbar machen
                if (select === divTableQuery) {
                    select.style.display = "block";
                }

            }
            // 400 => error message vom Server anzeigen
            else if (request.status === 400) {

                if (select === divTableQuery) {
                    select.innerHTML = request.responseText;
                    // div, der response anzeigt, sichtbar machen
                    select.style.display = "block";
                }
            }

            // Da Promise zurückgegeben wird und Callback beendet
            resolve();
        }

        // Falls es sich bei dem request nicht um get handelt, müssen parameter in send() mit übergeben werden. Bei get ist
        // dies bereits bei der url erfolgt
        method === "get" ? request.send() : request.send(params);
    });
}