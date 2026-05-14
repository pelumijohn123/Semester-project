const files = {
  "index.html": `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Semester Project</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\n  <header class="hero">\n    <h1>Welcome to My Semester Project</h1>\n    <p>A project built with HTML, CSS, and JavaScript</p>\n  </header>\n\n  <main class="container">\n\n    <section class="about">\n      <h2>About</h2>\n      <p>This project demonstrates the fundamentals of web development.</p>\n      <p>It covers layout, styling, and interactivity using core web technologies.</p>\n    </section>\n\n    <section class="features">\n      <h2>Features</h2>\n      <ul>\n        <li>Responsive layout using Flexbox and Grid</li>\n        <li>Custom CSS variables for theming</li>\n        <li>Vanilla JavaScript for DOM interaction</li>\n        <li>Clean, semantic HTML5 structure</li>\n      </ul>\n    </section>\n\n    <section class="contact">\n      <h2>Contact</h2>\n      <p>Email: student@example.com</p>\n      <p>GitHub: github.com/student</p>\n    </section>\n\n  </main>\n\n  <footer>\n    <p>&copy; 2026 Semester Project. All rights reserved.</p>\n  </footer>\n\n  <script src="app.js"><\/script>\n</body>\n</html>`,

  "styles.css": `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: 'Segoe UI', sans-serif;\n  background: #f5f5f5;\n  color: #333;\n}\n\n.hero {\n  background: #007acc;\n  color: white;\n  padding: 3rem 2rem;\n  text-align: center;\n}\n\n.container {\n  max-width: 900px;\n  margin: 2rem auto;\n  padding: 0 1rem;\n}`,

  "app.js": `'use strict';\n\nconsole.log("Semester project loaded!");\n\ndocument.addEventListener("DOMContentLoaded", () => {\n  console.log("DOM ready");\n});`
};

const lang = { html:"HTML", css:"CSS", js:"JavaScript", md:"Markdown" };
const editor = document.getElementById("editor");
const lines  = document.getElementById("lines");
const tabs   = document.getElementById("tabs");
let openTabs = [], current = null;

function openFile(name) {
  document.querySelectorAll(".file").forEach(f => f.classList.remove("active"));
  document.getElementById("fi-" + name).classList.add("active");
  if (!openTabs.includes(name)) openTabs.push(name);
  current = name;
  editor.innerText = files[name];
  document.getElementById("statusLang").textContent = lang[name.split(".").pop()] || "Text";
  updateLines(); renderTabs();
}

function renderTabs() {
  tabs.innerHTML = "";
  openTabs.forEach(name => {
    const t = document.createElement("div");
    t.className = "tab" + (name === current ? " active" : "");
    t.innerHTML = `${name} <span class="tab-close">×</span>`;
    t.onclick = () => openFile(name);
    t.querySelector(".tab-close").onclick = e => { e.stopPropagation(); closeTab(name); };
    tabs.appendChild(t);
  });
}

function closeTab(name) {
  openTabs.splice(openTabs.indexOf(name), 1);
  if (!openTabs.length) { editor.innerText = ""; lines.textContent = ""; tabs.innerHTML = ""; current = null; return; }
  openFile(openTabs[0]);
}

function updateLines() {
  lines.textContent = editor.innerText.split("\n").map((_, i) => i + 1).join("\n");
}

function updateCursor() {
  try {
    const r = window.getSelection().getRangeAt(0).cloneRange();
    r.setStart(editor, 0);
    const rows = r.toString().split("\n");
    document.getElementById("statusPos").textContent = `Ln ${rows.length}, Col ${rows.at(-1).length + 1}`;
  } catch(e) {}
}

editor.addEventListener("input", () => { if (current) files[current] = editor.innerText; updateLines(); });
editor.addEventListener("keydown", e => {
  if (e.key === "Tab") { e.preventDefault(); document.execCommand("insertText", false, "  "); }
  if (e.ctrlKey && e.key === "s" && current) { e.preventDefault(); Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([editor.innerText])), download: current }).click(); }
});
editor.addEventListener("keyup", updateCursor);
editor.addEventListener("click", updateCursor);

function toggleSidebar(el) {
  document.getElementById("sidebar").classList.toggle("hidden");
  el.classList.toggle("active");
}

openFile("index.html");
