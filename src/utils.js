// utils.js

export function getParcoursColor(parcours) {
    const p = parcours.toLowerCase();
    if (p.includes('santé')) return 'parcours-sante';
    if (p.includes('citoyen')) return 'parcours-citoyen';
    if (p.includes('avenir')) return 'parcours-avenir';
    if (p.includes('arts')) return 'parcours-arts';
    if (p.includes('peac')) return 'parcours-peac';
    return 'parcours-default';
}

export function sortData(data, column, direction) {
    return [...data].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        
        if (column === 'heure') {
            valA = parseInt(valA.replace(':', ''));
            valB = parseInt(valB.replace(':', ''));
        } else if (column === 'salle') {
            valA = parseInt(valA.replace('Salle ', '')) || valA;
            valB = parseInt(valB.replace('Salle ', '')) || valB;
        }
        
        if (valA < valB) return -1 * direction;
        if (valA > valB) return 1 * direction;
        return 0;
    });
}
