import { getParcoursColor, sortData } from '../utils.js';

let filteredData = [];
let sortDirectionGlobal = 1;
let currentData = [];

export function initGlobalView(data) {
    currentData = data;
    filteredData = [...data];
    
    populateGlobalFilters();
    renderGlobalTable(filteredData);
    updateGlobalStats(filteredData);
    
    document.getElementById('searchInput').addEventListener('input', applyGlobalFilters);
    document.getElementById('filterClasse').addEventListener('change', applyGlobalFilters);
    document.getElementById('filterParcours').addEventListener('change', applyGlobalFilters);
    document.getElementById('filterSalle').addEventListener('change', applyGlobalFilters);
    
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', (e) => {
            const column = e.currentTarget.dataset.sort;
            sortGlobalTable(column);
        });
    });
}

function renderGlobalTable(data) {
    const tbody = document.getElementById('globalTableBody');
    const noResults = document.getElementById('noResults');
    const tableContainer = document.getElementById('tableContainer');
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        noResults.classList.remove('hidden');
        tableContainer.classList.add('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
        tableContainer.classList.remove('hidden');
    }

    data.forEach(item => {
        const tr = document.createElement('tr');
        
        const hasJ2 = item.j2 !== 'Aucune' && item.j2;
        
        tr.innerHTML = `
            <td>
                <span class="badge badge-light">
                    <i class="far fa-clock"></i> ${item.heure}
                </span>
            </td>
            <td>
                <strong>${item.salle}</strong>
            </td>
            <td>
                <div class="eleve-name">${item.eleve}</div>
            </td>
            <td>
                <span class="badge badge-outline">${item.classe}</span>
            </td>
            <td>
                <div class="parcours-container">
                    <span class="badge ${getParcoursColor(item.parcours)}">
                        ${item.parcours}
                    </span>
                </div>
                <div class="problematique">« ${item.problematique} »</div>
            </td>
            <td>
                <div class="jures-list">
                    <div class="jure-item">
                        <i class="fas fa-user-tie"></i>
                        <span><strong>${item.j1}</strong> <span>(${item.d1})</span></span>
                    </div>
                    ${hasJ2 ? `
                    <div class="jure-item">
                        <i class="fas fa-user-tie"></i>
                        <span><strong>${item.j2}</strong> <span>(${item.d2})</span></span>
                    </div>` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function populateGlobalFilters() {
    const classes = [...new Set(currentData.map(item => item.classe))].sort();
    const parcours = [...new Set(currentData.map(item => item.parcours))].sort();
    const salles = [...new Set(currentData.map(item => item.salle))].sort();

    const addOptions = (selectId, items) => {
        const select = document.getElementById(selectId);
        if(!select) return;
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    }

    addOptions('filterClasse', classes);
    addOptions('filterParcours', parcours);
    addOptions('filterSalle', salles);
}

function updateGlobalStats(data) {
    const realEleves = data.filter(item => item.eleve !== "Coordination Générale" && item.eleve !== "Mission Spéciale");

    document.getElementById('stat-total').textContent = realEleves.length;
    document.getElementById('stat-salles').textContent = new Set(realEleves.map(i => i.salle)).size;
    
    const jures = new Set();
    data.forEach(i => {
        if(i.j1) jures.add(i.j1);
        if(i.j2 && i.j2 !== 'Aucune') jures.add(i.j2);
    });
    document.getElementById('stat-jures').textContent = jures.size;
    document.getElementById('stat-parcours').textContent = new Set(realEleves.map(i => i.parcours)).size;
}

function applyGlobalFilters() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const classe = document.getElementById('filterClasse').value;
    const parcours = document.getElementById('filterParcours').value;
    const salle = document.getElementById('filterSalle').value;

    filteredData = currentData.filter(item => {
        const matchSearch = item.eleve.toLowerCase().includes(search) || 
                          item.problematique.toLowerCase().includes(search) ||
                          item.j1.toLowerCase().includes(search) ||
                          (item.j2 && item.j2.toLowerCase().includes(search));
        
        const matchClasse = classe === '' || item.classe === classe;
        const matchParcours = parcours === '' || item.parcours === parcours;
        const matchSalle = salle === '' || item.salle === salle;

        return matchSearch && matchClasse && matchParcours && matchSalle;
    });

    renderGlobalTable(filteredData);
    updateGlobalStats(filteredData);
}

function sortGlobalTable(column) {
    filteredData = sortData(filteredData, column, sortDirectionGlobal);
    sortDirectionGlobal *= -1;
    renderGlobalTable(filteredData);
}
