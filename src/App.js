import "./App.css";
import { useEffect, useState } from "react";
import Outputdata from "./components/outputGroup";

function App() {
  const [inputVal, setinputVal] = useState("");

  const getmusedata = (e) => {
    e.preventDefault();
    settitle(inputVal);
    settype("rhyme");
    const url = `https://api.datamuse.com/words?${new URLSearchParams({
      rel_rhy: inputVal,
    }).toString()}`;
    datamuseRequest(url, (data) => {
      setres(data);
    });
  };

  const getsyndata = (e) => {
    e.preventDefault();
    settitle(inputVal);
    settype("synonym");
    const url = `https://api.datamuse.com/words?${new URLSearchParams({
      ml: inputVal,
    }).toString()}`;
    datamuseRequest(url, (data) => {
      console.log(data);
      setres(data);
    });
  };
  const datamuseRequest = (url, callback) => {
    setres("...Loading");
    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          // wordOutput.innerHTML = "";
          // This invokes the callback that updates the page.
          callback(data);
        },
        (err) => {
          console.error(err);
        }
      );
  };

  const [res, setres] = useState("");
  const [title, settitle] = useState("");
  const [type, settype] = useState("");

  return (
    <main className="container">
      <h1 className="row">Rhyme Finder (579 Problem Set 6)</h1>
      <div className="row">
        <div className="input-group col">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a word"
            id="word_input"
            value={inputVal}
            onChange={(e) => setinputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getmusedata(e);
                console.log(11)
              }
            }}
          />
          <button
            id="show_rhymes"
            type="button"
            className="btn btn-primary"
            onClick={getmusedata}
          >
            Show rhyming words
          </button>
          <button
            id="show_synonyms"
            type="button"
            className="btn btn-secondary"
            onClick={getsyndata}
          >
            Show synonyms
          </button>
        </div>
      </div>
      <Outputdata val={title} data={res} type={type} />
    </main>
  );
}

export default App;
