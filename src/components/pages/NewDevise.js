import { useState, useEffect } from "react";
import RadioInput from "../layout/RadioInput";
import SelectMemory from "../layout/SelectMemory";
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
    const [totalMemoria, setTotalMemoria] = useState(0)
    const [slots, setSlots] = useState(0)

    //  array de memorias
    let memoriaArray = []
    let somaMemoria = 0

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
        setPlacaMae(e.target.value)

        getAllMemoriaRam(e.target.value)
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

    function getAllMemoriaRam(placaMae) {
        setMemoriasRam([])

        for(let i=0; i<placasMae.length; i++) {
            if(placaMae == placasMae[i].id ) {
                setTotalMemoria(placasMae[i].totalMemoria)
                setSlots(placasMae[i].qtdSlots)
            }
        }

        fetch('http://localhost:3000/memorias?' + new URLSearchParams(
            {id: placaMae}
        ),{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            setMemoriasRam(data)
        })
        .catch((err)=> { console.log(err) })
    }
    
    function placaVideo() {
        let teste = document.getElementById("slot")

        console.log(teste)
        // console.log(e)
        // if (e.target.checked) {
            // memoriaArray.push(parseInt(e.target.value))
        // } else {
            // const index = memoriaArray.indexOf(parseInt(e.target.value));
    
            // memoriaArray.splice(index, 1);
        // }
        // console.log(memoriaArray)
        // somaMemoria = memoriaArray.reduce((partialSum, a) => partialSum + a, 0);
        
    }

    function forSlots() {
        let memoriasList = []

        for(let i=0; i<slots; i++) {      
            
            memoriasList.push(
                memoriasRam.map((memoria ,key) =>
                    <div key={key}>
                        {memoria.tamanho.map((m, key) =>
                            <div key={key}>
                                <SelectMemory
                                    text={`${m} GB`}
                                />
                            </div>
                            
                        )}

                    </div>           
                )
            )
        
        }
        return (
            <div>
                {memoriasList}
            </div>
        )

    }

    return (
        <div>
            <h3>New</h3>
            
            { processadores.length > 0 && processadores.map((p, key)=>
                <RadioInput
                    name="processador"
                    value={p.id}
                    text={p.produto}
                    funcao={getProcessador}
                    key={key}
                />
                )
            }

            { placasMae.length > 0 && placasMae.map((p, key)=>
                <RadioInput
                    name="placaMae"
                    value={p.id}
                    text={p.produto}
                    funcao={getPlacaMae}
                    key={key}
                />
                )
            }        

            { memoriasRam.length > 0 && forSlots() }
            
        </div>
    )
}

export default NewDevise