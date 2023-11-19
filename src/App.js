import "./App.css";
import { useReducer, useRef } from "react";

const init = {
  text: "",
  preview: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_text":
      return { ...state, text: action.payload, preview: action.payload };
    case "uppercase":
      return { ...state, preview: state.text.toUpperCase() };
    case "lowercase":
      return { ...state, preview: state.text.toLowerCase() };
    case "clear_text":
      return { ...state, text: "", preview: "" };
    case "copy":
      navigator.clipboard.writeText(state.preview);
      return state;
    case "remove_spaces":
      const newText = state.text.replace(/\s+/g, "").trim();
      return { ...state, text: newText, preview: newText };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, init);

  const value = useRef(null);

  const wordCount = state.text
    .split(/\s+/)
    .filter((word) => word !== " ").length;
  const characterCount = state.text.length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-center text-2xl font-bold">Text Utils</h1>
      <div className="m-5">
        <h1 className="font-semibold text-xl">Enter Your Text Here:</h1>
        <textarea
          cols="100"
          rows="5"
          className="border-2 p-4 border-black border-solid rounded-xl"
          ref={value}
          value={state.text}
          onChange={(e) =>
            dispatch({ type: "set_text", payload: e.target.value })
          }
        ></textarea>
      </div>
      <br />
      <div>
        <button
          className="bg-blue-400 m-2 px-3 py-2 rounded-lg text-white text-lg"
          onClick={() => dispatch({ type: "uppercase" })}
        >
          Convert Uppercase
        </button>
        <button
          className="bg-blue-400 m-2 px-3 py-2 rounded-lg text-white text-lg"
          onClick={() => dispatch({ type: "lowercase" })}
        >
          Convert Lowercase
        </button>
        <button
          className="bg-red-400 m-2 px-3 py-2 rounded-lg text-white text-lg"
          onClick={() => dispatch({ type: "clear_text" })}
        >
          Clear text
        </button>
        <button
          className="bg-green-400 m-2 px-3 py-2 rounded-lg text-white text-lg"
          onClick={() => dispatch({ type: "copy" })}
        >
          Copy to clipboard
        </button>
        <button
          className="bg-yellow-300 m-2 px-3 py-2 rounded-lg text-white text-lg"
          onClick={() => dispatch({ type: "remove_spaces" })}
        >
          Remove Extra spaces
        </button>
      </div>
      <div className="m-5">
        <h1 className="font-semibold text-xl ">Preview Document: </h1>
        <textarea
          cols="100"
          rows="5"
          value={state.preview}
          className="border-2 p-4 border-black border-solid rounded-xl"
        ></textarea>
      </div>
      <div className=" ">
        <h1 className="text-center text-4xl font-bold">Summary Of Your Text</h1>
        <p className="text-center text-xl font-semibold">
          Number of Characters: {characterCount}
        </p>
        <p className="text-center text-xl font-semibold">
          Number of Words: {wordCount}
        </p>
        <p className="text-center text-xl font-semibold">
          Reading Time: {readingTime}
        </p>
      </div>
    </div>
  );
}

export default App;
