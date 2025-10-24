import { API_CONFIG } from './config.js';

const obtenirTauxConversion = async (deviseSource, deviseCible) => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pair/${deviseSource}/${deviseCible}`);

        if (!response) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();

        if ('success' !== data.result) {
            throw new Error(`Erreur de conversion: ${data['error-type']}`);
        }

        return {
            tauxConversion: data.conversion_rate,
            deviseSource: data.base_code,
            deviseCible: data.target_code,
            derniereMiseAJour: data.time_last_update_utc
        }
    } catch (erreur) {
        console.error('Erreur lors de la récupération du taux:', erreur);
        throw erreur;
    }
};

const convertirMonnaie = async (montant, deviseSource, deviseCible) => {
    if (montant < 0) {
        throw new Error('Le montant doit être positif');
    }

    const { tauxConversion } = obtenirTauxConversion(deviseSource, deviseCible);

    const montantConverti = montant * tauxConversion;

    return {
        montantOriginal: montant,
        deviseSource,
        montantConverti: parseFloat(montantConverti.toFixed(2)),
        deviseCible,
        tauxUtilise: tauxConversion
    };
};


console.log(convertirMonnaie(100, 'VND', 'CUP'));
