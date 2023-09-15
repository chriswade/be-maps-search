import { getPlaceAutocomplete } from './maps-api';
import { AppConfig, AutoCompleteAddressResponse } from './types';

/**
 *
 * @param address
 * @returns A Promise list containing the address responses
 */
export const getAutoCompleteDetails = (address: string): Promise<AutoCompleteAddressResponse[]> => {
    // Typed config options to ensure type safety
    const config: AppConfig = {
        apiKey: process.env.TOMTOM_API_KEY as string,
    };

    // get autocomplete results
    return getPlaceAutocomplete(config.apiKey, address);
};
