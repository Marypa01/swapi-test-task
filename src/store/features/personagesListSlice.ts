import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PersonagesListInitialStateTypes, PersonagesListResponseTypes, PersonagesListTypes } from "../types";
import { PersonageDataKeys } from "../../pages/Personage/Personage.types";

export const getPersonagesListAsync = createAsyncThunk(
    "personagesList/getPersonagesListAsync",
    async ({ page, search }: { page?: number; search?: string }) => {
        const response = await fetch(
            process.env.REACT_APP_API_URL + "people" + (page ? `/?page=${page}` : "") + (search ? `/?search=${search}` : ""),
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    }
);

export const getPersonageAsync = createAsyncThunk("personagesList/getPersonageAsync", async (personage?: string) => {
    const response = await fetch(process.env.REACT_APP_API_URL + "people" + (personage ? `/${personage}` : ""), {
        method: "GET",
    });
    const data = await response.json();
    return data;
});

const initialState: PersonagesListInitialStateTypes = {
    personagesListLoading: false,
    count: 0,
    nextPage: "",
    previousPage: null,
    personagesList: [],
    personage: {
        name: "",
        height: "",
        mass: "",
        hair_color: "",
        skin_color: "",
        eye_color: "",
        birth_year: "",
        gender: "",
        homeworld: "",
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: "",
        edited: "",
        url: "",
    },
};

const personagesListSlice = createSlice({
    name: "personagesList",
    initialState,
    reducers: {
        setPersonageDataRedux: (
            state,       
            action: PayloadAction<{ type: PersonageDataKeys; value: string }>
        ) => {
            state.personage[action.payload.type] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPersonagesListAsync.pending, (state, action) => {
                state.personagesListLoading = true;
            })
            .addCase(getPersonagesListAsync.fulfilled, (state, action: PayloadAction<PersonagesListResponseTypes>) => {
                state.personagesListLoading = false;
                state.nextPage = action.payload.next;
                state.previousPage = action.payload.previous;
                state.personagesList = action.payload.results;
                state.count = action.payload.count;
            })
            .addCase(getPersonagesListAsync.rejected, (state, action) => {
                state.personagesListLoading = false;
            })
            .addCase(getPersonageAsync.pending, (state, action) => {
                state.personagesListLoading = true;
            })
            .addCase(getPersonageAsync.fulfilled, (state, action: PayloadAction<PersonagesListTypes>) => {
                state.personagesListLoading = false;
                state.personage = action.payload;
            })
            .addCase(getPersonageAsync.rejected, (state) => {
                state.personagesListLoading = false;
            });
    },
});

export const { setPersonageDataRedux } = personagesListSlice.actions;

export default personagesListSlice.reducer;
