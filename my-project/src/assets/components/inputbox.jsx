

export const InputBox = function ({placeholder, onChange}){
    return <div >
        <input onChange={onChange} className="rounded-md w-full p-4" placeholder={placeholder}></input>
    </div>
}

