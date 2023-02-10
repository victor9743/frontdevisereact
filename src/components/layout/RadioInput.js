function RadioInput({name, value, text, funcao}) {
    return (
        <div className="form-check">
            <input className="form-check-input" type="radio" name={name} value={value} onChange={funcao}/>
            <label className="form-check-label">
                {text}
            </label>
        </div>
    )
}

export default RadioInput