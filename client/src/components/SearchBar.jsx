import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../actions";

export default function SearchBar({ paged, }) {

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
        <div>
            <input type="text" placeholder="Nombre de Receta..." value={search} onChange={e => handleInput(e)} />
            <button onClick={e => handleSubmit(e)}>Buscar</button>
        </div>
    )
}