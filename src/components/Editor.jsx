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

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log(newCode);
  };

  const handleLanguageChange = (event) => {
    if(event.target.value === 'java') {
      setCode(`public class Main {
    public static void main(String[] args) {

    }
}`);
    }
    setLanguage(event.target.value);

  };

  const handleRunCode = () => {
    // Logic to run the code goes here
    console.log("Running code...");
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
        </div>
        <div style={{ flex: 1, padding: '1rem'  }}>
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
              Run
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
