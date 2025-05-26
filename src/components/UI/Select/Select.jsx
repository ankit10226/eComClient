import React from 'react';

const Select = (props) => {
  return (
    <div className="my-2">
      <select
        name={props.name}
        id={props.id}
        className={`shadow-lg rounded-sm w-full px-2 py-1 font-light text-cyan-950 bg-white border border-gray-300 hover:border-gray-500 transition ease-linear mb-4 ${props.className}`}
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{props.placeholder || 'Select an option'}</option>
        {props.options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
