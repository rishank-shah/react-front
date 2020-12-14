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