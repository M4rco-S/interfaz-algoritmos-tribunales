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