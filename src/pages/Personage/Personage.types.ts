import { PersonagesListTypes } from "../../store/types";

export type PersonageDataKeys = keyof Omit<PersonagesListTypes, "species" | "films" | "vehicles" | "starships">;

export interface PersonageDataTypes {
    id: number;
    key: PersonageDataKeys;
    text: string;
    value: string;
}
