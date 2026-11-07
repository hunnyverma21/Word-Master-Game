const words = [
  { word: "APPLE", scrambled: "PLEAP", hint: "A fruit that keeps doctors away." },
  { word: "TIGER", scrambled: "GERTI", hint: "A wild animal with orange and black stripes." },
  { word: "PLANET", scrambled: "TANLEP", hint: "Earth is one of these." },
  { word: "PYTHON", scrambled: "NOPYTH", hint: "A popular programming language." },
  { word: "GARDEN", scrambled: "DANGER", hint: "A place where flowers grow." },
  { word: "LAPTOP", scrambled: "TOPLAP", hint: "A portable computer." },
  { word: "BRIDGE", scrambled: "GIDBRE", hint: "A structure built over a river." },
  { word: "SUCCESS", scrambled: "CCESUSS", hint: "Achieving your goals." }
];

let index = 0;
let score = 0;
let answered = false;
let hintShown = false;

const $ = id => document.getElementById(id);
const answerInput = $("answer");

function render() {
  const item = words[index];
  $("level").textContent = `LEVEL ${index + 1} / ${words.length}`;
  $("progress-label").textContent = `${Math.round(index / words.length * 100)}% completed`;
  $("progress").style.width = `${index / words.length * 100}%`;
  $("scrambled").textContent = item.scrambled.split("").join("  ");
  $("score").textContent = score;
  answerInput.value = "";
  answerInput.disabled = false;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("hint").hidden = true;
  $("hint").textContent = "";
  $("hint-button").disabled = false;
  $("check").hidden = false;
  $("hint-button").hidden = false;
  $("next").hidden = true;
  answered = false;
  hintShown = false;
  answerInput.focus();
}

function checkAnswer() {
  if (answered) return;
  const guess = answerInput.value.trim().toUpperCase();
  if (!guess) {
    $("feedback").textContent = "Type your answer first.";
    $("feedback").className = "feedback bad";
    answerInput.focus();
    return;
  }
  answered = true;
  answerInput.disabled = true;
  $("check").hidden = true;
  $("hint-button").hidden = true;
  if (guess === words[index].word) {
    score += 10;
    $("feedback").textContent = "✓ Correct! +10 points. Great job!";
    $("feedback").className = "feedback good";
  } else {
    $("feedback").textContent = `Not quite! The correct word was ${words[index].word}.`;
    $("feedback").className = "feedback bad";
  }
  $("score").textContent = score;
  $("progress-label").textContent = `${Math.round((index + 1) / words.length * 100)}% completed`;
  $("progress").style.width = `${(index + 1) / words.length * 100}%`;
  $("next").textContent = index === words.length - 1 ? "See results →" : "Next level →";
  $("next").hidden = false;
}

function showHint() {
  if (hintShown || answered) return;
  $("hint").textContent = `💡 Hint: ${words[index].hint}`;
  $("hint").hidden = false;
  hintShown = true;
  $("hint-button").textContent = "Hint revealed";
  $("hint-button").disabled = true;
}

function nextLevel() {
  if (index < words.length - 1) {
    index++;
    render();
  } else {
    $("game").hidden = true;
    $("result").hidden = false;
    $("final-score").textContent = score;
    $("result-title").textContent = score === 80 ? "Word Genius!" : score >= 50 ? "Amazing work!" : "Keep practicing!";
    $("result-message").textContent = `You completed all ${words.length} words and earned ${score} out of 80 points.`;
  }
}

function restart() {
  index = 0;
  score = 0;
  $("game").hidden = false;
  $("result").hidden = true;
  render();
}

$("check").addEventListener("click", checkAnswer);
$("hint-button").addEventListener("click", showHint);
$("next").addEventListener("click", nextLevel);
$("restart").addEventListener("click", restart);
answerInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    if (answered) nextLevel();
    else checkAnswer();
  }
});

render();
