import { useState, useCallback,useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [Numbers, setNumbers] = useState(false);
  const [Characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("black");
   const passwordRef = useRef(null);
 

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (Numbers) str += "0123456789";
    if (Characters) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, Numbers, Characters, setPassword]);

  const copyPassword =useCallback(()=>{
    window.navigator.clipboard.writeText(password);
     passwordRef.current.select();
  },[password])

  const handleColorChange = (newColor) => {
    console.log(newColor); // Add this line for debugging
    setColor(newColor);
  };


  useEffect(() => {
    PasswordGenerator();
  }, [length, Numbers, Characters, PasswordGenerator ]);

  return (
    <>
    <div className="w-full h-screen relative flex justify-center" style={{backgroundColor:color}} >
      <div className=" max-w-md  shadow-md shadow-white rounded-lg px-4 py-10 text-orange-500 absolute top-20 border-2 border-black" >
        <h1 className="text-4xl text-center text-white m-5">
          Passsword Generator
        </h1>

        <div className="flex  rounded-lg mb-4  mx-3 ">
          <input
            className="outline-none w-full py-1 px-3"
            type="text"
            name={password}
            id=""
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="outline-none bg-red-400 text-white py-0.5 px-3" onClick={copyPassword} >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
            <label> Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={Numbers}
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={Characters}
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
        
      </div>
      <div className="h-20 fixed w-full bg-slate-400 bottom-12">
        <div className="flex justify-center ">
          <button className="outline-none bg-blue-600 text-white rounded px-5 py-2 mt-5 mx-2" onClick={()=>{setColor("blue")}}>Blue</button>
          <button className="outline-none bg-green-600 text-white rounded px-5 py-2 mt-5 mx-2" onClick={()=>{setColor("green")}}>Green</button>
          <button className="outline-none bg-orange-600 text-white rounded px-5 py-2 mt-5 mx-2" onClick={()=>setColor("orange")}>Orange</button>
          <button className="outline-none bg-yellow-600 text-white rounded px-5 py-2 mt-5 mx-2" onClick={()=>
            handleColorChange("yellow")
          }>Yellow</button>
          
        </div>
        </div>
        </div>
    </>
  );
}

export default App;
