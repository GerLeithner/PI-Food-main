
const initialState = {
    loading: false,
    searched: false,
    errors: {},
    allRecipes: [],
    recipes: [],
    recipeDetail: {},
    diets: [],
    dishTypes: [],
}

export default function rooReducer(state = initialState, action) {
    let allRecipes = state.allRecipes;
    let filteredRecipes = state.recipes;
    let sortedRecipes = state.recipes;

    switch(action.type) {
        case "LOADING":
            return { ...state, loading: true };

        case "ERROR":
            return { ...state, errors: action.error, loading: false, recipes: [] };

        case "CLEAR_DETAIL":
            return { ...state, recipeDetail: {}}
    
        case "GET_RECIPES":
            return {
                ...state,
                allRecipes : action.recipes,
                recipes: action.recipes,
                loading: false,

            };

        case "GET_RECIPES_BY_NAME":
            return {
                ...state,
                recipes: action.recipesByName,
                loading: false,
            }

        case "GET_RECIPE_DETAIL":
            return {
                ...state,
                recipeDetail: action.recipe
            }

        case "DELETE_RECIPE":
            return { ...state }

        case "EDIT_RECIPE":
            return { ...state }

        case "CLEAR_RECIPES":
            return {
                ...state,
                recipes: []
            }
        
        case "FILTER_RECIPES_BY_DIET":
            filteredRecipes = allRecipes.filter(r => r.diets.includes(action.diet));
            return {
                ...state,
                recipes: filteredRecipes
            }

        case "FILTER_RECIPES_BY_STATUS":
            if(action.status === "all") filteredRecipes = allRecipes;
            else filteredRecipes = allRecipes.filter(r => r.status === action.status);
            return {
                ...state,
                recipes: filteredRecipes
            }
        
        case "SORT_BY_ALPHABETICAL_ORDER":
            console.log(action)
            sortedRecipes = action.order === "asc" ? 
            state.recipes.sort((a, b) => {
                console.log(a)
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }) :
            state.recipes.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return {
                ...state,
                recipes: sortedRecipes
            }
        
        case "SORT_BY_HEALTH_SCORE":
            sortedRecipes = action.order === "decrement" ?
            state.recipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return 1;
                if(a.healthScore < b.healthScore) return -1;
                return 0;
            }) :
            state.recipes.sort((a, b) => {
                if(a.healthScore > b.healthScore) return -1;
                if(a.healthScore < b.healthScore) return 1;
                return 0;
                });
            return {
                ...state,
                recipes: sortedRecipes
            }
        
        case "CREATE_RECIPE":
            return { ...state }

        case "GET_DIETS":
            return {
                ...state,
                diets: action.diets,
                loading: false,
                error: null
            }
        
        case "GET_DISH_TYPES":
            return {
                ...state,
                dishTypes: action.dishTypes,
                loading: false,
                error: null
            }

        default:
            return {...state,};
    }
}