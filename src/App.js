import React, { useState } from "react";
import "./App.css";

function App() {
  // Display zeigt stets die aktuelle Eingabe oder das Ergebnis
  const [display, setDisplay] = useState("0");

  // Speichert die erste Zahl, Operator und den Zustand, ob wir gerade "auf die zweite Zahl warten"
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);

  // Beim Klick auf eine Ziffer
  const handleNumberClick = (digit) => {
    // Wenn display aktuell "0" ist, ersetzen wir es durch die neue Ziffer
    if (display === "0") {
      setDisplay(String(digit));
    } else {
      // Ansonsten hängen wir die Ziffer an
      setDisplay(display + digit);
    }
  };

  // Dezimalpunkt (.)
  const handleDecimal = () => {
    // Nur hinzufügen, wenn noch kein '.' existiert
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Operator-Klick (+, -, ×, ÷)
  const handleOperatorClick = (op) => {
    // Ersten Operanden merken (Zahl im Display)
    setFirstOperand(parseFloat(display));
    // Operator merken
    setOperator(op);
    // Display zurücksetzen, damit wir die zweite Zahl eingeben können
    setDisplay("0");
  };

  // Gleichheitszeichen "="
  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(display);
      let result = firstOperand;

      switch (operator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "×":
          result = firstOperand * secondOperand;
          break;
        case "÷":
          if (secondOperand === 0) {
            alert("Division durch 0 ist nicht möglich!");
            return;
          }
          result = firstOperand / secondOperand;
          break;
        default:
          break;
      }

      // Ergebnis im Display anzeigen
      setDisplay(String(result));
      // Ergebnis wird zum neuen firstOperand, sodass wir weiterrechnen können
      setFirstOperand(result);
      setOperator(null);
    }
  };

  // Backspace: letzte Ziffer löschen
  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      // Falls nur 1 Ziffer vorhanden ist oder "-Ziffer"
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // AC (All Clear): Alles zurücksetzen
  const handleAllClear = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <div className="display">{display}</div>

      <div className="buttons">
        {/* Erste Zeile */}
        <button onClick={handleAllClear} className="btn special">AC</button>
        <button onClick={handleBackspace} className="btn special">⌫</button>
        <button onClick={() => handleOperatorClick("÷")} className="btn operator">÷</button>
        <button onClick={() => handleOperatorClick("×")} className="btn operator">×</button>

        {/* Zweite Zeile */}
        <button onClick={() => handleNumberClick("7")} className="btn">7</button>
        <button onClick={() => handleNumberClick("8")} className="btn">8</button>
        <button onClick={() => handleNumberClick("9")} className="btn">9</button>
        <button onClick={() => handleOperatorClick("-")} className="btn operator">−</button>

        {/* Dritte Zeile */}
        <button onClick={() => handleNumberClick("4")} className="btn">4</button>
        <button onClick={() => handleNumberClick("5")} className="btn">5</button>
        <button onClick={() => handleNumberClick("6")} className="btn">6</button>
        <button onClick={() => handleOperatorClick("+")} className="btn operator">+</button>

        {/* Vierte Zeile */}
        <button onClick={() => handleNumberClick("1")} className="btn">1</button>
        <button onClick={() => handleNumberClick("2")} className="btn">2</button>
        <button onClick={() => handleNumberClick("3")} className="btn">3</button>
        <button onClick={handleEquals} className="btn equals">=</button>

        {/* Fünfte Zeile */}
        <button onClick={() => handleNumberClick("0")} className="btn zero">0</button>
        <button onClick={handleDecimal} className="btn">.</button>
      </div>
    </div>
  );
}

export default App;
