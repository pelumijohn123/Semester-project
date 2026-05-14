const editor = document.getElementById("editor");
const lines = document.getElementById("lines");
const tab = document.getElementById("tab");
const status = document.getElementById("status");

const files = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VS Code Clone</title>
  <link rel="stylesheet" href="vs.css">
</head>
<body> 
  <script src="vs.js"></script>

<div class="app">

  
  <div class="activity-bar">
    <div class="icon active">📁</div>
    <div class="icon">🔍</div>
    <div class="icon">🌿</div>
    <div class="icon">🐞</div>
    <div class="icon">⚙️</div>
  </div>

  <div class="sidebar">
    <div class="sidebar-header">EXPLORER</div>
    <div class="file">index.html</div>
    <div class="file">styles.css</div>
    <div class="file">app.js</div>
  </div>`,
  css: ` {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Consolas, monospace;
}

body {
  background: #1e1e1e;
  color: #d4d4d4;
}

.app {
  display: flex;
  height: 100vh;
}


.activity-bar {
  width: 50px;
  background: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}`,
  js: `console.log("Hello world");`
};

function openFile(type) {
  editor.innerText = files[type];
  tab.innerText = type === "html" ? "index.html" :
                  type === "css" ? "styles.css" : "app.js";

  status.innerText = type.toUpperCase();
  updateLines();
}

function updateLines() {
  const count = editor.innerText.split("\n").length;
  lines.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    lines.innerHTML += i + "<br>";
  }
}

editor.addEventListener("input", updateLines);


openFile("html");
