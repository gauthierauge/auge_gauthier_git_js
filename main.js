const etatDeCaisse = {
    '1': 23,
    '2': 12,
    '5': 10,
    '10': 2,
    '20': 3
}

const calculerMonnaieARendre = (montantDonneParClient, montantAchat) => {
    return montantDonneParClient - montantAchat;
};

const validerMontant = (monnaieARendre) => {
    if (monnaieARendre < 0) {
        return { 
            valide: false, 
            erreur: "Montant insuffisant", 
            resteAPayer: -monnaieARendre 
        };
    }
    return { valide: true };
};

const trierValeursDecroissantes = (caisse) => {
    return Object.keys(caisse).sort((a, b) => b - a);
};

const calculerQuantiteUtilisable = (monnaieRestante, valeurMonnaie, quantiteDisponible) => {
    return Math.min(
        Math.floor(monnaieRestante / valeurMonnaie),
        quantiteDisponible
    );
};

const monnaieRendue = (monnaieARendre) => {
    const caisseDisponible = { ...etatDeCaisse };
    const monnaieRendue = {};
    let monnaieRestante = monnaieARendre;

    const valeursCaisse = trierValeursDecroissantes(caisseDisponible);

    for (const valeurCle of valeursCaisse) {
        const valeurMonnaie = Number(valeurCle);
        const quantiteDisponible = caisseDisponible[valeurCle];

        if (monnaieRestante >= valeurMonnaie && quantiteDisponible > 0) {
            const quantiteUtilisee = calculerQuantiteUtilisable(monnaieRestante, valeurMonnaie, quantiteDisponible);

            monnaieRendue[valeurCle] = quantiteUtilisee;
            monnaieRestante -= quantiteUtilisee * valeurMonnaie;
        }
    }

    return monnaieRestante > 0 
        ? { erreur: "Monnaie insuffisante dans la caisse" }
        : { monnaieRendue };
}

const retourMonnaie = ({ montantAchat, montantDonneParClient }) => {
    const monnaieARendre = calculerMonnaieARendre(montantDonneParClient, montantAchat);

    const validation = validerMontant(monnaieARendre);
    if (!validation.valide) {
        return validation;
    }

    return monnaieRendue(monnaieARendre);
}

console.log(retourMonnaie({ montantAchat: 120, montantDonneParClient: 500 }));
console.log(retourMonnaie({ montantAchat: 40, montantDonneParClient: 50 }));
