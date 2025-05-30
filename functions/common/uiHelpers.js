/**
 * Alterna la visibilidad de una caja de información (`tabContent`) en la interfaz,
 * cambiando su estilo de visualización, el ícono del triángulo y expandiendo el tab
 * lateral si el ancho de pantalla es menor o igual a 800px.
 *
 * @function toggleInfoBox
 * @returns {void}
 */
function toggleInfoBox() {
  const content = document.getElementById('tabContent');
  const triangle = document.getElementById('triangleIcon');
  const tab = document.getElementById('infoTab');

  const isOpen = content.style.display === 'block';

  content.style.display = isOpen ? 'none' : 'block';

  if (window.innerWidth <= 800) {
    tab.classList.toggle('expanded');
  }

  if (isOpen) {
    triangle.style.borderLeft = '12px solid black';
    triangle.style.borderRight = 'none';
  } else {
    triangle.style.borderLeft = 'none';
    triangle.style.borderRight = '12px solid black';
  }
}
