let currentData = [];

export function initJuresView(data) {
    currentData = data;
    populateJureSelect();
    
    document.getElementById('jureSelect').addEventListener('change', (e) => {
        const jureName = e.target.value;
        const container = document.getElementById('jurePrintContainer');
        const emptyState = document.getElementById('jureEmptyState');
        
        if (!jureName) {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        container.classList.remove('hidden');
        emptyState.classList.add('hidden');
        container.innerHTML = generateJureHTML(jureName);
    });

    document.getElementById('btn-print-all-jures').addEventListener('click', printAllJures);
}

function populateJureSelect() {
    const select = document.getElementById('jureSelect');
    if (!select) return;
    
    const jures = new Set();
    currentData.forEach(item => {
        if(item.j1) jures.add(item.j1);
        if(item.j2 && item.j2 !== 'Aucune') jures.add(item.j2);
    });
    
    const juresArray = Array.from(jures).sort();
    
    juresArray.forEach(jure => {
        const option = document.createElement('option');
        option.value = jure;
        option.textContent = jure;
        select.appendChild(option);
    });
}

function generateJureHTML(jureName) {
    const orauxJure = currentData.filter(item => item.j1 === jureName || item.j2 === jureName);
    orauxJure.sort((a, b) => parseInt(a.heure.replace(':', '')) - parseInt(b.heure.replace(':', '')));

    const sallesDistinctes = [...new Set(orauxJure.map(o => o.salle))].join(', ');
    
    let html = `
    <div class="print-page print-card">
        <div class="print-header">
            <div>
                <img src="https://i.imgur.com/0YmGlXO.png" alt="Logo Établissement" class="print-logo">
                <p class="print-subtitle">Convocation Jury - Oraux DNB</p>
                <h2 class="print-title">${jureName}</h2>
            </div>
            <div class="print-meta">
                <p>Session 2026</p>
            </div>
        </div>

        <div class="print-stats">
            <div class="print-stat-card">
                <p>Nombre d'oraux à évaluer</p>
                <strong>${orauxJure.length}</strong>
            </div>
            <div class="print-stat-card">
                <p>Salle(s) affectée(s)</p>
                <strong>${sallesDistinctes}</strong>
            </div>
        </div>

        <div class="warning-box" style="margin-bottom: 1.5rem;">
            <p><strong><i class="fas fa-exclamation-circle"></i> Consignes importantes :</strong></p>
            <p style="margin-bottom: 0.5rem;">Il vous est demandé d'être présent dans votre salle <strong>15 minutes avant le début de votre premier oral</strong>.</p>
            <p style="font-size: 0.85em;">Superviseurs de l'épreuve : <strong>Maud Brouillat</strong> et <strong>Karine Chabert</strong>.</p>
        </div>

        <div class="table-container print-table-container">
            <table>
                <thead>
                    <tr>
                        <th>Heure</th>
                        <th>Salle</th>
                        <th>Élève</th>
                        <th>Parcours & Problématique</th>
                        <th>Votre Rôle</th>
                    </tr>
                </thead>
                <tbody>
    `;

    orauxJure.forEach(item => {
        let role = "";
        let coJure = "";
        
        if (item.eleve === "Coordination Générale" || item.parcours === "Supervision") {
            role = '<span class="text-primary font-bold">Coordination</span>';
            coJure = '';
        } else if (item.j1 === jureName) {
            role = '<span class="role-j1">Juré 1</span>';
            coJure = (item.j2 && item.j2 !== 'Aucune') ? `(avec ${item.j2})` : '(Seul)';
        } else if (item.j2 === jureName) {
            role = '<span class="role-j2">Juré 2</span>';
            coJure = `(avec ${item.j1})`;
        }

        html += `
                    <tr>
                        <td><strong>${item.heure}</strong></td>
                        <td>${item.salle}</td>
                        <td>
                            <strong>${item.eleve}</strong>
                            <div class="text-muted">${item.classe}</div>
                        </td>
                        <td>
                            <div class="font-medium">${item.parcours}</div>
                            <div class="text-muted italic">« ${item.problematique} »</div>
                        </td>
                        <td>
                            ${role} <br> <span class="text-muted text-sm">${coJure}</span>
                        </td>
                    </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>

        <div class="print-signature">
            <div>
                <p>Le Principal,</p>
                <p>Bastien CAPEL</p>
                <img src="https://i.imgur.com/77DP4od.png" alt="Signature Principal">
            </div>
        </div>
    </div>
    `;

    return html;
}

function printAllJures() {
    document.getElementById('jureSelect').value = '';
    
    const container = document.getElementById('jurePrintContainer');
    const emptyState = document.getElementById('jureEmptyState');
    
    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    const jures = new Set();
    currentData.forEach(item => {
        if(item.j1) jures.add(item.j1);
        if(item.j2 && item.j2 !== 'Aucune') jures.add(item.j2);
    });
    const juresArray = Array.from(jures).sort();

    let html = '';
    juresArray.forEach(jure => {
        html += generateJureHTML(jure);
    });
    
    container.innerHTML = html;
    setTimeout(() => { window.print(); }, 500);
}
