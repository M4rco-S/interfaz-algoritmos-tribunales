function renderClasificacionTables() {
  let raw = localStorage.getItem('serverResponse');
  if (!raw) return;

  try {
    // ['{', '"results": [', ...]
    if (Array.isArray(raw)) {
      raw = raw.join('');
    }

    //  "[\"{\", ...]"
    if (typeof raw === 'string' && raw.trim().startsWith('["')) {
      const array = JSON.parse(raw);     
      raw = array.join(''); 
    }

    const parsed = JSON.parse(raw);
    const rules = parsed.results;
    const relevance = parsed.data2?.results?.[0];

    let htmlRules = `
      <table border="1">
        <thead>
          <tr>
            <th>Condición </th>
            <th>${Object.keys(rules[0]).find(k => k !== 'condición')}</th>
          </tr>
        </thead>
        <tbody>
    `;

    rules.forEach(regla => {
      const antecedente = regla['condición'];
      const consecuenteKey = Object.keys(regla).find(k => k !== 'condición');
      const consecuente = regla[consecuenteKey];
      htmlRules += `
        <tr>
          <td>${antecedente}</td>
          <td>${consecuente}</td>
        </tr>
      `;
    });

    htmlRules += `</tbody></table>`;

    let htmlRelevance = '';
    if (relevance) {
      htmlRelevance = `
        <table border="1">
          <thead>
            <tr>
                ${Object.keys(relevance).map(k => 
                `<th>${k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</th>`
                ).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${Object.values(relevance).map(v => `<td>${v}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      `;
    }

    document.getElementById('tablaClasificacion').innerHTML = htmlRules;
    document.getElementById('tablaRelevancia').innerHTML = htmlRelevance;

  } catch (e) {
    console.error('Error al procesar serverResponse:', e);
  }
}

function renderAsociacionTables() {
  const raw = localStorage.getItem('serverResponse');
  if (!raw) return;

  let parsedData;
  try {
    parsedData = JSON.parse(JSON.parse(raw.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']')).join(''));
  } catch (e) {
    console.error('Error al parsear serverResponse:', e);
    return;
  }

  const results = parsedData.results;
  if (!results || !Array.isArray(results)) {
    console.warn('No se encontraron resultados válidos');
    return;
  }

  let html = `
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
      <thead>
        <tr>
          <th>Si</th>
          <th>Entonces</th>
          <th>Soporte (%)</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(regla => `
          <tr>
            <td>${regla["Si"]}</td>
            <td>${regla["Entonces"]}</td>
            <td>${regla["Soporte (%)"]}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const container = document.getElementById('tablaAsociacion');
  if (container) container.innerHTML = html;
}

function renderAgrupacionTables() {
  const raw = localStorage.getItem('serverResponse');
  if (!raw) return;

  let parsedData;
  try {
    const arrayDeLineas = JSON.parse(raw);
    parsedData = JSON.parse(arrayDeLineas.join(''));
  } catch (e) {
    console.error('Error al parsear serverResponse:', e);
    return;
  }

  const results = parsedData.results;
  if (!results || !Array.isArray(results)) {
    console.warn('No se encontraron resultados válidos');
    return;
  }

  let htmlMain = `
    <h3>Resultados de Agrupación</h3>
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: left; margin-bottom: 20px;">
      <thead>
        <tr>
          ${Object.keys(results[0]).map(key => {
            const label = key.replace(/_/g, ' ')
                            .replace(/\b\w/g, c => c.toUpperCase());
            return `<th>${label}</th>`;
          }).join('')}
        </tr>
      </thead>
      <tbody>
        ${results.map(row => `
          <tr>
            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const conteoPorGrupo = {};
  results.forEach(row => {
    const grupo = row.grupo;
    conteoPorGrupo[grupo] = (conteoPorGrupo[grupo] || 0) + 1;
  });

  const grupos = Object.keys(conteoPorGrupo).sort((a, b) => a - b);
  const total = results.length;

  let htmlResumen = `
    <h3>Cantidad de elementos por grupo</h3>
    <table>
      <thead>
        <tr>
          ${grupos.map(g => `<th>Grupo ${g}</th>`).join('')}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          ${grupos.map(g => `<td>${conteoPorGrupo[g]}</td>`).join('')}
          <td>${total}</td>
        </tr>
      </tbody>
    </table>
  `;

  const divPrincipal = document.getElementById('tablaAgrupacion');
  const divResumen = document.getElementById('tablaAgrupacionResumen');
  if (divPrincipal) divPrincipal.innerHTML = htmlMain;
  if (divResumen) divResumen.innerHTML = htmlResumen;

  const costo = parsedData.costo;
  const divCosto = document.getElementById('agrupacionCostoContainer');
  if (divCosto && typeof costo !== 'undefined') {
    divCosto.innerHTML = `
      <h3>Costo de agrupación</h3>
      <p><strong>${costo}</strong></p>
    `;
  }
}
