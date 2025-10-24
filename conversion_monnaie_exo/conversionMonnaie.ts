import { API_CONFIG } from './config.js';

type DeviseProps = {
    deviseSource: string,
    deviseCible: string,
}

type ConvertirMonnaieProps = {
    montant: number, 
    deviseSource: string, 
    deviseCible: string,
}

interface IConversionMonnaie {
    tauxConversion: number;
    deviseSource: string;
    deviseCible: string;
    derniereMiseAJour: string;
}

interface IMontantConverti {
    montantOriginal: number;
    deviseSource: string;
    montantConverti: number;
    deviseCible: string;
    tauxUtilise: number;
}

interface IApiResponse {
    result: 'success' | 'error';
    'error-type'?: string;
    conversion_rate: number;
    base_code: string;
    target_code: string;
    time_last_update_utc: string;
}

const obtenirTauxConversion = async ({deviseSource, deviseCible}: DeviseProps): Promise<IConversionMonnaie> => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pair/${deviseSource}/${deviseCible}`);

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
        }

        const data: IApiResponse = await response.json();

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

const convertirMonnaie = async ({montant, deviseSource, deviseCible}: ConvertirMonnaieProps): Promise<IMontantConverti> => {
    if (montant < 0) {
        throw new Error('Le montant doit être positif');
    }

    const { tauxConversion } = await obtenirTauxConversion({deviseSource, deviseCible});

    const montantConverti = montant * tauxConversion;

    return {
        montantOriginal: montant,
        deviseSource,
        montantConverti: parseFloat(montantConverti.toFixed(2)),
        deviseCible,
        tauxUtilise: tauxConversion
    };
};


console.log(await convertirMonnaie({montant: 100, deviseSource: 'VND', deviseCible: 'CUP'}));
