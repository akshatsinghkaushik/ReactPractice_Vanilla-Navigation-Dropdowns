import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      //If an element inside the dropdown is clicked then do not setOpen to false
      //Otherwise setOpen would be set to false as document.body.addEventListener is triggered before React's onClick listeners and then clicking on an element inside the dropdown will setOpen to true again so the dropdown doesn't close
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    //Add an vanilla JS event listener to the body element to close the dropdown if the body is clicked*
    document.body.addEventListener('click', onBodyClick);

    //Remove the vanilla JS event listener to the body element to close the dropdown if the body is clicked*
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
