import axios from 'axios';

const localHost = "http://localhost:3001";

export function loading() {
    return { type: "LOADING" }
}

export function getRecipes() {
    return function(dispatch) {
        dispatch(loading()); 
        axios.get(`${localHost}/recipes`)
        .then(json => {
            return dispatch({
                type: "GET_RECIPES",
                recipes : json.data,
            }); 
        })
        .catch(e => console.log(e))
    }
}

export function getRecipesByName(name) {
    return function(dispatch) {
        dispatch(loading());
        axios.get(`${localHost}/recipes?name=${name}`)
        .then(json => {
            return dispatch({
                type: "GET_RECIPES_BY_NAME",
                recipesByName: json.data,
            })
        })
        .catch(e => {
            console.log(e)
            return dispatch({
                type: "ERROR",
                error: e.response.data
            })
        });
    }
}

export function getRecipeById(id) {
    return async function(dispatch) {
        dispatch(loading());
        try {
            let recipe = await axios.get(`${localHost}/recipes/${id}`);
            return dispatch({
                type: "GET_RECIPE_DETAIL",
                recipe: recipe.data
            })
        }
        catch(e) {
            console.log(e);
        }
        
    }
}

export function filterRecipesByDiet(diet) {
    return { 
        type: "FILTER_RECIPES_BY_DIET",
        diet 
    }
}

export function filterRecipesByStatus(status) {
    return {
        type: "FILTER_RECIPES_BY_STATUS",
        status
    }
}

export function sortByAlphabeticalOrder(order) {
    return {
        type: "SORT_BY_ALPHABETICAL_ORDER",
        order
    }
}

export function sortByHealthScore(order) {
    return {
        type: "SORT_BY_HEALTH_SCORE",
        order
    }
}

export function createRecipe(recipe) {
    return function(dispatch) {
        dispatch(loading());
        axios.post(`${localHost}/recipes`, recipe)
        .then(response => {
            console.log(response);
            return {
                type: "CREATE_RECIPE",
            }
        })
        .catch(e => {
            console.log(e)
        });
    }
}

export function getDiets() {
    return function(dispatch) {
        dispatch(loading()); 
        axios.get(`${localHost}/diets`)
        .then(json => {
            return dispatch({
                type: "GET_DIETS",
                diets: json.data
            });
        })
        .catch(e => console.log(e))
    }
}

export function getDishTypes() {
    return function(dispatch) {
        dispatch(loading()); 
        axios.get(`${localHost}/dishTypes`)
        .then(json => {
            return dispatch({
                type: "GET_DISH_TYPES",
                dishTypes: json.data
            });
        })
        .catch(e => console.log(e))
    }
}