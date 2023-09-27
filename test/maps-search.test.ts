import { config } from 'dotenv';
import { describe } from '@jest/globals';
import { getPlaceAutocomplete, mapTomTomResults } from '../src/maps-api';
import { getAutoCompleteDetails } from '../src';
import { AppConfig } from '../src/types';
import { addressResults, tomtomAddressResult } from './test-data';

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        });

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street');
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId');
            expect(firstRes).toHaveProperty('streetNumber');
            expect(firstRes).toHaveProperty('countryCode');
            expect(firstRes).toHaveProperty('country');
            expect(firstRes).toHaveProperty('freeformAddress');
            expect(firstRes).toHaveProperty('municipality');
        });
    });

    describe('getPlaceAutocomplete', () => {
        const config: AppConfig = {
            apiKey: process.env.TOMTOM_API_KEY as string,
        };

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete(config.apiKey, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([]);
        });

        it('handles an address results', async () => {
            const localAddress = '1 Nicholson Street Melbourne, VIC 3002';
            const res = await getPlaceAutocomplete(config.apiKey, localAddress);
            expect(res[0]).toStrictEqual(addressResults);
        });

        it('handles an address with no postcode set', async () => {
            const localAddress = '1 Nicholson Street Melbourne, VIC';
            const res = await getPlaceAutocomplete(config.apiKey, localAddress);
            expect(res[0].municipality).toStrictEqual('Melbourne');
            expect(res[0].streetNumber).toStrictEqual('1');
        });

        it('handles an address with no postcode and state', async () => {
            const localAddress = '1 Nicholson Street Melbourne';
            const res = await getPlaceAutocomplete(config.apiKey, localAddress);
            expect(res[0].municipality).toStrictEqual('Melbourne');
            expect(res[0].streetNumber).toStrictEqual('1');
        });

        it('handles the api limit of 100', async () => {
            const localAddress = '1 Nicholson Street';
            const res = await getPlaceAutocomplete(config.apiKey, localAddress);
            // Using an ambiguous address ensures we reach the max limit of getPlaceAutocomplete
            expect(res.length).toStrictEqual(100);
        });

        it('handles an international address by returning the closest match in Australia', async () => {
            const internationalAddress = '188 Quay Street Auckland New Zealand';
            const res = await getPlaceAutocomplete(config.apiKey, internationalAddress);

            // Expect the response to have a country of Australia for international addresses
            expect(res[0].country).toStrictEqual('Australia');
        });

        it('handles not a real address', async () => {
            const fakeAddress = '!!%*^&%#$(&^';
            expect(getPlaceAutocomplete(config.apiKey, fakeAddress)).rejects.toThrow('failed to retrieve data');
        });

        it('handles error when no address is passed', async () => {
            expect(getPlaceAutocomplete(config.apiKey, '')).rejects.toThrow('Address is required');
        });

        it('handles error when no api key is passed', async () => {
            const localAddress = '1 Nicholson Street Melbourne';
            expect(getPlaceAutocomplete('', localAddress)).rejects.toThrow('API key is required');
        });

        it('handles incorrect api key', async () => {
            expect(getPlaceAutocomplete('123', 'Charlotte Street')).rejects.toThrow();
        });
        it('should map results to AutoCompleteAddressResponse', async () => {
            const results = await mapTomTomResults(tomtomAddressResult);
            expect(results).toEqual([addressResults]);
        });
    });
});
