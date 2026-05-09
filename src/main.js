import { rawData } from './data.js';
import { initGlobalView } from './views/global.js';
import { initJuresView } from './views/jures.js';
import { initElevesView } from './views/eleves.js';
import { initGrillesView } from './views/grilles.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des vues avec les données
    initGlobalView(rawData);
    initJuresView(rawData);
    initElevesView(rawData);
    initGrillesView(rawData);

    // Gestion du système d'onglets
    const tabs = ['global', 'jures', 'eleves', 'grilles'];
    
    window.switchTab = function(tabId) {
        tabs.forEach(id => {
            const view = document.getElementById('view-' + id);
            const btn = document.getElementById('tab-' + id);
            
            if (id === tabId) {
                view.classList.remove('hidden');
                view.classList.add('block');
                btn.classList.add('active');
            } else {
                view.classList.remove('block');
                view.classList.add('hidden');
                btn.classList.remove('active');
            }
        });
    }

    // Forcer l'affichage du premier onglet au chargement
    window.switchTab('global');
});
