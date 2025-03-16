import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numerics, setNumeric] = useState(true);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("")

  const passRef = useRef(null);

  const Generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz";

    if(numerics) str += "0123456789";
    if(chars) str += "!@#$%^&*().";

    for(let i = 1; i < length; i++) {
      let pick = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(pick);
    }
    setPassword(pass)
  }, [length, numerics, chars, setPassword]);

  const CopyToClipBoard = useCallback(() =>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,19);
    window.navigator.clipboard.writeText(password)
  }, [password]);

  useEffect(() => {
    Generator()
  },
  [length, numerics, chars, Generator]);

 return <>
  <div className="min-h-screen p-50">
    <div className="flex flex-col justify-center items-center bg-[#282828] rounded-2xl gap-5 p-5">
      <h1 className="text-5xl text-center font-bold font-mono text-white">Password Generator</h1>
          <div className="flex items-center bg-white rounded-2xl shadow-md mt-5">
            <input 
            type="text"
            value={password}
            placeholder="Password" 
            readOnly
            ref={passRef}
            className="bg-white font-mono text-black outline-none rounded-l-2xl pl-4 h-12 w-80"/>
            <button className="bg-cyan-600 text-white font-mono h-12 w-12 rounded-r-2xl pt-0.75 pb-0.75"
            onClick={CopyToClipBoard}>Copy</button>
          </div>

          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col">
              <input 
              type="range" 
              min={8} 
              max={18}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer mt-5"
              />
              <label className="font-mono text-white ml-5">Length: {length}</label>
            </div>

            <div>
              <input type="checkbox"
              id="numeric"
              defaultChecked={numerics}
              onChange={() => {
                setNumeric((prev) => !prev);
              }}
              className="cursor-pointer" />
              <label htmlFor="numeric" className="font-mono text-white"> Numbers</label>
            </div>
            <div>
              <input type="checkbox"
              id="char"
              defaultChecked={chars}
              onChange={() => {
                setChars((prev) => !prev);
              }}
              className="cursor-pointer" />
              <label htmlFor="char" className="font-mono text-white"> Characters</label>
            </div>
          </div>
    </div>
  </div>
 </>
}

export default App
