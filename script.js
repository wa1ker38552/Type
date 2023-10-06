const WORDS = ['the', 'be', 'of', 'and', 'a', 'to', 'in', 'he', 'have', 'it', 'that', 'for', 'they', 'i', 'with', 'as', 'not', 'on', 'she', 'at', 'by', 'this', 'we', 'you', 'do', 'but', 'from', 'or', 'which', 'one', 'would', 'all', 'will', 'there', 'say', 'who', 'make', 'when', 'can', 'more', 'if', 'no', 'man', 'out', 'other', 'so', 'what', 'time', 'up', 'go', 'about', 'than', 'into', 'could', 'state', 'only', 'new', 'year', 'some', 'take', 'come', 'these', 'know', 'see', 'use', 'get', 'like', 'then', 'first', 'any', 'work', 'now', 'may', 'such', 'give', 'over', 'think', 'most', 'even', 'find', 'day', 'also', 'after', 'way', 'many', 'must', 'look', 'before', 'great', 'back', 'through', 'long', 'where', 'much', 'should', 'well', 'people', 'down', 'own', 'just', 'because', 'good', 'each', 'those', 'feel', 'seem', 'how', 'high', 'too', 'place', 'little', 'world', 'very', 'still', 'nation', 'hand', 'old', 'life', 'tell', 'write', 'become', 'here', 'show', 'house', 'both', 'between', 'need', 'mean', 'call', 'develop', 'under', 'last', 'right', 'move', 'thing', 'general', 'school', 'never', 'same', 'another', 'begin', 'while', 'number', 'part', 'turn', 'real', 'leave', 'might', 'want', 'point', 'form', 'off', 'child', 'few', 'small', 'since', 'against', 'ask', 'late', 'home', 'interest', 'large', 'person', 'end', 'open', 'public', 'follow', 'during', 'present', 'without', 'again', 'hold', 'govern', 'around', 'possible', 'head', 'consider', 'word', 'program', 'problem', 'however', 'lead', 'system', 'set', 'order', 'eye', 'plan', 'run', 'keep', 'face', 'fact', 'group', 'play', 'stand', 'increase', 'early', 'course', 'change', 'help', 'line']
const VALID_KEYS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+{}|:<>?,./;'[]-=``'"+'"'

function decodeTest(decode) {
  // split into 3 parts,  {encoded_words} {char state} {char sequence}
  // encoded words is just the index of each word in ascii-33
  // char state is if the char is correct (0), incorrect (1), or corrected (2) 
  // char sequence states how many chars of each state in char state are of that state
  try {
    decode = atob(decode)
    let data = decode.split(" ")
    let extracted_words = []
    Array.from(data[0]).forEach(function(e) {
      extracted_words.push(WORDS[e.charCodeAt(0)-33])
    })
  
    // render words
    let charArr = []
    wordsContainer.innerHTML = ""
    extracted_words.forEach(function(e) {
      let wordParent = document.createElement("div")
      for (c of e+" ") {
        const charParent = document.createElement("span")
        charParent.innerHTML = (c == " ") ? "&nbsp;" : c
        charParent.setAttribute("original", charParent.innerHTML)
        wordParent.append(charParent)
        charArr.push(charParent)
      }
      wordsContainer.append(wordParent)
    })
    wordsContainer.children[wordsContainer.children.length-1].removeChild(wordsContainer.children[wordsContainer.children.length-1].lastChild)
  
    // render state
    data[2] = data[2].split(',')
    data[1] = Array.from(data[1])
    current = 0
    for (let state=0; state<data[2].length; state++) {
      for (let i=0; i<parseInt(data[2][state]); i++) {
        try {
          if (data[1][state] == "0") {
            charArr[current].className = "correct"
          } else if (data[1][state] == "1") {
            if (charArr[current].innerHTML == "&nbsp;") {
              charArr[current].className = "incorrect-space"
            } else {
              charArr[current].className = "incorrect"
            }
          } else if (data[1][state] == "2") {
            if (charArr[current].innerHTML == "&nbsp;") {
              charArr[current].className = "corrected-space"
            } else {
              charArr[current].className = "corrected"
            }
          }
        } catch (Exception) {}
        current ++ 
      }
    }
  
    if (data[1].length == 1 && data[1][0] == "0") {
      charArr.forEach(function(e) {e.className = "correct"})
    }
  
    let wpm = parseFloat(data[3])
    let raw = parseFloat(data[4])
    let accuracy = parseFloat(data[5])
  
    document.querySelector("#wpmFull").innerHTML = Math.round(wpm * 100) / 100
    document.querySelector("#rawFull").innerHTML = Math.round(raw * 100) / 100
    document.querySelector("#accFull").innerHTML = Math.round(accuracy * 100) / 100
    
    document.querySelector("#wpm").innerHTML = "WPM: "+Math.round(wpm)
    document.querySelector("#raw").innerHTML = "Raw: "+Math.round(raw)
    document.querySelector("#accuracy").innerHTML = "Accuracy: "+Math.round(accuracy)+"%"
  } catch (e) {
    document.querySelector("#wordsContainer").innerHTML = `<span style='color: var(--error)'>${e}</span>`
  }
}

function generateWords(parent, words) {
  let encoded = ""
  for (let i=0; i<words; i++) {
    let rng = Math.floor(Math.random()*WORDS.length)
    let word = WORDS[rng]+" "
    // encode string add 33 to remove invalid characters
    encoded += String.fromCharCode(rng+33)
    const wordParent = document.createElement("div")
    for (c of word) {
      const charParent = document.createElement("span")
      charParent.innerHTML = (c == " ") ? "&nbsp;" : c
      charParent.setAttribute("original", charParent.innerHTML)
      wordParent.append(charParent)
    }
    parent.append(wordParent)
  }
  parent.children[parent.children.length-1].removeChild(parent.children[parent.children.length-1].lastChild)
  return encoded
}

function setTest(self, length) {
  document.getElementsByClassName("selected-test")[0].className = ""
  self.className = "selected-test"
  testLength = length
  resetTest()
}

function moveCaret(caret, c) {
  let pos = c.getBoundingClientRect()
  caret.style.left = pos.left+"px"
  caret.style.top = pos.top+"px"
}

function startTimer() {
  if (started) {
    let formatted = timer.innerHTML.split(":")
    let m1 = parseInt(formatted[0][0])
    let m2 = parseInt(formatted[0][1])
    let s1 = parseInt(formatted[1][0])
    let s2 = parseInt(formatted[1][1])
    let ms1 = parseInt(formatted[2][0])
    let ms2 = parseInt(formatted[2][1])

    ms2 ++
    if (ms2 == 10) {ms2 = 0; ms1 ++}
    if (ms1 == 10) {ms1 = 0; s2 ++}
    if (s2 == 10) {s2 = 0; s1 ++}
    if (s1 == 6) {s1 = 0; m2 ++}
    if (m2 == 10) {m2 = 0; m1 ++}
    
    timer.innerHTML = `${m1}${m2}:${s1}${s2}:${ms1}${ms2}`
  }
}

function resetTest() {
  started = false
  fromStat = false
  setTimeout(function() {
    timer.innerHTML = "00:00:00"
    wordsContainer.innerHTML = ""
    word = 0
    char = 0
    document.querySelector("#shareContainer").style.display = "none"
    document.querySelector("#shareButton").className = ""
    document.querySelector("#wpm").innerHTML = ""
    document.querySelector("#raw").innerHTML = ""
    document.querySelector("#accuracy").innerHTML = ""
    caret.style.top = ""
    caret.style.left = ""
    caret.style.display = ""
    encodedSequence = generateWords(wordsContainer, testLength)
    moveCaret(caret, wordsContainer.children[0].children[0])
  }, 11)
}

function formatChars(charCache) {
  if (charCache < 10) {
    return `00${charCache}`
  } else if (charCache < 100) {
    return `0${charCache}`
  } else {
    return ""+charCache
  }
}

function testFinished() {
  started = false
  const parent = document.querySelector("#wordsContainer")
  let correctChars = 0
  let totalChars = 0
  let correctedSequence = ""
  let charCache = 0
  let correctedChars = []
  for (let i=0; i<parent.children.length; i++) {
    for (let char=0; char<parent.children[i].children.length; char++) {
      let c = parent.children[i].children[char]
      if (c.className == "correct") {
        if (correctedSequence.slice(-1) != "0") {
          correctedSequence += "0"
          correctedChars.push(charCache+1)
          charCache = 0
        } else {charCache ++}
      } else if (c.className == "incorrect" || c.className == "incorrect-space") {
        if (correctedSequence.slice(-1) != "1") {
          correctedSequence += "1"
          correctedChars.push(charCache+1)
          charCache = 0
        } else {charCache ++}
      } else if (c.className == "corrected" || c.className == "corrected-space") {
        if (correctedSequence.slice(-1) != "2") {
          correctedSequence += "2"
          correctedChars.push(charCache+1)
          charCache = 0
        } else {charCache ++}
      }
      
      if (c.className != "incorrect" && c.className != "incorrect-space") {correctChars ++}
      totalChars ++
    }
  }
  correctedChars.push(charCache+1)
  correctedChars.shift()
  
  let m = parseInt(timer.innerHTML.split(":")[0])
  let s = parseInt(timer.innerHTML.split(":")[1])
  let ms = parseInt(timer.innerHTML.split(":")[2])
  let totalTime = m*60+s+ms/100
  
  let wpm = (correctChars/5)/(totalTime/60)
  let raw = (totalChars/5)/(totalTime/60)
  let accuracy = correctChars/totalChars*100
  let encodedTest = btoa(`${encodedSequence} ${correctedSequence} ${correctedChars.toString()} ${Math.round(wpm*100)/100} ${Math.round(raw*100)/100} ${Math.round(accuracy*100)/100}`)

  document.querySelector("#shareContainer").style.display = ""
  document.querySelector("#link").innerHTML = "https://"+window.location.host+"?test="+encodedTest

  document.querySelector("#wpmFull").innerHTML = Math.round(wpm * 100) / 100
  document.querySelector("#rawFull").innerHTML = Math.round(raw * 100) / 100
  document.querySelector("#accFull").innerHTML = Math.round(accuracy * 100) / 100
  
  document.querySelector("#wpm").innerHTML = "WPM: "+Math.round(wpm)
  document.querySelector("#raw").innerHTML = "Raw: "+Math.round(raw)
  document.querySelector("#accuracy").innerHTML = "Accuracy: "+Math.round(accuracy)+"%"
}

var timer
var started = false
var testLength = 10
var encodedSequence = ""
let word = 0
let char = 0
let caret
let wordsContainer
let fromStat = false
let checkTakingTest = true
window.onload = function() {
  renderAllThemes(document.querySelector("#themesContainer"))
  initializeThemes() // renders the theme colors
  // openModal(document.querySelector("#themesModal"))

  let backgroundBrightness = document.querySelector("#backgroundBrightness")
  let backgroundSaturation = document.querySelector("#backgroundSaturation")
  let backgroundOpacity = document.querySelector("#backgroundOpacity")
  let backgroundBlur = document.querySelector("#backgroundBlur")
  let background = document.querySelector("#background")
  setBackgroundFilters(background, backgroundBrightness, backgroundSaturation, backgroundOpacity, backgroundBlur)
  initializeBackgroundFit()
  
  backgroundBrightness.oninput = function(e) {
    let currentFilters = background.style.filter.split(" ")
    background.style.filter = `brightness(${backgroundBrightness.value/2}) ${currentFilters[1]} ${currentFilters[2]}`
    setCookie("bBrightness", `${backgroundBrightness.value/2}`)
  }
  backgroundSaturation.oninput = function(e) {
    let currentFilters = background.style.filter.split(" ")
    background.style.filter = `${currentFilters[0]} saturate(${backgroundSaturation.value/10}) ${currentFilters[2]}`
    setCookie("bSaturation", `${backgroundSaturation.value/10}`)
  }
  backgroundOpacity.oninput = function(e) {
    background.style.opacity = backgroundOpacity.value/10
    setCookie("bOpacity", `${backgroundOpacity.value/10}`)
  }
  backgroundBlur.oninput = function(e) {
    let currentFilters = background.style.filter.split(" ")
    background.style.filter = `${currentFilters[0]} ${currentFilters[1]} blur(${backgroundBlur.value}px)`
    setCookie("bBlur", `${backgroundBlur.value}`)
  }
  
  caret = document.querySelector("#caret")
  wordsContainer = document.querySelector("#wordsContainer")
  timer = document.querySelector("#timer")
  let args = window.location.href.split('?')[1]

  if (args) {
    started = false
    args = args.replace('test=', '')
    caret.style.display = "none"
    decodeTest(args)
    fromStat = true
  } else {
    encodedSequence = generateWords(wordsContainer, testLength)
  }
  
  setInterval(function() {startTimer()}, 10) 
  document.addEventListener("keydown", function(e) {
    if (checkTakingTest) {
      if (word == 0 && char == 0 && !fromStat) {
        started = true
      }
      try {
        if (e.key == "Enter") {
          if (fromStat) {
            window.location.href = "/"
          } else {
            resetTest()
          }
        }
        if (!fromStat) {
          let currentChar = wordsContainer.children[word].children[char].innerHTML
          if (e.key == currentChar || (e.key == " " && currentChar == "&nbsp;")) {
            if (wordsContainer.children[word].children[char].hasAttribute("incorrect")) {
              if (e.key == " ") {
                wordsContainer.children[word].children[char].className = "corrected-space"
              } else {
                wordsContainer.children[word].children[char].className = "corrected"
              }
            } else {
              wordsContainer.children[word].children[char].className = "correct"
            }
              
            char += 1
            if (currentChar == "&nbsp;") {
              char = 0
              word += 1
            }
            moveCaret(caret, wordsContainer.children[word].children[char])
          } else {
            if (e.key == " ") {
              for (let i=0; i<wordsContainer.children[word].children.length; i++) {
                let c = wordsContainer.children[word].children[i]
                if (c.className == "") {
                  if (c.innerHTML == "&nbsp;") {
                    c.className = "incorrect-space"
                  } else {c.className = "incorrect"}
                }
              }
              word += 1
              char = 0
              moveCaret(caret, wordsContainer.children[word].children[char])
            } else if (e.key == "Backspace") {
              if (char > 0) {
                char -= 1
                wordsContainer.children[word].children[char].className = ""
                wordsContainer.children[word].children[char].innerHTML = wordsContainer.children[word].children[char].getAttribute("original")
                moveCaret(caret, wordsContainer.children[word].children[char])
              }
            } else {
              wordsContainer.children[word].children[char].setAttribute("incorrect", "1")
              if (currentChar == "&nbsp;") {
                wordsContainer.children[word].children[char].className = "incorrect-space"
              } else {
                if (VALID_KEYS.includes(e.key)) {
                  wordsContainer.children[word].children[char].className = "incorrect"
                  wordsContainer.children[word].children[char].innerHTML = e.key
                  char += 1
                  moveCaret(caret, wordsContainer.children[word].children[char])
                }
              }
            }
          }
        }
      } catch (Exception) {
        if (started) {
          caret.style.display = "none"
          testFinished()
        }
      } 
    }
  })
}