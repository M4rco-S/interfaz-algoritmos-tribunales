/**
 * Guarda en localStorage el valor de la consecuencia seleccionada.
 *
 * @function saveConseq
 * @param {HTMLInputElement} selected - Elemento input seleccionado con el valor de la consecuencia.
 * @returns {void}
 */
function saveConseq(selected) {
    const valor = selected.value;
    localStorage.setItem('conseqSelected', valor);
}

/**
 * Ejecuta el análisis una vez que el usuario selecciona una consecuencia.
 * Si se selecciona, guarda la información y redirige a la página de resumen.
 *
 * @function toAnalysis
 * @returns {void}
 */
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

/**
 * Evento que se dispara cuando se carga completamente la ventana.
 * Genera las opciones de radio para la selección de consecuencia,
 * filtrando los antecedentes ya seleccionados.
 *
 * @event window.onload
 * @returns {void}
 */
window.onload = function () {
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
