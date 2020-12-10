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

export const remove = (userId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const update = (userId,token,user) =>{
    console.log("updating",user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
        method: "PUT",
        headers: {
            //"Accept": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const updateUser = (user,next) =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user = user
            localStorage.setItem("jwt",JSON.stringify(auth))
            next();
        }
    }
}