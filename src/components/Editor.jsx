import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

const ProblemEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hadError, setHadError] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log(newCode);
  };

  const handleLanguageChange = (event) => {
    if(event.target.value === 'java') {
      setCode(`import java.util.*;
public class Main {
    public static void main(String[] args) {

    }
}`);
    }
    setLanguage(event.target.value);
  };

  const handleRunCode = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code }),
        method: "POST",
      };

      const url = "http://localhost:8081/run";
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOutput(data.output);
      setHadError(data.error);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmitCode = () => {
    // Logic to submit the code goes here
    console.log("Submitting code...");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div style={{ display: 'flex', color: "white", height: "94.2vh" }}>
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          <h2>Problem Description</h2>
          <p>
            Write a function that takes an integer (signed 32 bits) as input and returns the number of 1 bits it has.
          </p>
          <div className="mt-4">
            <h2 className="text-xl">Output { hadError === true ? <span style={{color: "red"}}>failed</span> : hadError === false ? <span style={{color: "lightgreen"}}>success</span> : "" }</h2>
            <pre className="bg-gray-700 border-gray-200" style={{ padding: '1rem', borderRadius: '5px', color: hadError ? "red" : "lightblue" }}>
              {output}
            </pre>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Code Editor</h2>
            <select value={language} onChange={handleLanguageChange} className="border border-gray-800 bg-blue-500 rounded-md p-2 cursor-pointer">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c_cpp">C++</option>
            </select>
          </div>
          <AceEditor
            mode={language}
            theme="monokai"
            onChange={handleCodeChange}
            name="codeEditor"
            editorProps={{ $blockScrolling: true }}
            value={code}
            style={{ width: '100%', height: '90%' }}
            fontSize={20}
          />
          <div className="flex justify-between items-center mt-4">
            <button onClick={handleRunCode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {loading ? "Running..." : "Run"}
            </button>
            <button onClick={handleSubmitCode} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
