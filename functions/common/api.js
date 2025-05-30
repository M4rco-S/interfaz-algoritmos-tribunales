/** @constant {string} url - URL base del backend. */
const url = "http://localhost:8000/api";

/**
 * Envía un archivo CSV al servidor mediante POST.
 * 
 * @async
 * @function sendFile
 * @param {File} selectedFile - Archivo CSV seleccionado por el usuario.
 * @returns {Promise<boolean>} Retorna `true` si la carga fue exitosa, de lo contrario `false`.
 */
async function sendFile(selectedFile) {
    const formData = new FormData();
    formData.append('bd_name', selectedFile);

    try {
        const response = await fetch(url + '/upload-csv', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Respuesta con error:", data);
            alert("Error: " + (data.message || "Error desconocido al subir el archivo"));
            return false;
        }

        return true;

    } catch (error) {
        console.error("Error de red:", error);
        alert("Error de red o del servidor: " + error.message);
        return false;
    }
}

/**
 * Obtiene los encabezados del archivo cargado desde el servidor y los guarda en localStorage.
 * Redirige al usuario a la página `select-algorithm.html` al finalizar.
 *
 * @async
 * @function getHeader
 * @param {string} fileName - Nombre del archivo CSV previamente cargado.
 * @returns {Promise<void>}
 */
async function getHeader(fileName) {
    try {
        const response = await fetch(`${url}/get-features?fileName=${encodeURIComponent(fileName)}`);
        const rawText = await response.text();
        const data = JSON.parse(rawText);

        localStorage.setItem('encabezadosCSV', JSON.stringify(data));
        
        window.location.href = "select-algorithm.html";
    } catch (error) {
        console.error("Error al obtener o procesar los encabezados:", error);
    }
}

/**
 * Inicia el análisis enviando los datos seleccionados por el usuario al servidor.
 *
 * @async
 * @function startAnalysis
 * @returns {Promise<Object|null>} Objeto con los resultados del análisis si fue exitoso, o `null` en caso de error.
 */
async function startAnalysis() {
    const algorithm = localStorage.getItem('algorithmSelectedKey');
    const background = JSON.parse(localStorage.getItem('backgroundSelectedKey') || '[]');
    const consequent = localStorage.getItem('conseqSelected');
    const dbName = localStorage.getItem('csvFileName');

    const payload = {
        file_type: algorithm,
        antecedentes: background,
        consecuente: consequent,
        BD_NAME: dbName
    };

    try {
        const response = await fetch(url + '/algorithm-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error en la conexión o procesamiento:", error);
        return null;
    }
}
