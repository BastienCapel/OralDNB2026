let currentData = [];

export function initGrillesView(data) {
    currentData = data;
    
    // Remplir le sélecteur de jurés
    populateGrilleJureSelect();
    
    // Afficher la prévisualisation de la grille vierge
    document.getElementById('grille-preview-container').innerHTML = getGrilleTableHTML();
    
    // Écouteurs d'événements
    document.getElementById('btn-print-all-grilles').addEventListener('click', () => {
        printGrilles(currentData);
    });
    
    // Logique de la modale de couverture
    const coverModal = document.getElementById('cover-print-modal');
    
    document.getElementById('btn-print-jure-cover').addEventListener('click', () => {
        const jureName = document.getElementById('grilleJureSelect').value;
        if (!jureName) { alert("Veuillez d'abord sélectionner un juré pour activer cette option."); return; }
        coverModal.classList.remove('hidden');
    });

    document.getElementById('btn-cover-cancel').addEventListener('click', () => {
        coverModal.classList.add('hidden');
    });

    document.getElementById('btn-cover-single').addEventListener('click', () => {
        const jureName = document.getElementById('grilleJureSelect').value;
        const jureData = currentData.filter(item => item.j1 === jureName || item.j2 === jureName);
        const filteredData = jureData.filter(item => item.eleve !== "Coordination Générale" && item.eleve !== "Mission Spéciale");
        
        coverModal.classList.add('hidden');
        printCovers([{ name: jureName, count: filteredData.length }]);
    });

    document.getElementById('btn-cover-all').addEventListener('click', () => {
        const jures = new Set();
        currentData.forEach(item => {
            if(item.j1) jures.add(item.j1);
            if(item.j2 && item.j2 !== 'Aucune') jures.add(item.j2);
        });
        
        const coversToPrint = Array.from(jures).sort().map(jureName => {
            const jureData = currentData.filter(item => item.j1 === jureName || item.j2 === jureName);
            const filteredData = jureData.filter(item => item.eleve !== "Coordination Générale" && item.eleve !== "Mission Spéciale");
            return { name: jureName, count: filteredData.length };
        });

        coverModal.classList.add('hidden');
        printCovers(coversToPrint);
    });

    document.getElementById('btn-print-jure-grilles').addEventListener('click', () => {
        const jureName = document.getElementById('grilleJureSelect').value;
        if (!jureName) { alert("Veuillez sélectionner un juré."); return; }
        
        const jureData = currentData.filter(item => item.j1 === jureName || item.j2 === jureName);
        jureData.sort((a, b) => parseInt(a.heure.replace(':', '')) - parseInt(b.heure.replace(':', '')));
        printGrilles(jureData, false);
    });
}

function populateGrilleJureSelect() {
    const select = document.getElementById('grilleJureSelect');
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

function formatJurorName(fullName) {
    if (!fullName || fullName === 'Aucune') return '';
    const femaleNames = ['Nathalie', 'Roselyne', 'Claire', 'Nafissatou', 'Fanelly', 'Elizabeth', 'Karine', 'Maud'];
    const parts = fullName.split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    
    return femaleNames.includes(firstName) ? `Mme ${lastName}` : `M. ${lastName}`;
}

function getGrilleTableHTML(item = null) {
    const nom = item ? `<strong>${item.eleve}</strong>` : "...................................................................................................................................";
    const classe = item ? `<strong>${item.classe.replace('3EME', '')}</strong>` : ".....";
    let juryStr = ".....";
    if (item) {
        juryStr = (item.j2 && item.j2 !== 'Aucune') ? `${formatJurorName(item.j1)} / ${formatJurorName(item.j2)}` : formatJurorName(item.j1);
    }
    const problematique = item ? item.problematique : "";

    return `
    <style>
        .grille-exacte { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 0.8rem; margin-top: 1rem; }
        .grille-exacte th, .grille-exacte td { border: 1px solid black; padding: 0.35rem 0.5rem; text-align: left; }
        .grille-exacte .center { text-align: center; }
        .grille-exacte .bold { font-weight: bold; }
        .grille-exacte .bg-light { background-color: #f1f5f9; }
    </style>
    <table class="grille-exacte">
        <tr>
            <td colspan="6" style="padding: 0.75rem;">
                <div style="margin-bottom: 0.5rem;"><span class="bold">Nom, Prénom :</span> ${nom}</div>
                ${item ? `<div style="font-size: 0.85em; color: #444;"><span class="bold">Sujet / Problématique :</span> <em>${problematique}</em></div>` : ''}
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding: 0;">
                <div style="display: flex; height: 100%; align-items: center;">
                    <div style="flex: 1; border-right: 1px solid black; padding: 0.5rem; text-align: center; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <span class="bold">3<sup>ème</sup></span> &nbsp; ${classe}
                    </div>
                    <div style="flex: 1.5; border-right: 1px solid black; padding: 0.5rem; text-align: center; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <span class="bold">Jury :</span> &nbsp; ${juryStr}
                    </div>
                    <div style="flex: 1.5; padding: 0.5rem; text-align: center; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <span class="bold">Seul / En équipe</span>
                        <span style="font-size: 0.65rem; font-style: italic;">(rayer la mention inutile)</span>
                    </div>
                </div>
            </td>
            <td colspan="4" class="center bold" style="font-size: 0.9rem;">Niveaux de maîtrise</td>
        </tr>
        <tr>
            <td class="center bold" style="width: 12%;">Partie 1</td>
            <td class="center bold" style="width: 48%;">Exigences</td>
            <td class="center bold" style="width: 10%;">Insuffisant<br>(0,5 pt)</td>
            <td class="center bold" style="width: 10%;">Fragile<br>(1pt)</td>
            <td class="center bold" style="width: 10%;">Satisfaisant<br>(1,5 pt)</td>
            <td class="center bold" style="width: 10%;">T. bon<br>(2 pts)</td>
        </tr>
        <tr>
            <td rowspan="4" class="center">Maîtrise de<br>l'expression<br>orale</td>
            <td>Adopter une posture adéquate (politesse, contact visuel avec le jury, tenue vestimentaire correcte, ponctualité)</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td>S'exprimer correctement : rythme, articulation, intonation.</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td>Être capable de se détacher de ses notes lors de l'exposé et d'interagir avec le jury par des réponses construites et argumentées.</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td>Utiliser un vocabulaire adapté (registre courant, vocabulaire spécialisé : scientifique, historique, artistique ...).</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td colspan="6" class="center bold bg-light" style="padding: 0.2rem;">Partie 1 : Total des points sur 8 =</td>
        </tr>
        
        <tr>
            <td class="center bold">Partie 2</td>
            <td class="center bold">Exigences</td>
            <td class="center bold">Insuffisant<br>(0,5 pt)</td>
            <td class="center bold">Fragile<br>(1 pt)</td>
            <td class="center bold">Satisfaisant<br>(2 pts)</td>
            <td class="center bold">T. bon<br>(3 pts)</td>
        </tr>
        <tr>
            <td rowspan="4" class="center">Maîtrise du<br>sujet<br>présenté</td>
            <td>Organiser son exposé oral de manière structurée (introduction avec problématique, développement, conclusion) en respectant le temps imparti</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td>Être capable d'expliquer la démarche mise en œuvre (les différentes étapes) et mener une réflexion personnelle.</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td>Utiliser ses connaissances sur le sujet afin de présenter un exposé riche et clair.</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td>Justifier le choix de son sujet et faire le lien avec sa scolarité.</td>
            <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td colspan="6" class="center bold bg-light" style="padding: 0.2rem;">Partie 2 : Total des points sur 12 =</td>
        </tr>
        
        <tr>
            <td colspan="5" style="padding: 0.5rem;">
                <span class="bold italic" style="text-decoration: underline;">BONUS :</span> <span class="bold italic">Être capable de s'exprimer correctement dans une langue vivante étrangère (max 5 min)</span>
            </td>
            <td class="center bold italic">(+2 pts)</td>
        </tr>
        
        <tr>
            <td colspan="5" style="padding: 1rem 0.5rem; vertical-align: top;">
                <span class="bold">Noms et signatures des membres du jury :</span><br><br><br>
                ..................................................................................................................................................
            </td>
            <td class="center bold" style="font-size: 1.5rem; vertical-align: middle;">
                ... / 20
            </td>
        </tr>
    </table>
    
    <div style="border: 1px solid black; margin-top: 0.5rem; padding: 0.5rem; min-height: 100px;">
        <p style="text-decoration: underline; margin-bottom: 0.5rem;">Appréciations</p>
    </div>
    `;
}

function generatePageHTML(item) {
    return `
    <div class="print-page print-card grille-print-page" style="padding: 1.5rem !important;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <img src="https://i.imgur.com/0YmGlXO.png" alt="Logo Lycée" style="height: 4rem;">
            <div style="text-align: center; flex: 1;">
                <h2 style="font-size: 1.1rem; font-weight: bold; margin-bottom: 0.25rem;">Diplôme National du Brevet - Session 2026</h2>
                <h1 style="font-size: 1.3rem; font-weight: bold;">Grille d'évaluation de l'épreuve orale</h1>
                ${item ? `<div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--primary);"><strong>Heure : ${item.heure} | Salle : ${item.salle}</strong></div>` : ''}
            </div>
            <div style="width: 4rem;"></div> <!-- Espaceur pour garder le titre centré -->
        </div>
        
        ${getGrilleTableHTML(item)}
    </div>
    `;
}

function generateCoverHTML(jureName, count) {
    return `
    <div class="print-page print-cover-a3">
        <div class="cover-left"></div>
        <div class="cover-right">
            <img src="https://i.imgur.com/0YmGlXO.png" alt="Logo" style="height: 8rem; margin-bottom: 3rem;">
            <h1 style="font-size: 4rem; font-weight: bold; margin-bottom: 1rem; color: var(--text-main);">DNB 2026</h1>
            <h2 style="font-size: 2.5rem; color: var(--primary); margin-bottom: 3rem; text-transform: uppercase;">Épreuve Orale</h2>
            
            <div style="border: 3px solid var(--text-main); padding: 3rem; border-radius: 1.5rem; width: 80%; background: #f8fafc;">
                <p style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-muted); text-transform: uppercase;">Pochette d'évaluation de</p>
                <p style="font-size: 3rem; font-weight: bold; color: var(--text-main); margin-bottom: 2rem;">${jureName}</p>
                <div style="border-top: 1px solid var(--border-color); padding-top: 2rem;">
                    <p style="font-size: 1.5rem; color: var(--text-muted);">Candidats à évaluer : <strong>${count}</strong></p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function printCovers(jurorsList) {
    const container = document.getElementById('grillesPrintContainer');
    
    let html = `
    <style>
        @media print {
            @page { size: A3 landscape; margin: 0; }
            .print-cover-a3 { display: flex; width: 100%; height: 100vh; page-break-after: always; }
            .cover-left, .cover-right { width: 50%; height: 100%; box-sizing: border-box; }
            .cover-right { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 4rem; text-align: center; border-left: 1px dashed #ccc; }
        }
    </style>
    `;
    
    jurorsList.forEach(juror => {
        html += generateCoverHTML(juror.name, juror.count);
    });
    
    container.innerHTML = html;
    container.classList.remove('hidden');
    document.querySelector('.action-bar').classList.add('hidden');
    
    setTimeout(() => { 
        window.print(); 
        container.classList.add('hidden');
        document.querySelector('.action-bar').classList.remove('hidden');
    }, 500);
}

function printGrilles(dataToPrint, includeCover = false) {
    const container = document.getElementById('grillesPrintContainer');
    
    // Ignorer les lignes de "Coordination" si elles n'ont pas d'élève réel
    const filteredData = dataToPrint.filter(item => item.eleve !== "Coordination Générale" && item.eleve !== "Mission Spéciale");
    
    if (filteredData.length === 0) {
        alert("Aucun candidat à évaluer pour cette sélection.");
        return;
    }

    let html = '';
    
    filteredData.forEach(item => {
        html += generatePageHTML(item);
    });
    
    container.innerHTML = html;
    
    // Affiche temporairement le conteneur et lance l'impression
    container.classList.remove('hidden');
    
    // Cache les autres éléments pour éviter qu'ils ne s'impriment s'ils ne sont pas protégés par no-print
    document.querySelector('.action-bar').classList.add('hidden');
    
    setTimeout(() => { 
        window.print(); 
        
        // Restaure l'état après impression
        container.classList.add('hidden');
        document.querySelector('.action-bar').classList.remove('hidden');
    }, 500);
}
