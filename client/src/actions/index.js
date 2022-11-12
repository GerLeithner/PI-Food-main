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