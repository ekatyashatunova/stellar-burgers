import { getIngredientsApi } from './../../utils/burger-api';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient} from '@utils-types';

export interface TIngredientsData {
    ingredients: TIngredient[],
    loading: boolean,
}

const initialState: TIngredientsData = {
    ingredients: [],
    loading: false,
}

const fetchGetIngredients = createAsyncThunk('ingredients/fetchGetIngredients', async () => {
    const response = await getIngredientsApi();
    return response
})

export const ingredientsSlice = createSlice({
    name: '',
    initialState,
    reducers: {},
    selectors: {
        selectIngredients: (ingredientsState) => {
            return ingredientsState.ingredients
        },
        selectLoading: (ingredientsState) => {
            return ingredientsState.loading
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchGetIngredients.pending, (ingredientsState)=> {
            ingredientsState.loading = true;
        })
        .addCase(fetchGetIngredients.rejected, (ingredientsState, action) => {
            ingredientsState.loading = false;
        })
        .addCase(fetchGetIngredients.fulfilled, (ingredientsState, action) => {
            ingredientsState.loading = false;
            ingredientsState.ingredients = action.payload
        })
    }
})

/*export const {selectIngredients, selectLoading} = ingredientsSlice.selectors*/
