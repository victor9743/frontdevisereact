import { useState, useEffect } from "react";
import RadioInput from "../layout/RadioInput";
import Processador from "../form/Processador";
import PlacaMae from "../form/PlacaMae";
function NewDevise() {
    
    const [processador, setProcessador] = useState()
    const [placaMae, setPlacaMae] = useState()
    
    return (
        <div>
            <h3>New</h3>
            
            <Processador processador={setProcessador} />

            {
                processador !== undefined ?
                <PlacaMae processador={processador} />
                :
                "dfgnsfd;gndfkgsdnfj"
            }
            
        </div>
    )
}

export default NewDevise