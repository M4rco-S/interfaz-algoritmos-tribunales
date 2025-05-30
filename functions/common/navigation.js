/**
 * Evento que se ejecuta cuando el DOM ha sido completamente cargado.
 * Verifica si el nombre del archivo CSV está almacenado y redirige al índice si no lo está,
 * siempre que no se esté ya en la página index.
 */
document.addEventListener('DOMContentLoaded', function () {
    /** @type {string|null} */
    const csvFileName = localStorage.getItem('csvFileName');

    /** @type {boolean} */
    const isIndexPage =
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname === '/index.html';

    if (!csvFileName && !isIndexPage) {
        window.location.href = 'index.html';
    }
});

/**
 * Limpia todo el `localStorage` y redirige al usuario a la página de inicio (index).
 * 
 * @function goToIndex
 */
function goToIndex() {
    localStorage.clear();
    window.location.href = "index.html";
}

/**
 * Elimina información relacionada con el algoritmo seleccionado del `localStorage` 
 * y redirige al usuario a la página de selección de algoritmo.
 * 
 * @function goToSelectAlgo
 */
function goToSelectAlgo() {
    localStorage.removeItem("algorithmSelected");
    localStorage.removeItem("algorithmType");
    localStorage.removeItem("backgroundSelected");
    window.location.href = "select-algorithm.html";
}

/**
 * Elimina la selección de antecedentes y consecuente del `localStorage` 
 * y redirige al usuario a la página de selección de antecedentes.
 * 
 * @function goToSelectBack
 */
function goToSelectBack() {
    localStorage.removeItem("backgroundSelected");
    localStorage.removeItem("conseqSelected");
    window.location.href = "select-background.html";
    
}
