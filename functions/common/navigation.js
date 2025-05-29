document.addEventListener('DOMContentLoaded', function () {
  const csvFileName = localStorage.getItem('csvFileName');
  const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html';

  if (!csvFileName && !isIndexPage) {
    window.location.href = 'index.html';
  }
});

/*
function goToBack(){
    localStorage.clear();
    window.history.back();
}*/

function goToIndex(){
    localStorage.clear();
    window.location.href = "index.html";
}

function goToSelectAlgo(){
    localStorage.removeItem("algorithmSelected");
    localStorage.removeItem("algorithmType");
    localStorage.removeItem("backgroundSelected");
    window.location.href = "select-algorithm.html";
}

function goToSelectBack(){
    localStorage.removeItem("backgroundSelected");
    localStorage.removeItem("conseqSelected");
    window.location.href = "select-background.html";

}