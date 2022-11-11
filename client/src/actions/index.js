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
                recipes : json.data
            }); 
        })
        .catch(e => console.log(e))
    }
}

// export function getRecipesByName(name) {
//     return function(dispatch) {
//         dispatch(loading());
//         axios.get(`${localHost}/recipes?name=${name}`)
//         .then(recipesByName => {
//             return {
//                 type: "GET_RECIPES_BY_NAME",
//                 recipesByName
//             }
//         })
//         .catch(e => console.log(e))      
//     }
// }

// export function getRecipesById(id) {
//     return function(dispatch) {
//         dispatch(loading());
//         axios.get(`${localHost}/recipes/${id}`)
//         .then(recipe => {
//             return {
//                 type: "GET_RECIPE_BY_ID",
//                 recipe
//             }
//         })
//         .catch(e => console.log(e))
//     }
// }

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