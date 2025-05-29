function saveConseq(selected){
    const valor = selected.value;
    localStorage.setItem('conseqSelected', valor);
}

function toAnalysis() {
    const selected = document.querySelector('input[name="conseq"]:checked');

    if (selected) {
        saveConseq(selected);
        
        startAnalysis().then(data => {
            if (data !== null) {
                localStorage.setItem('serverResponse', JSON.stringify(data));

                window.location.href = 'summary.html';
            }
        });

    } else {
        console.warn("No se ha seleccionado ninguna consecuencia.");
    }
}

window.onload = function() {
    const backgroundSelected = JSON.parse(localStorage.getItem("backgroundSelectedKey") || "[]");

    const rawHeaders = localStorage.getItem("encabezadosCSV");
    let headers = [];

    try {
        const parsedArray = JSON.parse(rawHeaders);
        headers = JSON.parse(parsedArray[0]);
    } catch (error) {
        console.error("Error al parsear encabezadosCSV:", error);
    }

    const filteredOptions = headers.filter(op => !backgroundSelected.includes(op.code));

    const radiosContainer = document.getElementById("radioContainer");

    if (filteredOptions.length === 0) {
        radiosContainer.innerHTML = "<p>No hay opciones disponibles para consecuencia.</p>";
    } else {
        filteredOptions.forEach((opcion) => {
            const label = document.createElement("label");
            label.className = "radio-item";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "conseq";
            input.value = opcion.code;

            const span = document.createElement("span");
            span.textContent = opcion.name;

            label.appendChild(span);
            label.appendChild(input);
            radiosContainer.appendChild(label);
        });
    }
}


