/**
 * Carga los encabezados almacenados en `localStorage` bajo la clave 'encabezadosCSV',
 * genera una lista de checkboxes en el contenedor con id 'checkboxContainer'.
 * Los encabezados deben estar en formato JSON como arreglo de objetos con propiedades `name` y `code`.
 *
 * @function chargeBackground
 * @returns {void}
 */
function chargeBackground() {
    const headersJSON = localStorage.getItem('encabezadosCSV');

    if (headersJSON) {
        try {
            const uniqueStringArray = JSON.parse(headersJSON);
            const headers = JSON.parse(uniqueStringArray[0]);
            const container = document.getElementById('checkboxContainer');

            headers.forEach(item => {
                const label = document.createElement('label');
                label.classList.add('checkbox-item');

                const span = document.createElement('span');
                span.textContent = item.name;

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.value = item.code;

                label.appendChild(span);
                label.appendChild(input);

                container.appendChild(label);
            });
        } catch (e) {
            console.error('Error al parsear encabezadosCSV:', e);
        }
    } else {
        console.warn('No se encontró "encabezadosCSV" en localStorage');
    }
}

/**
 * Guarda la selección del usuario de los checkboxes en `localStorage` bajo las claves:
 * - `backgroundSelectedName`: nombres visibles (texto de los checkboxes)
 * - `backgroundSelectedKey`: valores técnicos (atributo value)
 *
 * @function saveSelection
 * @returns {void}
 */
function saveSelection() {
    const selectedName = [];
    const selectedKey = [];
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const label = checkbox.closest('label').querySelector('span').textContent;
            const value = checkbox.value;
            selectedName.push(label);
            selectedKey.push(value);
        }
    });

    localStorage.setItem('backgroundSelectedName', JSON.stringify(selectedName));
    localStorage.setItem('backgroundSelectedKey', JSON.stringify(selectedKey));
}

/**
 * Evento que se ejecuta cuando el DOM está completamente cargado.
 * Inicializa la carga de antecedentes (checkboxes) y configura el botón
 * "Siguiente" o "Analizar" dependiendo del tipo de algoritmo seleccionado.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', function () {
    chargeBackground();
    const type = localStorage.getItem('algorithmType');
    const nextButton = document.getElementById('toNext');

    if (type) {
        if (type === "Supervisado") {
            nextButton.textContent = "Siguiente";
            nextButton.onclick = function () {
                saveSelection();
                window.location.href = "select-consequent.html";
            };
        } else {
            nextButton.textContent = "Analizar";
            nextButton.onclick = function () {
                saveSelection();
                startAnalysis().then(data => {
                    if (data !== null) {
                        localStorage.setItem('serverResponse', JSON.stringify(data));
                        window.location.href = 'summary.html';
                    }
                });
            };
        }
    }
});
