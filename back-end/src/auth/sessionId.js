
const sessionId=new Map();

function setSession(token, userData)
{
    sessionId.set(token,userData)
}
function getSession(token)
{
    return sessionId.get(token);
}

module.exports={
    setSession,getSession
}