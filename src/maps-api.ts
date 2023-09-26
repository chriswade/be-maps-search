import axios from 'axios';
import { AutoCompleteAddressResponse, CountryCode, TomTomAddressResult } from './types';

export const mapTomTomResults = async (results: TomTomAddressResult[]): Promise<AutoCompleteAddressResponse[]> => {
    return results.map((result: TomTomAddressResult): AutoCompleteAddressResponse => {
        const {
            id,
            address: { streetNumber, countryCode, country, freeformAddress, municipality },
        } = result;
        return {
            placeId: id,
            streetNumber,
            countryCode,
            country,
            freeformAddress,
            municipality,
        };
    });
};

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export const getPlaceAutocomplete = async (key: string, address: string): Promise<AutoCompleteAddressResponse[]> => {
    if (!key) {
        throw new Error('API key is required');
    }
    if (!address) {
        throw new Error('Address is required');
    }
    const tomtomSearchApiEndpoint = `https://api.tomtom.com/search/2/search/${address}.json`;
    try {
        const autocomplete = await axios.get(tomtomSearchApiEndpoint, {
            params: {
                key,
                countrySet: CountryCode.AUS,
                limit: 100,
            },
        });

        return mapTomTomResults(autocomplete.data.results);
    } catch (error) {
        throw new Error('failed to retrieve data');
    }
};
