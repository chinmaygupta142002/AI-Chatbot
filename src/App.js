import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this path matches your project structure

function App() {
  const [prompt, setPrompt] = React.useState("");
  const [prompts, setPrompts] = React.useState([]);

  function handleChange(event) {
    setPrompt(event.target.value);
  }

  function handleSubmit() {
    axios.post("http://localhost:5000/", { prompt: prompt }).then(
      result => {
        setPrompts(prevPrompts => [...prevPrompts, {prompt: prompt, reply: result.data}]);
      }
    );
  }

  // Log the updated prompts array whenever it changes
  useEffect(() => {
    console.log(prompts);
  }, [prompts]);

  return (
    <div className="chat-container">
      <div className="chat-bot">
        <div className="info-container">
          <h2>Chatbot</h2>
        </div>
        <div className="feed">
          {prompts.map((item, index) => (
            <div key={index}>
              <div className="bubble question">
                <strong>Prompt:</strong> {item.prompt}
              </div>
              <div className="bubble response">
                <strong>Reply:</strong> {item.reply}
              </div>
            </div>
          ))}
        </div>
        <textarea 
          placeholder="Message Chatbot" 
          onChange={handleChange} 
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
