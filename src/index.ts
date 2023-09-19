import { getPlaceAutocomplete } from './maps-api';
import { AppConfig, AutoCompleteAddressResponse } from './types';

/**
 *
 * @param address
 * @returns A Promise list containing the address responses
 */
export const getAutoCompleteDetails = async (address: string): Promise<AutoCompleteAddressResponse[]> => {
    // Typed config options to ensure type safety
    const config: AppConfig = {
        apiKey: process.env.TOMTOM_API_KEY as string,
    };

    // get autocomplete results
    return await getPlaceAutocomplete(config.apiKey, address);
};
