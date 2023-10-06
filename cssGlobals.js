function setCss(name, value) {
  document.documentElement.style.setProperty(name, value);
}

function getCss(name) {
  return document.documentElement.style.getPropertyValue(name);
}