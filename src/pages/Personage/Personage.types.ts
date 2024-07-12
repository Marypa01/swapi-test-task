import { PersonagesListTypes } from "../../store/types";

export interface PersonageDataTypes {
    id: number;
    key: keyof Omit<PersonagesListTypes, "species" | "films" | "vehicles" | "starships">;
    text: string;
    value: string;
}
