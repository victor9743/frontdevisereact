import { useState, useEffect } from "react";
import RadioInput from "../layout/RadioInput";
import SelectMemory from "../layout/SelectMemory";
function NewDevise() {
    
    // fetch
    const [processadores, setProcessadores] = useState([])
    const [placasMae, setPlacasMae] = useState([])
    const [memoriasRam, setMemoriasRam] = useState([])
    const [placasVideo, setPlacasVideo] = useState([])

    // variveis de atribuição
    const [processador, setProcessador] = useState([])
    const [placaMae, setPlacaMae] = useState([])
    const [totalMemoria, setTotalMemoria] = useState(0)
    const [placaVideo, setPlacaVideo] = useState([])
    const [slots, setSlots] = useState(0)
    const [salvarPedido, getSalvarPedido] = useState(false)

    //  array de memorias
    let memoriaArray = []
    
    let memoriasList = []

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
        setMemoriasRam([])
    
    }
    
    function getPlacaMae(e) {
        setPlacaMae(e.target.value)

        getAllMemoriaRam(e.target.value)
    }

    function getAllPlacaMae(processador) {
        setPlacasMae([])
        memoriasList = []
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
            setMemoriasRam(data)
        })
        .catch((err)=> { console.log(err) })
    }
    
    function somaMemoriaFunction(e) {
        let somaArray = []
        let chave = e.target.name
        var soma = 0;
        if (e.target.checked) {
            memoriaArray[chave] = parseInt(e.target.value)
        }

        for(let memoria in memoriaArray) {
            somaArray.push(memoriaArray[memoria])
        }

        
        for(var i = 0; i < somaArray.length; i++) {
            soma += somaArray[i];
        }

        if (soma > 0) {
            getAllPlacasVideo()
        }    
    }

    function forSlots() {

        for(let i=0; i<slots; i++) {      
            
            memoriasList.push(
                memoriasRam.map((memoria ,key) =>
                    <div key={key}>
                        <div> Slot: {i+1}</div>
                        {memoria.tamanho.map((m, key) =>
                            <div key={key}>
                                <RadioInput
                                    name={`slotMemoria${i + 1}`}
                                    text={`${m} GB`}
                                    value={m}
                                    funcao={somaMemoriaFunction}
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

    function getAllPlacasVideo() {


        fetch('http://localhost:3000/placasVideo'
        ,{
            method: 'GET',
            headers: {
                'Content-Type' : 'Application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            setPlacasVideo(data)
        })
        .catch((err)=> { console.log(err) })
    }

    function getPlacaVideo(e) {
        setPlacaVideo(e.target.value)
    
        getSalvarPedido(true)
    
    }

    function enviarPedido() {
        console.log('fim')
    }

    return (
        <div>
            <h3>Cadastrar pedido</h3>
            
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

            {placasVideo.length > 0 && placasVideo.map((p, key) => 
                <RadioInput
                    name="placaVideo"
                    value={p.id}
                    text={p.Produto}
                    funcao={getPlacaVideo}
                    key={key}
                />
            )}
            {salvarPedido &&
                <div>
                    <button className="btn btn-success" onClick={enviarPedido}>Salvar pedido</button>
                </div>
            }
            
        </div>
    )
}

export default NewDevise