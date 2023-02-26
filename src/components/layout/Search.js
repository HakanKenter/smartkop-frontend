import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const Search = ({ history }) => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            navigate(`/products-search?search=${keyword}`)
        } else {
            navigate('/products-search')
        }
    }

    return (

        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input 
                    type="search" 
                    id="search_field"
                    className="form-control" 
                    style={{ width: "55%", height: "40px" }} 
                    placeholder="Rechercher..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn btn-primary" >
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}

export default Search
