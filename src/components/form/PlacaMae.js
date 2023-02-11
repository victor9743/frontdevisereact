import { useEffect, useState } from "react"
function PlacaMae({processador}){
    const [placasMae, setPlacasMae] = useState()
    console.log(processador)
    useEffect(()=>{
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
            console.log(data)
        })
        .catch((err)=> { console.log(err) })       
    },[])
    return(
        <div>
            <h2>Placa</h2>
        </div>
    )
}

export default PlacaMae