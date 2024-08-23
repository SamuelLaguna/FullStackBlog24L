//This will hold out helper function or method.

//helper function to check our token
const checkToken = () => {
    let result = false;
    let isData = localStorage.getItem("Token");
    if(isData && isData != null)
    {
        result = true;
    }
    return result;
}

//helper function or method to createAccount, asnyc and await 
//fetch() json(), stringify()
const createAccount = async (createduser) => {
    const result = await fetch('http://localhost:5246/api/User/AddUsers', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(createduser)
    })
    if(!result.ok)
    {
        const message = `Yo you have a Error. ${result.status}`
        throw new Error(message);
    }
    let data = await result.json();
    console.log(data);
    
}

    const login = async (loginUser) => {
        const result = await fetch('http://localhost:5246/api/User/Login', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(loginUser)
        })
        if(!result.ok)
        {
            const message = `Yo you have a Error. ${result.status}`
            throw new Error(message);
        }
        let data = await result.json();
        console.log(data);
        return data;
    }

    const GetLoggedInUser = async (username) => {
       let result = await fetch(`'http://localhost:5246/api/User/GetUserByUsername/${username}'`)
       console.log(result)
    }

export {checkToken, createAccount, login, GetLoggedInUser};