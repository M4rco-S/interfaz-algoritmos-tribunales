let isInternalNavigation = false;

window.addEventListener('beforeunload', () => {
    if (!isInternalNavigation) {
    localStorage.clear();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('csvFile');
    const fileStatus = document.getElementById('file-status');


    let selectedFile = null;

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        if (this.files && this.files.length > 0) {
            selectedFile = this.files[0];
            const fileName = selectedFile.name;
            fileStatus.textContent = fileName;
    

            localStorage.setItem('csvFileName', fileName);
            // Opcional: leer contenido
            const reader = new FileReader();
            reader.onload = function (event) {
                const content = event.target.result;
                localStorage.setItem('csvContent', content);
            };
            reader.readAsText(selectedFile);
        }
    });

    sendBtn.addEventListener('click', async () =>{
        isInternalNavigation = true;
        if (!selectedFile) {
            alert("Primero selecciona un archivo.");
            return;
        }
        const success = await sendFile(selectedFile);
        if (!success) return;
        
        const fileName = localStorage.getItem('csvFileName');
        getHeader(fileName);


    })
});
