import { useEffect, useState } from "react"

function Quotes(){
    const url='https://dummyjson.com/quotes'
    //huoks
    const [quotes, setQuotes]=useState([])
    const [loading, setLoading]=useState(true)


    //crear funcion para consumir api
    const getData=()=>{
        return fetch(url)
        .then(res => res.json())
        .then(console.log)
    }

    useEffect(() => {
        getData()

    },[])
    
    return (
        <h1>Lista de Frases</h1>
    )
}
export default Quotes