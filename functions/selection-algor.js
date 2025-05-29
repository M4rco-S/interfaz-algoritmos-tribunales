function selectClasificacion(){
    localStorage.setItem('algorithmSelectedName', "Clasificación");
    localStorage.setItem('algorithmSelectedKey', "clasificacion");
    localStorage.setItem('algorithmType', "Supervisado");
    window.location.href = 'select-background.html';
}

function selectAsociacion(){
    localStorage.setItem('algorithmSelectedName', "Asociacion");
    localStorage.setItem('algorithmSelectedKey', "reglas");
    localStorage.setItem('algorithmType', "No supervisado");
    window.location.href = 'select-background.html';
}

function selectAgrupacion(){
    localStorage.setItem('algorithmSelectedName', "Agrupación");
    localStorage.setItem('algorithmSelectedKey', "agrupacion");
    localStorage.setItem('algorithmType', "No supervisado");
    window.location.href = 'select-background.html';
}