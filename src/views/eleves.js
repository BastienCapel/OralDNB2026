let currentData = [];

export function initElevesView(data) {
    currentData = data;
    populateEleveSelect();
    
    document.getElementById('eleveSelect').addEventListener('change', (e) => {
        const selectedEleveName = e.target.value;
        const container = document.getElementById('elevePrintContainer');
        const emptyState = document.getElementById('eleveEmptyState');
        
        if (!selectedEleveName) {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        const item = currentData.find(d => d.eleve === selectedEleveName);
        container.innerHTML = generateEleveHTML(item);
    });

    document.getElementById('btn-print-all-eleves').addEventListener('click', printAllEleves);
}

function populateEleveSelect() {
    const select = document.getElementById('eleveSelect');
    if (!select) return;

    const elevesSorted = [...currentData].sort((a, b) => a.eleve.localeCompare(b.eleve));
    
    elevesSorted.forEach(item => {
        const option = document.createElement('option');
        option.value = item.eleve;
        option.textContent = `${item.eleve} (${item.classe})`;
        select.appendChild(option);
    });
}

function generateEleveHTML(item) {
    return `
    <div class="print-page print-card">
        <div class="print-header">
            <img src="https://i.imgur.com/0YmGlXO.png" alt="Logo Établissement" class="print-logo-large">
            <div class="print-meta text-right">
                <p>Année scolaire 2025-2026</p>
                <p>Épreuve Orale du DNB</p>
            </div>
        </div>
        
        <h1 class="print-main-title">Convocation à l'épreuve orale</h1>
        
        <div class="print-body">
            <p class="mb-4">L'élève <strong class="text-primary text-xl">${item.eleve}</strong> (Classe : <strong>${item.classe}</strong>)</p>
            <p class="mb-6">Est convoqué(e) le <strong>mercredi 20 mai 2026</strong> pour présenter l'épreuve orale du Diplôme National du Brevet concernant le domaine suivant :</p>
            
            <div class="info-box mb-6">
                <p class="info-label">Parcours / Thème choisi</p>
                <p class="info-value text-primary">${item.parcours}</p>
                
                <p class="info-label mt-4">Sujet / Problématique</p>
                <p class="info-value italic">« ${item.problematique} »</p>
            </div>
            
            <div class="grid-2-cols mb-6">
                <div class="highlight-box">
                    <p class="info-label text-primary">Date et heure de passage</p>
                    <p class="text-xl font-bold">mercredi 20 mai 2026</p>
                    <p class="text-2xl font-bold mt-1">${item.heure}</p>
                    <p class="text-sm text-muted mt-2">Présence requise 15 min avant l'heure indiquée.</p>
                </div>
                <div class="highlight-box">
                    <p class="info-label text-primary">Salle d'examen</p>
                    <p class="text-2xl font-bold">${item.salle}</p>
                </div>
            </div>
            
            <div class="warning-box">
                <p><strong><i class="fas fa-exclamation-triangle"></i> Rappel important :</strong></p>
                <p>Le candidat doit obligatoirement se présenter muni de sa <strong>pièce d'identité</strong> (carte d'identité, passeport) et de cette convocation. Aucun retard ne sera toléré.</p>
            </div>
        </div>
        
        <div class="print-signature mt-8">
            <div>
                <p>Le Principal,</p>
                <p>Bastien CAPEL</p>
                <img src="https://i.imgur.com/77DP4od.png" alt="Signature Principal">
            </div>
        </div>
    </div>
    `;
}

function printAllEleves() {
    document.getElementById('eleveSelect').value = '';
    
    const container = document.getElementById('elevePrintContainer');
    const emptyState = document.getElementById('eleveEmptyState');
    
    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    const elevesSorted = [...currentData].sort((a, b) => {
        if(a.classe === b.classe) return a.eleve.localeCompare(b.eleve);
        return a.classe.localeCompare(b.classe);
    });

    let html = '';
    elevesSorted.forEach(item => {
        html += generateEleveHTML(item);
    });
    
    container.innerHTML = html;
    setTimeout(() => { window.print(); }, 500);
}
