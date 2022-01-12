import React from "react";

const Part = ({ name, value }) => {
  return (
    <p>
      {name} {value}
    </p>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ data }) => {
  return (
    <>
      {data.map((item, key) => (
        <Part name={item.name} value={item.value} key={key} />
      ))}
    </>
  );
};

const Total = ({ sum }) => {
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        data={[
          { name: part1, value: exercises1 },
          { name: part2, value: exercises2 },
          { name: part3, value: exercises3 },
        ]}
      />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
