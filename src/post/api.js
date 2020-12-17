export const create_post = (userId,token,post)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const list_post = ()=>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts`,{
        method: "GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const single_post = (postId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method: "GET"
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const post_by_userid = (userId,token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`,{
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

export const remove_post = (postId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
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


export const update_post = (postId,token,post)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}