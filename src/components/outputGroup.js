import { Fragment, useState } from "react";
import SavedWords from "./savedWords";

function Outputdata(props) {
  let res = [];
  let keys = [];
  let title = "";
  if(typeof(res) ==="string") {
      res=props.data
    console.log(res)}
  if (props.type === "rhyme") {
    if (props.data.length === 0) {
      res = "(no results)";
      title=""
    } else {
      keys = groupBy(props.data, "numSyllables");
      res = Object.keys(keys);
      title = `Words with rhyme: ${props.val}`;
    }
  } else if (props.type === "synonym") {
    title = props.data.length === 0 ?"":`Words with a meaning similar to ${props.val}`;
    res = props.data.length === 0 ? "(no results)" : props.data;
  }

  const [savedWords, setsaved] = useState([]);

  return (
    <Fragment>
      <SavedWords cont={savedWords} />
      <div className="row">
        <h2 className="col" id="output_description">
          {title}
        </h2>
      </div>
      <div className="output row">
        <output id="word_output" className="col">
          {typeof(res) ==="string" ? 
            res
           : props.type === "rhyme" ? (
            res.map((item, key) => {
              return (
                <ul key={item + key}>
                  <h3>Syllables: {item}</h3>
                  {keys[item].map((e, index) => {
                    return (
                      <li key={e + index}>
                        <span>{e.word}</span>
                        <button
                          className="btn btn-outline-success"
                          onClick={() =>
                            setsaved((old) => [...old, e.word, ","])
                          }
                        >
                          Save
                        </button>
                      </li>
                    );
                  })}
                </ul>
              );
            })
          ) : (
            <ul>
              {res.map((item, key) => {
                return (
                  <li key={item + key}>
                    <span>{item.word}</span>
                    <button
                      className="btn btn-outline-success"
                      onClick={() =>
                        setsaved((old) => [...old, item.word, ","])
                      }
                    >
                      Save
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </output>
      </div>
    </Fragment>
  );
}

function groupBy(objects, property) {
  // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
  // value for property (obj[property])
  if (typeof property !== "function") {
    const propName = property;
    property = (obj) => obj[propName];
  }

  const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
  for (const object of objects) {
    const groupName = property(object);
    //Make sure that the group exists
    if (!groupedObjects.has(groupName)) {
      groupedObjects.set(groupName, []);
    }
    groupedObjects.get(groupName).push(object);
  }

  // Create an object with the results. Sort the keys so that they are in a sensible "order"
  const result = {};
  for (const key of Array.from(groupedObjects.keys()).sort()) {
    result[key] = groupedObjects.get(key);
  }
  return result;
}

export default Outputdata;
