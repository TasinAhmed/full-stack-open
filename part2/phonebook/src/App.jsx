import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Display from "./components/Display";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [addMsg, setAddMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const showNotification = (msg, setMsg) => {
    setMsg(msg);
    setTimeout(() => {
      setMsg(null);
    }, 5000);
  };

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const deleteClickHandler = (item) => {
    if (window.confirm(`Delete ${item.name}?`)) {
      personService
        .deletePerson(item.id)
        .then((data) => {
          console.log(data);
          setPersons(persons.filter((person) => person.id !== item.id));
        })
        .catch((err) => console.log(err));
    }
  };

  const submitName = (e) => {
    e.preventDefault();

    if (!newName || !number) {
      return alert("Invalid input");
    }

    const matchedPerson = nameExists();

    if (matchedPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return personService
          .updatePerson(matchedPerson.id, {
            ...matchedPerson,
            number,
          })
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id === matchedPerson.id ? { ...person, number } : person
              )
            );
            showNotification(`Added ${newName}`, setAddMsg);
            setNewName("");
            setNumber("");
          })
          .catch((err) => {
            if (err.response.status === 404) {
              showNotification(
                `Information of ${newName} has already been removed from the server`,
                setErrorMsg
              );
            }
          });
      } else {
        return;
      }
    }

    const newPerson = { name: newName, number };

    personService.createPerson(newPerson).then((data) => {
      setPersons([...persons, data]);
      showNotification(`Added ${newName}`, setAddMsg);
      setNewName("");
      setNumber("");
    });
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const nameExists = () => {
    return persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={addMsg} />
      <Notification msg={errorMsg} error />
      <Filter value={search} onChange={onSearchChange} />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        number={number}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        onSubmit={submitName}
      />
      <h2>Numbers</h2>
      <Display
        data={filteredPersons}
        persons={persons}
        onDelete={deleteClickHandler}
      />
    </div>
  );
};

export default App;
