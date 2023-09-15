import axios from 'axios';
import { AutoCompleteAddressResponse, CountryCode, TomTomAddressResult } from './types';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, address: string): Promise<AutoCompleteAddressResponse[]> {
    if (!address) {
        return Promise.reject(new Error('Address is required'));
    }
    const tomtomSearchApiEndpoint = `https://api.tomtom.com/search/2/search/${address}.json`;
    const autocomplete = await axios.get(tomtomSearchApiEndpoint, {
        params: {
            key,
            countrySet: CountryCode.AUS,
            limit: 100,
        },
    });
    return autocomplete.data.results.map((result: TomTomAddressResult): AutoCompleteAddressResponse => {
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
}
