export interface PersonagesListTypes {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface PersonagesListInitialStateTypes {
    count: number;
    personagesListLoading: boolean;
    nextPage: string;
    previousPage: string | null;
    personagesList: PersonagesListTypes[];
    personage: PersonagesListTypes;
}

export interface PersonagesListResponseTypes {
    count: number;
    next: string;
    previous: string | null;
    results: PersonagesListTypes[];
}
