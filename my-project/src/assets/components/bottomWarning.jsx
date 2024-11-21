import {Link} from "react-router-dom"

export const BottomWarning = function({label,link,to}){
    return <div className="py-2 text-sm flex justify-center">
        <div className="text-lg">{label}</div>
        <Link className="text-lg pointer underline pl-1 cursor-pointer" to={to}>{link}</Link>
    </div>
}

