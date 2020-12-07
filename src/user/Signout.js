export const Signout =  (next) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next()
        return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
            method:"GET"
        })
        .then((res)=>res.json())
        .catch(err=>console.log(err))
    }
}

export default Signout;