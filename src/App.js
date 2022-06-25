import "./App.css";
import Papa from "papaparse";
import { useState } from "react";

function App() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.length === 0) {
          return;
        }
        setHeaders(Object.keys(results.data[0]));
        setRows(results.data);
      },
    });
  };

  return (
    <>
      <div className="App">
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
      </div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const entries = Object.entries(row);
            return (
              <tr key={index}>
                {entries.map(([key, value]) => (
                  <td key={key}>{value}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
