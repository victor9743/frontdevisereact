import { useState, useEffect } from "react";
import RadioInput from "../layout/RadioInput";
function NewDevise() {
    
    // fetch
    const [processadores, setProcessadores] = useState([])
    const [placasMae, setPlacasMae] = useState([])
    const [memoriasRam, setMemoriasRam] = useState([])
    const [placasVideo, setPlacaVideo] = useState([])

    // variveis de atribuição

    const [processador, setProcessador] = useState([])
    const [placaMae, setPlacaMae] = useState([])
    const [memoriaRam, setMemoriaRam] =  useState([])

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
       
        getAllPlacaMae(e.target.value)
    
    }
    
    function getPlacaMae(e) {
        getPlacaMae(e.target.value)

        getMemoriaRam(e.target.value)
    }

    function getAllPlacaMae(processador) {
        setPlacasMae([])
        fetch('http://localhost:3000/placasMae?' + new URLSearchParams(
            {id: processador}
        ),{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setPlacasMae(data)
        })
        .catch((err)=> { console.log(err) })       

    }

    function getMemoriaRam(placaMae) {

    }
    
    function placaVideo() {

    }

    return (
        <div>
            <h3>New</h3>
            
            { processadores.length > 0 && processadores.map((p, key)=>
                <RadioInput
                    name="processador"
                    value={p.id}
                    text={p.produto}
                    funcao={(getProcessador)}
                    key={key}
                />
                )
            }

            { placasMae.length > 0 && placasMae.map((p, key)=>
                <RadioInput
                    name="placaMae"
                    value={p.id}
                    text={p.produto}
                    funcao={(getPlacaMae)}
                    key={key}
                />
                )
            }
            
        </div>
    )
}

export default NewDevise