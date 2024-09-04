import { IoLogoAlipay } from "react-icons/io5";

//This will hold out helper function or method.
let userData = {};
if(localStorage.getItem("UserData")){
    userData = JSON.parse(localStorage.getItem("UserData"));
}

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
        if(data.token != null)
        {
            localStorage.setItem("Token", data.token);
            // localStorage.setItem("UserData", JSON.stringify(data.user));//Might need to comment out
        }
        console.log(data);
        return data;
    }

    const GetLoggedInUser = async (username) => {
       let result = await fetch(`http://localhost:5246/api/User/GetUserByUsername/${username}`)
       userData = await result.json();
       console.log(userData);
       localStorage.setItem("UserData", JSON.stringify(userData));
       userData = JSON.parse(localStorage.getItem("UserData"))
    }


    const LoggedInData = () => {
        if(!userData && localStorage.getItem("UserData"))
        {
            userData = JSON.parse.parse(localStorage.getItem("UserData"));
        }
        return userData;
    }


    //We need a function to add our blog items
    const AddBlogItems = async (blogItems) => {
        const result = await fetch('http://localhost:5246/api/Blog/AddBlogItems', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(blogItems)
        })
        if(!result.ok)
        {
            const message = `Yo you have a Error. ${result.status}`
            throw new Error(message);
        }
        let data = await result.json();
        console.log(data, "From our AddBlogItem method");
        return data;
    }


    //Can we make a generic function to handle
    const sendData = async (controller,endpoint,passedInData) =>  
    {
        const result = await fetch(`http://localhost:5246/api/${controller}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(passedInData)
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
    
    //function to help us get our blogitems
    const getBlogItems = async () => {
        let result = await fetch('http://localhost:5246/api/blog/GetBlogItems')
       let data = await result.json();
       console.log(data, "From our getBlogItem method");
       return data;
    }
    
    //create a function to hit our GetItemsByUserId
    const getItemsByUserId = async (UserId) => {
        let result = await fetch(`http://localhost:5246/api/blog/GetItemsByUserId/${UserId}`)
        let data = await result.json();
        console.log(data, "From our getBitemsbyuserid method");
        return data;
    }

export {checkToken, createAccount, login, GetLoggedInUser, LoggedInData, sendData, AddBlogItems, getBlogItems, getItemsByUserId};