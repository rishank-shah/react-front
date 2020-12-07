export const read_user_info = (userId,token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "applocation/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const list_users = () =>{
    return fetch(`${process.env.REACT_APP_API_URL}/users`,{
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}