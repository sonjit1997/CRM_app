import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export async function getAllusers(){
    return await axios.get(`${BASE_URL}/crm/api/v1/users`,
    {
        headers:{
            'x-access-token' : localStorage.getItem('token')
        }
    }
   
    )
};

export async function updateSelectteduserId(userId,data){
    return await axios.put(`${BASE_URL}/crm/api/v1/users/${userId}`,data,
    {
        headers:{
            'x-access-token': localStorage.getItem('token')
        }
    },
        {
           'userId': localStorage.getItem('userId')
        }
   
    )
}