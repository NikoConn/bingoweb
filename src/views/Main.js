import { generatePDF } from "../utils/CardboardGenerator";

function Main() {

    function onClick() {
        generatePDF();
    }

    return (
      <div>
        <button onClick={onClick}>generar cartones</button>
      </div>
    );
  }
  
  export default Main;
  