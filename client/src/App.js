import Upload from "./components/Upload.js";
import Remove from "./components/Remove.js";
import FileList from "./components/FileList.js";

function App() {
  return (
    <div className="App">
      React is running!
      <Upload />
      <FileList />
      <Remove />
    </div>
  );
}

export default App;
