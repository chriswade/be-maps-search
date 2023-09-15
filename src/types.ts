// We can extend this interface if requirements change
export interface TomTomAddressResult {
    type: string;
    id: string;
    address: TomTomAddress;
}

interface TomTomAddress {
    streetNumber: string;
    streetName: string;
    municipalitySubdivision: string;
    municipality: string;
    countrySecondarySubdivision: string;
    countrySubdivision: string;
    postalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    localName: string;
}

export interface AutoCompleteAddressResponse {
    placeId: string;
    streetNumber: string;
    countryCode: string;
    country: string;
    freeformAddress: string;
    municipality: string;
}

// Using an enum here so we can support other countries in the future
export enum CountryCode {
    AUS = 'AUS',
}

export interface AppConfig {
    apiKey: string;
}
