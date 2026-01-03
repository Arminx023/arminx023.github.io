let projects = JSON.parse(localStorage.getItem("projects")) || {};
let currentProject = null;

function save() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addProject() {
  const name = document.getElementById("projectName").value.trim();
  if (!name || projects[name]) return;

  projects[name] = [];
  save();
  document.getElementById("projectName").value = "";
  loadProjectList();
}

function loadProjectList() {
  const select = document.getElementById("projectSelect");
  select.innerHTML = "";

  Object.keys(projects).forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    select.appendChild(option);
  });

  if (!currentProject && select.options.length > 0) {
    select.selectedIndex = 0;
    loadProject();
  }
}

function loadProject() {
  const select = document.getElementById("projectSelect");
  currentProject = select.value;
  renderResults();
}

function calculate() {
  if (!currentProject) return;

  const l = parseFloat(document.getElementById("length").value);
  const w = parseFloat(document.getElementById("width").value);
  if (isNaN(l) || isNaN(w)) return;

  const area = (l * w).toFixed(2);
  projects[currentProject].push(`${l} m × ${w} m = ${area} m²`);
  save();
  renderResults();
}

function renderResults() {
  const ul = document.getElementById("results");
  ul.innerHTML = "";

  projects[currentProject].forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    ul.appendChild(li);
  });
}

loadProjectList();
