import React, { useState, useEffect } from 'react';
import './index.css'

function Generator() {

  const [rut, setRut] = useState(null)
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const validateInput = () => {
      if (rut === null || rut.length === 0) return

      if (rut.length !== 12) {
        setIsValid(false)
      } else {
        setIsValid(true)
        validateRut()
      }
    }

    const validateRut = () => {
      let a = []
      let factor = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      let c = [];
      let obtainedResult = 0;
      let mod;

      for (let i = 0; i < 12; i++) a[i] = parseInt(rut.charAt(i));

      for (let i = 0; i < a.length; i++) {
        c[i] = a[i] * factor[i];
        obtainedResult += c[i];
      };

      mod = obtainedResult % 11

      console.log(mod)

      mod === 0 ? setIsValid(true) : setIsValid(false)
    }

    validateInput()
  }, [rut])

  const handleRUT = (e) => {
    e.preventDefault();
    setRut(e.target.rut.value)
  }

  return (
    <div className="App">
      <main>
        <h1>Validador de RUT</h1>
        <form onSubmit={handleRUT}>
          <div className="content-left">
            <div className="input-block">
              <input
                type='number'
                name="rut"
                id="rut"
                placeholder="Insira um RUT de 12 Caracteres..."
              >
              </input>
            </div>
          </div>
          <div className="content-right">
            <button
              type='submit'>
              Validar
            </button>
          </div>
        </form>
        {rut === null || rut.length === 0 || isValid === null
          ? null
          : isValid === true
            ? <div className="result"><p className="valid">RUT Válido</p></div>
            : <div className="result"><p className="invalid">RUT Inválido</p></div>
        }
      </main>
      <footer></footer>
    </div>
  );
}

export default Generator;