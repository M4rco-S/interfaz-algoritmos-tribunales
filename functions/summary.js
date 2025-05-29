const implementedAlgorithms = [
  {
    code:'clasificacion',
    type:"sup",
    name:"Clasificación",
    desc:"Ayuda a categorizar a los pacientes en grupos diagnósticos basados en sus síntomas y comportamientos. Es similar al proceso de diagnóstico, donde se asignan etiquetas clínicas a los pacientes según criterios establecidos.",
    metric:{
      name:"Ganancia de información",
      desc:"La ganancia de información mide cuánto ayuda una característica a aclarar o predecir un resultado. Si una característica reduce mucho la incertidumbre, tiene alta ganancia; si ayuda poco, tiene baja ganancia. Es esencial para elegir las características más útiles al construir modelos predictivos."
    },
  },
  {
    code: 'reglas',
    type:"uns",
    name:"Asociación",
    desc:"Utilizado para identificar patrones o tendencias en el comportamiento o síntomas de los pacientes. Por ejemplo, podría revelar cómo ciertos trastornos están comúnmente asociados con tipos específicos de comportamientos o condiciones emocionales.",
    metric: {
      name: "Soporte",
      desc: "El soporte en las reglas de asociación indica qué tan frecuentemente aparece un conjunto de elementos juntos en una base de datos. Por ejemplo, si estás mirando cuántas veces se compran juntos pan y leche, y descubres que de 1000 compras, 150 incluyen ambos, el soporte sería del 15%."
    },
  },
  {
    code: 'agrupacion',
    type:"uns",
    name:"Agrupación",
    desc:"Sirve para descubrir agrupaciones naturales dentro de los datos del paciente sin categorías predeterminadas. Esto puede revelar nuevos insights sobre subgrupos de pacientes que comparten características similares, lo que podría no ser evidente a través de métodos de diagnóstico estándar.",
    metric: {
      name: "Costo",
      desc: "El costo en el algoritmo de agrupación mide cuán similares son los datos dentro de cada grupo. Un costo bajo indica que los datos en cada grupo son muy parecidos entre sí, mostrando que el algoritmo ha agrupado eficazmente los datos. Por lo tanto, un menor costo significa una mejor agrupación."
    },
  },
];

window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

function renderInfoAlgoritmo() {
  const selectedCode = localStorage.getItem('algorithmSelectedKey');
  const info = implementedAlgorithms.find(algo => algo.code === selectedCode);

  const baseInfo = document.getElementById('baseInfo');
  const metricInfo = document.getElementById('metricInfo');

  baseInfo.innerHTML = '';
  metricInfo.innerHTML = '';

  if (!info) {
    baseInfo.textContent = 'No se encontró información del algoritmo seleccionado.';
    return;
  }

  baseInfo.innerHTML = `
    <div class="card">
      <h2>${info.name}</h2>
      <p><strong></strong> ${info.type === "sup" ? "Supervisado" : "No Supervisado"}</p>
      <h3>Descripcion</h3>
      <p><strong></strong> ${info.desc}</p>
    </div>
  `;

  metricInfo.innerHTML = `
    <div class="card">
      <p><strong>${info.metric.name}</strong></p>
      <p>${info.metric.desc}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
    const algorithm = localStorage.getItem('algorithmSelectedKey');

    renderInfoAlgoritmo();

    switch (algorithm) {
    case 'clasificacion':
        renderClasificacionTables();
        break;
    case 'reglas':
        renderAsociacionTables();
        break;
    case 'agrupacion':
        renderAgrupacionTables();
        break;
    default:
        console.warn('Algoritmo no reconocido:', algorithm);
    }

});

function exportTable(fileName = "exportado.xlsx") {
  const posiblesIds = [
    'tablaAgrupacion',
    'tablaClasificacion',
    'tablaAsociacion'
  ];

  const tableId = posiblesIds.find(id => {
    const container = document.getElementById(id);
    return container && container.querySelector('table');
  });

  if (!tableId) {
    alert('No se encontró ninguna tabla para exportar.');
    return;
  }

  const tabla = document.querySelector(`#${tableId} table`);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(tabla);

  XLSX.utils.book_append_sheet(wb, ws, "Resultado");
  XLSX.writeFile(wb, fileName);
}

function endAnalysis(){
  localStorage.clear();
  window.location.href = 'index.html';
  
}