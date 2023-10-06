const THEMES = {
  "Light": [
    "#ffffff",
    "#333333",
    "#525252",
    "#00db37",
    "#fe3939",
    "#e3a92b",
    "#878787",
    "#d9d9d9",
    "#ffffff",
    "invert(11%) sepia(0%) saturate(37%) hue-rotate(164deg) brightness(106%) contrast(79%)"
  ],
  "Dark": [
    "#292929",
    "#8c8c8c",
    "#616161",
    "#ededed",
    "#c15757",
    "#e3a92b",
    "#878787",
    "#3b3b3b",
    "#8c8c8c",
    "invert(62%) sepia(0%) saturate(0%) hue-rotate(98deg) brightness(89%) contrast(92%)"
  ],
  "Sky": [
    "#f0f6ff",
    "#1d4991",
    "#5e7aa6",
    "#42c6ff",
    "#ff7070",
    "#fec343",
    "#8a9dbc",
    "#d7e7fe",
    "#f0f6ff",
    "invert(22%) sepia(23%) saturate(4440%) hue-rotate(199deg) brightness(96%) contrast(92%)"
  ],
  "Cherry": [
    "#fff0f0",
    "#911d1d",
    "#a65e5e",
    "#ff0000",
    "#ffc800",
    "#fe7171",
    "#bc8a8a",
    "#fed7d7",
    "#fff0f0",
    "invert(14%) sepia(87%) saturate(3005%) hue-rotate(349deg) brightness(84%) contrast(90%)"
  ],
  "Hacker": [
    "#1c1c1c",
    "#1d9149",
    "#00752d",
    "#00ff62",
    "#c42121",
    "#ffb30f",
    "#36a661",
    "#4f4f4f",
    "1d9149",
    "invert(45%) sepia(67%) saturate(483%) hue-rotate(90deg) brightness(87%) contrast(95%)"
  ],
  "CottonCandy": [
    "#ffdbf8",
    "#ff00d0",
    "#00aed1",
    "#00d5ff",
    "#fe5858",
    "#ffa3a3",
    "#00a2c2",
    "#dab9d3",
    "ffc7f5",
    "invert(19%) sepia(78%) saturate(5433%) hue-rotate(307deg) brightness(113%) contrast(120%)"
  ],
  "Coffee": [
    "#d9c6af",
    "#a37338",
    "#87725a",
    "#db7900",
    "#ff6b6b",
    "#ffde66",
    "#ad9171",
    "#bfaf9b",
    "#b6a99a",
    "invert(51%) sepia(12%) saturate(2110%) hue-rotate(353deg) brightness(90%) contrast(83%)"
  ],
  "Sunset": [
    "#ffc7a8",
    "#6f52ff",
    "#8979d7",
    "#ff5900",
    "#ff6bb3",
    "#df6bff",
    "#9d8aff",
    "#d9aa91",
    "#fec7a9",
    "invert(30%) sepia(70%) saturate(2071%) hue-rotate(235deg) brightness(99%) contrast(105%)"
  ],
  "Galaxy": [
    "#0c0029",
    "#5e6db5",
    "#6134cb",
    "#d748fe",
    "#ff6bb3",
    "#fed748",
    "#340b93",
    "#1d0061",
    "#5e6db5",
    "invert(40%) sepia(8%) saturate(3364%) hue-rotate(192deg) brightness(104%) contrast(84%)"
  ]
}

function setCssTheme(theme) {
  let i = 0
  ;["--background", "--color", "--secondary", "--success", "--error", "--warning", "--caret", "--shadow", "--tooltip", "--filter"].forEach(function(e) {
    setCss(e, THEMES[theme][i])
    i ++
  })
}

function setTheme(theme) {
  try {document.getElementsByClassName("selected-theme")[0].className = "theme centered-vertically"} catch (Exception) {}
  document.querySelector("#"+theme).className = "theme centered-vertically selected-theme"
  setCookie("theme", theme)
  setCssTheme(theme)
}

function renderAllThemes(parent) {
  for (let k in THEMES) {
    let theme = document.createElement("div")
    let themeColors = document.createElement("div")
    let themeName = document.createElement("div")
    let themeColorA = document.createElement("div")
    let themeColorB = document.createElement("div")
    let themeColorC = document.createElement("div")

    theme.id = k
    theme.onclick = function() {setTheme(k)}
    theme.className = "theme centered-vertically"
    themeColors.className = "theme-colors centered-vertically"
    themeName.className = "theme-name"
    themeColorA.className = "theme-color"
    themeColorB.className = "theme-color"
    themeColorC.className = "theme-color"
    themeColorA.style.background = THEMES[k][0]
    themeColorB.style.background = THEMES[k][1]
    themeColorC.style.background = THEMES[k][2]
    themeName.innerHTML = k

    theme.append(themeName, themeColors)
    themeColors.append(themeColorA, themeColorB, themeColorC)
    parent.append(theme)
  }
}

function initializeThemes() {
  if (getCookie("theme")) {
    setTheme(getCookie("theme"))
  } else {
    setTheme("Light")
  }

  if (getCookie("background")) {
    setBackground(getCookie("background"))
    document.querySelector("#backgroundInput").value = getCookie("background")
  }
}

function setBackground(background) {  
  document.querySelector("#background").style.background = `url('${background}')`
}

function setBackgroundFit(self, type) {
  try {document.getElementsByClassName("selected-button")[0].classList.remove("selected-button")} catch (Exception) {}
  self.classList.add("selected-button")
  document.querySelector("#background").style.backgroundSize = type
  setCookie("bFit", type)
}

function initializeBackgroundFit() {
  if (getCookie("bFit")) {
    setBackgroundFit(document.querySelector(`#bg${getCookie('bFit')}`), getCookie("bFit"))
  } else {
    setBackgroundFit(document.querySelector("#bgcover"), "cover")
  }
}

function setBackgroundFilters(bg, br, sa, op, bl) {
  let brightness = getCookie("bBrightness")
  let saturation = getCookie("bSaturation")
  let opacity = getCookie("bOpacity")
  let blur = getCookie("bBlur")

  if (!brightness) {brightness = 1}
  if (!saturation) {saturation = 1}
  if (!opacity) {opacity = "1"}
  if (!blur) {blur = 0}

  br.value = brightness*2
  sa.value = saturation*10
  op.value = opacity*10
  bl.value = blur

  bg.style.opacity = opacity
  bg.style.filter = `brightness(${brightness}) saturate(${saturation}) blur(${blur}px)`
}

function saveBackground() {
  let background = document.querySelector("#backgroundInput").value
  setCookie("background", background)
  setBackground(background)
}

// setCssTheme((getCookie("theme")) ? getCookie("theme") : "Light")