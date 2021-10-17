const BASIC_SET_PATH='/tasks/save';
const BASIC_GET_PATH='/tasks';

const sendJson=async (data,path)=>{
    await fetch(path, {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            "Content-Type":'application/json',
        }
    })
};

const getJson=async (path)=>{
        const res=await fetch(path);
        const data=await res.json();
       return  await JSON.parse(data);
}

export {
    getJson,
    sendJson,
    BASIC_SET_PATH,
    BASIC_GET_PATH
}