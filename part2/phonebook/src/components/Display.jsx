import React from "react";

const Display = ({ data, persons, onDelete }) => {
  return (
    <div>
      {data.map((person) => (
        <div key={person.id}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => onDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Display;
