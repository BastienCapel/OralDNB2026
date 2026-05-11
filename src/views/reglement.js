
export function initReglementView() {
    const container = document.getElementById('view-reglement');
    if (!container) return;

    container.innerHTML = `
        <div class="print-card" style="max-width: 900px;">
            <div class="print-header">
                <div>
                    <h2 class="print-title">Oral du DNB 2026</h2>
                    <p class="print-subtitle">Résumé complet avec textes officiels</p>
                </div>
                <div class="no-print">
                    <button onclick="window.print()" class="btn-outline">
                        <i class="fas fa-print"></i> Imprimer le cadre
                    </button>
                </div>
            </div>

            <div class="reglement-content">
                <section class="mb-8">
                    <h3 class="text-xl font-bold mb-4 text-primary"><i class="fas fa-file-alt mr-2"></i> Textes officiels de référence</h3>
                    <div class="info-box">
                        <ul class="list-decimal pl-5 space-y-2">
                            <li><strong>Modalités d’attribution du diplôme national du brevet à compter de la session 2026</strong> – note de service du 2 septembre 2025, publiée au BOEN n°33 du 4 septembre 2025. C’est le texte qui définit précisément l’épreuve orale de soutenance : durée, choix du sujet, jury, évaluation, notation.</li>
                            <li><strong>Les épreuves du DNB</strong> – page éduscol, qui reprend les modalités de l’épreuve orale de soutenance et la répartition des points.</li>
                            <li><strong>Organisation du DNB dans les centres ouverts à l’étranger – session 2026</strong> – note de service du 11 décembre 2025, applicable aux établissements français à l’étranger, dont le Sénégal.</li>
                            <li><strong>Modalités d’attribution du DNB</strong> – éduscol, qui rappelle les nouvelles règles générales à compter de la session 2026 : note finale sur 20, contrôle continu à 40 %, épreuves terminales à 60 %.</li>
                        </ul>
                    </div>
                </section>

                <hr class="my-8 opacity-20">

                <div class="grid-2-cols gap-8 mb-8">
                    <section>
                        <h3 class="text-lg font-bold mb-3"><i class="fas fa-info-circle text-primary mr-2"></i> 1. Nature de l’épreuve</h3>
                        <p class="text-sm text-muted mb-4">
                            L’oral du DNB 2026 est une épreuve orale de soutenance de projet, réservée aux candidats scolaires. Elle permet à l’élève de présenter :
                        </p>
                        <ul class="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>soit un objet d’étude abordé en histoire des arts ;</li>
                            <li>soit un projet mené dans le cadre d’un EPI ;</li>
                            <li>soit un projet ou une expérience relevant d’un des parcours éducatifs : parcours Avenir, parcours citoyen, parcours éducatif de santé, parcours d’éducation artistique et culturelle.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 class="text-lg font-bold mb-3"><i class="fas fa-clock text-primary mr-2"></i> 2. Durée de l’épreuve</h3>
                        <div class="highlight-box" style="padding: 1rem;">
                            <p class="font-bold text-sm mb-2">Présentation individuelle (15 min) :</p>
                            <ul class="text-sm mb-4">
                                <li>• ~5 min d’exposé</li>
                                <li>• ~10 min d’entretien</li>
                            </ul>
                            <p class="font-bold text-sm mb-2">Présentation collective (25 min) :</p>
                            <ul class="text-sm">
                                <li>• 10 min d’exposé</li>
                                <li>• 15 min d’entretien</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <section class="mb-8">
                    <h3 class="text-lg font-bold mb-3"><i class="fas fa-bullseye text-primary mr-2"></i> 3. Choix du sujet</h3>
                    <p class="text-sm text-muted mb-3">
                        Le sujet doit préciser : l'intitulé, le contenu, les disciplines impliquées, le type de présentation (seul ou groupe) et l'éventuelle utilisation d'une langue étrangère.
                    </p>
                    <div class="warning-box">
                        <strong>Important :</strong> L’élève peut s’appuyer sur une production concrète (diaporama, affiche, maquette...), mais celle-ci ne remplace pas l’oral : elle sert uniquement de support à la soutenance.
                    </div>
                </section>

                <div class="grid-2-cols gap-8 mb-8">
                    <section>
                        <h3 class="text-lg font-bold mb-3"><i class="fas fa-language text-primary mr-2"></i> 4. Langue vivante</h3>
                        <p class="text-sm text-muted">
                            Possibilité d'effectuer une partie de la présentation en langue étrangère (max 5 minutes). Le jury doit alors comprendre un enseignant de la langue concernée.
                        </p>
                    </section>
                    <section>
                        <h3 class="text-lg font-bold mb-3"><i class="fas fa-calendar-check text-primary mr-2"></i> 5. Organisation</h3>
                        <p class="text-sm text-muted">
                            L'épreuve est organisée entre le 15 avril et le dernier jour des épreuves écrites. Au Sénégal, les écrits auront lieu les <strong>18 et 19 juin 2026</strong>.
                        </p>
                    </section>
                </div>

                <section class="mb-8">
                    <h3 class="text-lg font-bold mb-3"><i class="fas fa-user-friends text-primary mr-2"></i> 6. Composition du jury</h3>
                    <p class="text-sm text-muted">
                        Chaque jury comprend au moins deux professeurs. L’établissement doit chercher à représenter plusieurs disciplines, en tenant compte des sujets présentés.
                    </p>
                </section>

                <section class="mb-8">
                    <h3 class="text-lg font-bold mb-3"><i class="fas fa-star text-primary mr-2"></i> 7. Évaluation et notation (Coeff. 2)</h3>
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Domaine évalué</th>
                                    <th class="text-center">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Maîtrise de l’expression orale</td>
                                    <td class="text-center font-bold">8 points</td>
                                </tr>
                                <tr>
                                    <td>Maîtrise du sujet présenté</td>
                                    <td class="text-center font-bold">12 points</td>
                                </tr>
                                <tr style="background: #f1f5f9;">
                                    <td class="font-bold">TOTAL</td>
                                    <td class="text-center font-bold text-primary">20 points</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section class="mb-8">
                    <h3 class="text-lg font-bold mb-3"><i class="fas fa-tasks text-primary mr-2"></i> 8. Évaluation concrète</h3>
                    <div class="grid-2-cols gap-4">
                        <div class="info-box" style="padding: 1rem;">
                            <p class="font-bold text-xs uppercase text-primary mb-2">Forme (8 pts)</p>
                            <ul class="text-xs text-muted space-y-1">
                                <li>• Expression claire</li>
                                <li>• Vocabulaire précis</li>
                                <li>• Structure du propos</li>
                                <li>• Réponse aux questions</li>
                            </ul>
                        </div>
                        <div class="info-box" style="padding: 1rem;">
                            <p class="font-bold text-xs uppercase text-primary mb-2">Fond (12 pts)</p>
                            <ul class="text-xs text-muted space-y-1">
                                <li>• Explication du projet</li>
                                <li>• Connaissances acquises</li>
                                <li>• Analyse de la démarche</li>
                                <li>• Regard critique</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section class="mb-8">
                    <h3 class="text-lg font-bold mb-3"><i class="fas fa-percentage text-primary mr-2"></i> 9. Place dans le DNB 2026</h3>
                    <p class="text-sm text-muted">
                        Le DNB est attribué sur une moyenne finale : <strong>40% contrôle continu</strong> et <strong>60% épreuves terminales</strong>. L'oral est une épreuve terminale.
                    </p>
                </section>

                <div class="highlight-box mb-8" style="background: #fdf2f2; border-color: #fecaca;">
                    <h3 class="text-lg font-bold mb-3 text-danger"><i class="fas fa-exclamation-triangle mr-2"></i> Synthèse pour les familles</h3>
                    <p class="text-sm" style="color: #991b1b; line-height: 1.6;">
                        L’épreuve orale du DNB 2026 est une soutenance de projet. L’élève y présente un projet ou un objet d’étude (EPI, Parcours, Histoire des arts). 
                        Elle dure 15 min (individuel) ou 25 min (collectif). Elle est notée sur 20 points (Coeff 2) : 8 points sur la forme et 12 points sur le fond. 
                        Au Sénégal, l'oral se déroule avant les écrits des 18 et 19 juin 2026.
                    </p>
                </div>
            </div>
        </div>
    `;
}
