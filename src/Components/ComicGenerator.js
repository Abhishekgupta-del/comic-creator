import React, { useState } from 'react';
import './ComicGenerator.css'; // Create a CSS file for styling

const ComicGenerator = () => {
  const [panelInput, setPanelInput] = useState('');
  const [comicPanels, setComicPanels] = useState([]);

  const generateComic = async () => {
    try {
      // Make API call
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            "Accept": "image/png",
            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ "inputs": panelInput }),
        }
      );

      const result = await response.blob();
      setComicPanels([...comicPanels, result]);
      setPanelInput('');
    } catch (error) {
      console.error("Error generating comic:", error);
      alert("Failed to generate comic. Please try again.");
    }
  };

  return (
    <div className="comic-generator-container">
      <div className="left-panel" id="comicDisplay">
        {comicPanels.map((panel, index) => (
          <img
            key={index}
            src={URL.createObjectURL(panel)}
            alt={`Generated Comic ${index + 1}`}
            className="comicImage"
          />
        ))}
      </div>

      <div className="right-panel" id="comicContainer">
        <h1>Comic Generator</h1>
        <form>
          <label htmlFor="panel1">Enter Image Description:</label>
          <input
            type="text"
            id="panel1"
            name="panel1"
            value={panelInput}
            onChange={(e) => setPanelInput(e.target.value)}
            required
          />
          <button type="button" onClick={generateComic}>
            Generate Comic
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComicGenerator;
