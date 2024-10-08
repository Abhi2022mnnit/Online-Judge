import axios from 'axios';

export const axiosInstance = axios.create({withCredentials : true});

const apiConnect = (method, url, body) => {

    return axiosInstance({
        method : `${method}`,
        url : `${url}`,
        data : body ? body : null
    })
}

export default apiConnect;

// try{
    //     await axios.post('http://localhost:4000/api/phase1/auth/signup',body)
    //     .then(
    //         res=>console.log(res.data.userdetails)
    //     )
    //     // console.log(output.Object);

    // }catch(error){
    //     console.log(error.message);
    // }