import { useState, useEffect } from "react";
import RadioInput from "../layout/RadioInput";
function NewDevise() {
    const [processadores, setProcessadores] = useState([])

    const [processador, setProcessador] = useState()

    useEffect(()=>{
        fetch('http://localhost:3000/processadores',{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setProcessadores(data)
            
        })
        .catch((err)=> { console.log(err) })       
    },[])

    function getProcessador(e) {
        setProcessador(e.target.value)
    }
    
    return (

        <div>
            <h3>New</h3>
            { processadores.length > 0 && processadores.map((processador, key)=>
                <RadioInput
                    name="processador"
                    value={processador.id}
                    text={processador.produto}
                    funcao={getProcessador}
                    key={key}
                />
                )
            }
        </div>
    )
}

export default NewDevise