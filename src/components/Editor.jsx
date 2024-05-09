import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

// Languages
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';

// Themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';

// Keybinding
import 'ace-builds/src-noconflict/keybinding-vim';

const prompt2 = `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
`;

const ProblemEditor = (props) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hadError, setHadError] = useState(null);
  const [tabSize, setTabSize] = useState(2);
  const [keyboardMode, setKeyboardMode] = useState("normal");
  const [theme, setTheme] = useState("monokai");
  const [hidePrompt, setHidePrompt] = useState(false);

  const [prompt, setPrompt] = useState(prompt2);
  const [title, setTitle] = useState("1. Two Sum");

  console.log(props);

  useEffect(() => {
    setTitle(props.ranked.question.Title);
    setPrompt(props.ranked.question.Description);
  }, []);

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

      let extension = "";
      if(language === 'java') {
        extension = "java";
      } else if(language === 'python') {
        extension = "py";
      } else if(language === 'c_cpp') {
        extension = "cpp";
      } else {
        extension = "js";
      }

      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: extension, code }),
        method: "POST",
      };

      const url = "http://localhost:8081/run";
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOutput(data.output || "No output");
      setHadError(data.error);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmitCode = () => {
    console.log("Submitting code...");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div style={{ display: 'flex', color: "white", height: "94.2vh" }}>
        <div style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
          <h1 style={{fontSize: "30px"}}>{title}</h1>

          <div style={{ position: 'relative', padding: '1rem', borderRadius: '5px', color: "white", backgroundColor: "bg-gray-700", border: "1px solid bg-gray-200" }}>
            <pre style={{ padding: '1rem', borderRadius: '5px', color: "white", overflow: 'auto' }}>
              <span onClick={() => setHidePrompt(!hidePrompt)} style={{ cursor: 'pointer', fontSize: "20px", position: 'absolute', right: '10px', top: '10px' }}>
                {hidePrompt ? '▼' : '▲'}
              </span>
              <p style={{fontSize: "17px", whiteSpace: "pre-wrap"}}>
                {!hidePrompt && prompt}
              </p>
            </pre>
          </div>

          <div className="mt-4">
            <pre className="bg-gray-700 border-gray-200 whitespace-normal overflow-auto" style={{ padding: '1rem', fontWeight: "bold", borderRadius: '5px', color: hadError ? "#DC143C" : "lightblue" }}>
              <h2 className="text-xl">Output { hadError === true ? 
                <span style={{color: "red"}}>failed</span> : hadError === false ? <span style={{color: "lightgreen"}}>success</span> : "" }</h2>
              {output}
            </pre>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Code Editor</h2>
            <div className="flex-grow flex justify-end">

              <button onClick={() => setKeyboardMode(keyboardMode === "normal" ? "vim" : keyboardMode === "vim" ? "normal" : "normal")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" style={{marginBottom: "10px"}}>{ keyboardMode === "vim" ? "NORMAL" : "VIM MODE" }</button>

              <select value={tabSize} onChange={(e) => setTabSize(parseInt(e.target.value))} style={{marginBottom: "10px"}} className="border border-gray-800 bg-blue-500 rounded-md p-2 cursor-pointer ml-2">
                <option value="1">1 TAB</option>
                <option value="2">2 TABS</option>
                <option value="3">3 TABS</option>
                <option value="4">4 TABS</option>
              </select>

              <select value={language} onChange={handleLanguageChange}style={{marginBottom: "10px"}} className="border border-gray-800 bg-blue-500 rounded-md p-2 cursor-pointer ml-2">
                <option value="javascript">JAVASCRIPT</option>
                <option value="python">PYTHON</option>
                <option value="java">JAVA</option>
                <option value="c_cpp">C++</option>
              </select>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{marginBottom: "10px"}}className="border border-gray-800 bg-blue-500 rounded-md p-2 cursor-pointer ml-2">
                <option value="monokai">MONOKAI</option>
                <option value="github">GITHUB</option>
                <option value="dracula">DRACULA</option>
                <option value="solarized_dark">SOLARIZED DARK</option>
                <option value="solarized_light">SOLARIZED LIGHT</option>
                <option value="twilight">TWILIGHT</option>
                <option value="xcode">XCODE</option>
              </select>
            </div>
          </div>
          {
            keyboardMode === "vim" ? 
              <AceEditor
                mode={language}
                theme={theme}
                onChange={handleCodeChange}
                name="codeEditor"
                editorProps={{ $blockScrolling: true }}
                value={code}
                style={{ width: '100%', height: '90%' }}
                fontSize={20}
                tabSize={tabSize}
                wrapEnabled={true}
                keyboardHandler={keyboardMode}
              /> :
              <AceEditor
                mode={language}
                theme={theme}
                onChange={handleCodeChange}
                name="codeEditor"
                editorProps={{ $blockScrolling: true }}
                value={code}
                style={{ width: '100%', height: '90%' }}
                fontSize={20}
                tabSize={tabSize}
                wrapEnabled={true} />
          }

          <div className="flex justify-between items-center mt-2">
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
