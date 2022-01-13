import React, { useState } from "react";

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticsLine
          text="positive"
          value={`${(good / (good + neutral + bad)) * 100}%`}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood((prev) => prev + 1)}>good</Button>
      <Button onClick={() => setNeutral((prev) => prev + 1)}>neutral</Button>
      <Button onClick={() => setBad((prev) => prev + 1)}>bad</Button>
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        "No feedback given"
      )}
    </>
  );
};

export default App;
