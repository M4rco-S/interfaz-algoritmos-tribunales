document.addEventListener('DOMContentLoaded', () => {
    const fileName = localStorage.getItem('csvFileName');
    const csvContent = localStorage.getItem('csvContent');
    const algorithm = localStorage.getItem('algorithmSelectedName');
    const algoType = localStorage.getItem('algorithmType');
    const background = JSON.parse(localStorage.getItem('backgroundSelectedName') || '[]');

    const fileNameElement = document.getElementById('loaded-file-name');

    if (fileNameElement) {
        fileNameElement.textContent = fileName || "No hay archivo cargado";
    }


    if(algorithm){
        const textoAlgo = document.getElementById('loaded-algo-name');
        if (textoAlgo) textoAlgo.textContent = algorithm;

        const textAlgoType = document.getElementById('loaded-algo-type');
        if (textAlgoType) textAlgoType.textContent = algoType;
    }

    if(background){
        const container = document.getElementById("backgroundList");
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


});

function cleanFile() {
    localStorage.removeItem('csvFileName');
    localStorage.removeItem('csvContent');
}