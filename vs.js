const editor = document.getElementById("editor");
const lines = document.getElementById("lines");
const tab = document.getElementById("tab");
const status = document.getElementById("status");

const files = {
  html: `<h1>Hello World</h1>\n<p>This is HTML</p>`,
  css: `body {\n  background: black;\n}`,
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