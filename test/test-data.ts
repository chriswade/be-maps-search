import { AutoCompleteAddressResponse, TomTomAddressResult } from '../src/types';

export const addressResults: AutoCompleteAddressResponse = {
    country: 'Australia',
    countryCode: 'AU',
    freeformAddress: '1 Nicholson Street, East Melbourne, Victoria, 3002',
    municipality: 'Melbourne',
    placeId: 'rCNDG-nd6wVVI-BBUfid4g',
    streetNumber: '1',
};

export const tomtomAddressResult: TomTomAddressResult[] = [
    {
        type: 'Point Address',
        id: 'rCNDG-nd6wVVI-BBUfid4g',
        score: 11.954627037,
        address: {
            streetNumber: '1',
            streetName: 'Nicholson Street',
            municipalitySubdivision: 'East Melbourne',
            municipality: 'Melbourne',
            countrySecondarySubdivision: 'Melbourne',
            countrySubdivision: 'Victoria',
            postalCode: '3002',
            countryCode: 'AU',
            country: 'Australia',
            countryCodeISO3: 'AUS',
            freeformAddress: '1 Nicholson Street, East Melbourne, Victoria, 3002',
            localName: 'East Melbourne',
        },
    },
];
