import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [item, setItem] = useState("");
  const [menu, setMenu] = useState([]);
  const [random, setRandom] = useState(0)

  const getFetch = () => {
      fetch("https://whats4dinnerbyjohan.herokuapp.com/menu-items")
      .then((res) => res.json())
      .then((result) => setMenu(result));
  }


  const pickRandom = () => {
    const newNumb = Math.floor(Math.random() * menu.length - 1);
    setRandom(newNumb)
  }
  useEffect(() => {
    getFetch()
    pickRandom()
  }, [item]);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: item }),
  };
  const addNew = () =>
    fetch("https://whats4dinnerbyjohan.herokuapp.com/menu-items/new", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

  const handleChange = (e) => setItem(e.target.value);


  const handleDelete = (id) => {
    fetch("https://whats4dinnerbyjohan.herokuapp.com/menu-items/delete/" + id, { method: 'DELETE' })
     .then(()=> getFetch())
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    item && addNew();
    setItem("");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <section>
            <h1>What's for 
              dinner?</h1>
            <h2>
              It's <span>{menu[random]?.text}</span>
            </h2>
            <button onClick={pickRandom}>Generate</button>
          </section>
          <section>
            <ul className="flex">
              {menu.map((item) => {
                return <li key={item?._id}>
                  <p>{item?.text}</p>
                  <button onClick={()=> handleDelete(item._id)}>x</button>
                </li>;
              })}
            </ul>
          </section>
          <section className="add">
            <h4>add to the list</h4>
            <form onSubmit={handleSubmit}>
              <input type="text" value={item} onChange={handleChange} />
              <button type="submit">submit</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;

// e. target.value is
