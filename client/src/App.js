import Upload from "./components/Upload.js";
import Remove from "./components/Remove.js";
import fileList from "./components/fileList.js";

function App() {
  return (
    <div className="App">
      React is running!
      <Upload />
      <fileList />
      <Remove />
    </div>
  );
}

export default App;
