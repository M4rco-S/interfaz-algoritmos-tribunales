/**
 * Selecciona el algoritmo de Clasificación (supervisado),
 * guarda la información en `localStorage` y redirige al usuario a la página de antecedentes.
 *
 * @function selectClasificacion
 * @returns {void}
 */
function selectClasificacion() {
    localStorage.setItem('algorithmSelectedName', "Clasificación");
    localStorage.setItem('algorithmSelectedKey', "clasificacion");
    localStorage.setItem('algorithmType', "Supervisado");
    window.location.href = 'select-background.html';
}

/**
 * Selecciona el algoritmo de Asociación (no supervisado),
 * guarda la información en `localStorage` y redirige al usuario a la página de antecedentes.
 *
 * @function selectAsociacion
 * @returns {void}
 */
function selectAsociacion() {
    localStorage.setItem('algorithmSelectedName', "Asociacion");
    localStorage.setItem('algorithmSelectedKey', "reglas");
    localStorage.setItem('algorithmType', "No supervisado");
    window.location.href = 'select-background.html';
}

/**
 * Selecciona el algoritmo de Agrupación (no supervisado),
 * guarda la información en `localStorage` y redirige al usuario a la página de antecedentes.
 *
 * @function selectAgrupacion
 * @returns {void}
 */
function selectAgrupacion() {
    localStorage.setItem('algorithmSelectedName', "Agrupación");
    localStorage.setItem('algorithmSelectedKey', "agrupacion");
    localStorage.setItem('algorithmType', "No supervisado");
    window.location.href = 'select-background.html';
}
