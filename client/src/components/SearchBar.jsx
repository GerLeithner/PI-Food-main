import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../actions";
import styles from "../styles/searchBar.module.css"


export default function SearchBar({ paged }) {

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    function handleInput(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesByName(search));
        paged(1);
        setSearch("");
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input 
                className={styles.input}  
                type="text" 
                placeholder="Nombre de Receta..." 
                value={search} 
                onChange={e => handleInput(e)} />
            <button className={styles.button} type="submit">Ir</button>
        </form>
    )
}