//This will hold out helper function or method.

//helper function to check our token
const checkToken = () => {
    let result = false;
    let isData = local.getItem("Token");
    if(isData && isData != null)
    {
        result = true;
    }
    return result;
}


export {checkToken };