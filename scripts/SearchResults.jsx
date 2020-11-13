import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import './SearchResults.css';

export default function SearchResults({ searchList }) {
  const [state, setState] = useState({
    activeObject: null,
    objects: searchList,
  });

  function setActive(index) {
    setState({ ...state, activeObject: state.objects[index] });
  }

  return (
    <div>
      {state.objects.map((item) => (
        <div key={item.ASIN} onClick={() => { setActive(item.ASIN); }}>
          <ResultItem
            ASIN={item.ASIN}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        </div>
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  searchList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
