export const Signout =  (next) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next()
        return fetch("http://localhost:8080/signout",{
            method:"GET"
        })
        .then((res)=>res.json())
        .catch(err=>console.log(err))
    }
}

export default Signout;