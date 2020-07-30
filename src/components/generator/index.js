import React, { useState, useEffect } from 'react';
import './index.css'

function Generator() {

  const [val, setVal] = useState(0)
  const [recentList, setRecentList] = useState([])
  const [recursive, setRecursive] = useState([])

  useEffect(() => {
    generateRUT(true)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    generateRUT(false)
    // eslint-disable-next-line
  }, [recursive])

  const handleRUT = (e) => {
    e.preventDefault();
    generateRUT(false)
  }

  const generateRUT = (isOnLoad) => {

    var rndArray = new Uint32Array(2);

    while (true) {
      window.crypto.getRandomValues(rndArray);
      var rndNumStr = (rndArray[0] * rndArray[1]).toString().substr(0, 11);
      if (parseInt(rndNumStr.substr(2, 6)) > 0 && parseInt(rndNumStr.substr(0, 2)) > 0 && parseInt(rndNumStr.substr(0, 2)) < 22) break;
    }

    var a = [];
    var i;

    for (i = 0; i < 11; i++) a[i] = parseInt(rndNumStr.charAt(i));

    a[8] = 0;
    a[9] = 0;

    var factor = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    var c = [];
    var obtainedResult = 0;

    for (i = 0; i < a.length; i++) {
      c[i] = a[i] * factor[i];
      obtainedResult += c[i];
    };

    var modEleven = obtainedResult % 11;
    var checkDigit = 11 - modEleven;
    var number = 0;
    var exponent;

    if (checkDigit < 10) {
      number = checkDigit;
      exponent = 11;
      for (i = 0; i < a.length - 1; i++) {
        number += a[i] * Math.pow(10, exponent);
        exponent -= 1;
      };
      number += a[a.length - 1] * 10;
    };

    if (checkDigit === 11) {
      exponent = 11;
      for (i = 0; i < a.length - 1; i++) {
        number += a[i] * Math.pow(10, exponent);
        exponent -= 1;
      };
      number += a[a.length - 1] * 10;
    };

    if (checkDigit === 10) {
      setRecursive(a)
      return
      // exponent = 10;
      // for (i = 0; i < a.length - 2; i++) {
      //   number += a[i] * Math.pow(10, exponent);
      //   exponent = exponent - 1;
      // };
      // number += a[a.length - 2] * 10 + a[a.length - 1];
    };

    if (!isOnLoad && val !== 0) {
      setRecentList(recentList => [(<li key={val}>{val}</li>), ...recentList])
    }

    setVal(number.toString())
  }

  return (
    <div className="App">
      <main>
        <h1>Gerador de RUT</h1>
        <form onSubmit={handleRUT}>
          <div className="content-left">
            <div className="input-block">
              <input
                type='text'
                name="rut"
                id="rut"
                value={val}
                placeholder="123456789012"
                contentEditable="false"
                readOnly={true}
              >
              </input>
            </div>
            <div className="recent-list">
              <ul>
                {recentList.length > 0 ? recentList : null}
              </ul>
            </div>
          </div>
          <div className="content-right">
            <button
              type='submit'>

              Gerar
            </button>
          </div>
        </form>


      </main>
      <footer></footer>
    </div>
  );
}

export default Generator;
