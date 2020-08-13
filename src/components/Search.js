import React, { useState, useEffect } from 'react';

import wikipedia from '../apis/wikipedia';

const Search = () => {
  //Instialize an a search term State with the default value 'programming'
  const [term, setTerm] = useState('programming');
  //Instialize a State variable storing the debounced search term which will be used to execute the Wikipedia search with the default value as term state (i.e. 'programming')
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  //Instialize a results State as an empty array which stores the search results from the Wikipedia API
  const [results, setResults] = useState([]);

  //Only update the search term (debouncedTerm) that is used to execute the Wikipedia search if nothing is typed for one second
  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [term]);

  //Execute the Wikipedia search whenever debouncedTerm is updated (and when the app first loads using the default value)
  useEffect(() => {
    const search = async () => {
      const { data } = await wikipedia.get('', {
        params: {
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {result.snippet
            .toString()
            .replace(/<span class="searchmatch">/g, '')
            .replace(/<\/span>/g, '')}
          {
            //Sets the innerHTML content of the React Div to the String obtained from the Wikipedia API
            //WARNING: Susceptible to XSS attacks
            //<span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
          }
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
