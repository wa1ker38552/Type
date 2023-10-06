function openModal(m) {
  m.style.display = ""
  m.style.opacity = "1"
  m.style.background = "rgba(0, 0, 0, 0.7)"
  m.style.animation = "fade-in 0.3s"
  m.children[0].style.animation = "move-up 0.3s"
  checkTakingTest = false
}

function closeModal(m) {
  setTimeout(function() {
    m.style.display = "none"
  }, 301)
  m.children[0].style.animation = "move-down 0.3s"
  m.style.animation = "fade-out 0.3s"
  m.style.opacity = 0
  checkTakingTest = true
}

window.onclick = function(e) {
  if (e.target == document.querySelector("#themesModal")) {
    closeModal(document.querySelector("#themesModal"))
  }
}
