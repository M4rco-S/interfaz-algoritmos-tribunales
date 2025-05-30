/** @fileoverview Manejo de carga de archivo CSV y almacenamiento local al iniciar la aplicación. */

/**
 * Indica si la navegación es interna para evitar limpiar el localStorage.
 * @type {boolean}
 */
let isInternalNavigation = false;

/**
 * Limpia el localStorage al cerrar o recargar la página, excepto si es navegación interna.
 */
window.addEventListener('beforeunload', () => {
    if (!isInternalNavigation) {
        localStorage.clear();
    }
});

/**
 * Se ejecuta al cargar completamente el DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    /** @type {HTMLButtonElement} */
    const uploadBtn = document.getElementById('uploadBtn');

    /** @type {HTMLInputElement} */
    const fileInput = document.getElementById('csvFile');

    /** @type {HTMLElement} */
    const fileStatus = document.getElementById('file-status');

    /** @type {File|null} */
    let selectedFile = null;

    /**
     * Simula clic en el input de archivo al hacer clic en el botón.
     */
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    /**
     * Maneja el evento de selección de archivo.
     */
    fileInput.addEventListener('change', function () {
        if (this.files && this.files.length > 0) {
            selectedFile = this.files[0];
            const fileName = selectedFile.name;
            fileStatus.textContent = fileName;

            localStorage.setItem('csvFileName', fileName);

            // Leer contenido del archivo y almacenarlo
            const reader = new FileReader();

            /**
             * Evento al cargar el contenido del archivo.
             * @param {ProgressEvent<FileReader>} event
             */
            reader.onload = function (event) {
                const content = /** @type {string} */ (event.target.result);
                localStorage.setItem('csvContent', content);
            };

            reader.readAsText(selectedFile);
        }
    });

    /**
     * Envía el archivo seleccionado y obtiene encabezados si es exitoso.
     */
    sendBtn.addEventListener('click', async () => {
        isInternalNavigation = true;

        if (!selectedFile) {
            alert("Primero selecciona un archivo.");
            return;
        }

        /** @type {boolean} */
        const success = await sendFile(selectedFile);
        if (!success) return;

        const fileName = localStorage.getItem('csvFileName');
        getHeader(fileName);
    });
});
