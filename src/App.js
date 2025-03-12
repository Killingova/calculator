import React, { useState } from "react";
import "./App.css";

function Taschenrechner() {
  const [anzeige, setAnzeige] = useState("0");
  const [ersterWert, setErsterWert] = useState(null);
  const [operator, setOperator] = useState(null);

  const nummerEingeben = (nummer) => {
    setAnzeige(anzeige === "0" ? String(nummer) : anzeige + nummer);
  };

  const dezimalEingeben = () => {
    if (!anzeige.includes(".")) setAnzeige(anzeige + ".");
  };

  const operatorSetzen = (op) => {
    setErsterWert(parseFloat(anzeige));
    setOperator(op);
    setAnzeige("0");
  };

  const berechnen = () => {
    if (operator && ersterWert !== null) {
      const zweiterWert = parseFloat(anzeige);
      let ergebnis = ersterWert;

      switch (operator) {
        case "+": ergebnis = ersterWert + zweiterWert; break;
        case "-": ergebnis = ersterWert - zweiterWert; break;
        case "×": ergebnis = ersterWert * zweiterWert; break;
        case "÷":
          if (zweiterWert === 0) {
            alert("Division durch 0 ist nicht möglich!");
            return;
          }
          ergebnis = ersterWert / zweiterWert;
          break;
        case "%":
          ergebnis = (ersterWert * zweiterWert) / 100;
          break;
        default: break;
      }

      setAnzeige(String(ergebnis));
      setErsterWert(ergebnis);
      setOperator(null);
    }
  };

  const prozentRechnen = () => {
    setAnzeige(String(parseFloat(anzeige) / 100));
  };

  const letzteZifferLöschen = () => {
    setAnzeige(anzeige.length === 1 ? "0" : anzeige.slice(0, -1));
  };

  const allesLöschen = () => {
    setAnzeige("0");
    setErsterWert(null);
    setOperator(null);
  };

  return (
    <div className="taschenrechner">
      <h1>Rechner</h1>
      <div className="anzeige">{anzeige}</div>
      <div className="tasten">
        <button onClick={allesLöschen} className="taste spezial">AC</button>
        <button onClick={letzteZifferLöschen} className="taste spezial">⌫</button>
        <button onClick={() => operatorSetzen("÷")} className="taste operator">÷</button>
        <button onClick={() => operatorSetzen("×")} className="taste operator">×</button>
        <button onClick={() => nummerEingeben("7")} className="taste">7</button>
        <button onClick={() => nummerEingeben("8")} className="taste">8</button>
        <button onClick={() => nummerEingeben("9")} className="taste">9</button>
        <button onClick={() => operatorSetzen("-")} className="taste operator">−</button>
        <button onClick={() => nummerEingeben("4")} className="taste">4</button>
        <button onClick={() => nummerEingeben("5")} className="taste">5</button>
        <button onClick={() => nummerEingeben("6")} className="taste">6</button>
        <button onClick={() => operatorSetzen("+")} className="taste operator">+</button>
        <button onClick={() => nummerEingeben("1")} className="taste">1</button>
        <button onClick={() => nummerEingeben("2")} className="taste">2</button>
        <button onClick={() => nummerEingeben("3")} className="taste">3</button>
        <button onClick={berechnen} className="taste gleich">=</button>
        <button onClick={() => nummerEingeben("0")} className="taste null">0</button>
        <button onClick={dezimalEingeben} className="taste">.</button>
        <button onClick={prozentRechnen} className="taste prozent">%</button>
      </div>
    </div>
  );
}

export default Taschenrechner;
