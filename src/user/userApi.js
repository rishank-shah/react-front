export const read_user_info = (userId,token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
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
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
        method: "PUT",
        headers: {
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

export const followApi = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unfollowApi = (userId, token, unfollowId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const findUser = (userId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/findUsers/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}