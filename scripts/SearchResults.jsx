import * as React from 'react';
import ResultItem from './ResultItem';
import { useState } from "react";

export default function SearchResults(props) {
    const [state, setState] = useState({
        activeObject: null,
        objects: props.searchList
    });
    
    function setActive(index) {
        setState({...state, activeObject: state.objects[index]});
    }
    
    return (
        <div>
            {state.objects.map((item, index) => (
                <div key={ index } onClick={() => {setActive(index)}}>
                    <ResultItem
                        ASIN={ item["ASIN"] }
                        title={ item["title"] }
                        imageUrl={ item["imageUrl"] } />
                </div>
            ))}
        </div>
    );
}