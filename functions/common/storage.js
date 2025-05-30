/**
 * Evento que se dispara cuando el DOM ha sido completamente cargado.
 * Recupera datos desde `localStorage` y los muestra dinámicamente en la página:
 * - Nombre del archivo cargado
 * - Algoritmo seleccionado y su tipo
 * - Lista de antecedentes seleccionados
 */
document.addEventListener('DOMContentLoaded', () => {
    /** @type {string|null} */
    const fileName = localStorage.getItem('csvFileName');

    /** @type {string|null} */
    const csvContent = localStorage.getItem('csvContent');

    /** @type {string|null} */
    const algorithm = localStorage.getItem('algorithmSelectedName');

    /** @type {string|null} */
    const algoType = localStorage.getItem('algorithmType');

    /** @type {string[]} */
    const background = JSON.parse(localStorage.getItem('backgroundSelectedName') || '[]');

    /** @type {HTMLElement|null} */
    const fileNameElement = document.getElementById('loaded-file-name');

    if (fileNameElement) {
        fileNameElement.textContent = fileName || "No hay archivo cargado";
    }

    if (algorithm) {
        /** @type {HTMLElement|null} */
        const textoAlgo = document.getElementById('loaded-algo-name');
        if (textoAlgo) textoAlgo.textContent = algorithm;

        /** @type {HTMLElement|null} */
        const textAlgoType = document.getElementById('loaded-algo-type');
        if (textAlgoType) textAlgoType.textContent = algoType;
    }

    if (background) {
        /** @type {HTMLElement|null} */
        const container = document.getElementById("backgroundList");

        if (container) {
            container.innerHTML = "";

            if (background.length > 0) {
                const ul = document.createElement("ul");
                background.forEach(texto => {
                    const li = document.createElement("li");
                    li.textContent = texto;
                    ul.appendChild(li);
                });
                container.appendChild(ul);
            } else {
                container.innerHTML = "<p>No se seleccionaron antecedentes.</p>";
            }
        }
    }
});

/**
 * Limpia del `localStorage` los datos relacionados con el archivo cargado.
 * 
 * @function cleanFile
 */
function cleanFile() {
    localStorage.removeItem('csvFileName');
    localStorage.removeItem('csvContent');
}
