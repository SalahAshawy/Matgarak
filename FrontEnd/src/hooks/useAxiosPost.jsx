import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from 'react';
import { clearAccessToken, clearUserInfo, setAccessToken, setLoginState, setNotUpdated, setUserInfo } from "../redux/action";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
export const usePostComment = (user,product)=>{
    const dispatch =useDispatch()
    const[data,setData]=useState([]);
    const [commentInput,setCommentInput] = useState("");
    const token = useSelector((state)=>state.token.accessToken)
    const postComment =async()=>{
        try {
            const response = await axios.post('https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/comments', {
                content:commentInput,
                user_id:user.id,
                product_id:product.id,
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "ngrok-skip-browser-warning": "69420",
                }
            }
            );
            setCommentInput("");
            setData(response.data);
            dispatch(setNotUpdated())
            console.log(data)
            console.log(response.data)
        }catch(error) {
            console.log(error);
        }
    }
    return {data,postComment,commentInput,setCommentInput,setData}
}
export const useLogin = () => {
    const dispatch = useDispatch();
    // State variables
    const [formData,setFormData] =useState({
        email:'',
        password: '',
    })

    const {email,password} = formData
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
 

   // Function to handle login
    const login = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/login', {
                email,
                password
            },
            {
                headers:{
                    "ngrok-skip-browser-warning": "69420",
                }
            });
            setFormData({email :'',password:''});
            setError(null);
            dispatch(setLoginState('loged'));
            dispatch(setAccessToken(response.data.access_token));
            dispatch(setUserInfo(JSON.stringify(response.data.user)));
            // navigate('/',{replace:true})
                    
        } catch (error) {
             if(error.message==="Request failed with status code 401"){

                 setError('Incorrect Email or Password')
                 setFormData({email :'',password:''});
             }
        } finally {
            setIsLoading(false);
        }
    };

    // Return values and functions to be used by components
    return {
        email,
        setFormData,
        password,
        error,
        isLoading,
        login,
        formData
    };
};
export const useLogout = (token) => {
    token = useSelector((state)=>state.token.accessToken)
    
      const navigate =useNavigate();  
      const dispatch = useDispatch();
      const handleLogout = async () => {
        console.log(token);
        try {
          const response = await axios.post(
            "https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/logout",
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );
          console.log(response.data);
          dispatch(setLoginState("notLoged"));
          dispatch(clearAccessToken());
          dispatch(clearUserInfo());
          navigate('/');
        } catch (error) {
          console.log(error.message);
        }
        console.log(localStorage.getItem("isLoged"));
       
      };
      return {
        handleLogout
      }
    };
export const useRegister = () => {
    const dispatch = useDispatch();
    // State variables
    const [formData,setFormData] =useState({
        email:'',
        password: '',
        confirmPassword:'',
        name:'',
        number:'',
    })

    const {email,password,confirmPassword,name,number} = formData
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate =useNavigate();

   // Function to handle login
    const register = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/register', {
                email,
                password,
                confirmPassword,
                name,
                number,
            },
            {
                headers:{
                    "ngrok-skip-browser-warning": "69420",   
                }
            });

            // Clear username and password fields
            setFormData({email :'',password:'',name:'',number:'',confirmPasword:''});
            setError(null);
            dispatch(setLoginState('loged'));
            dispatch(setAccessToken(response.data.access_token));
            dispatch(setUserInfo(JSON.stringify(response.data.user)));
            navigate('/',{replace:true})
                    
        } catch (error) {
            //Todo:modify...........
             if(error.message==="Request failed with status code 401"){
                 setError('Incorrect Email or Password')
                 setFormData({email :'',password:'',name:'',number:'',confirmPasword:''});
             }
        } finally {
            setIsLoading(false);
        }
    };

    // Return values and functions to be used by components
    return {
        email,
        setFormData,
        password,
        error,
        isLoading,
        register,
        formData,
        name,
        confirmPassword,
        number
    };
};


export const useDeleteComment=()=>{
    const dispatch =useDispatch();
    const token = useSelector((state)=>state.token.accessToken)
    const deletComment = async (id) =>{
        try {
            const response = await axios.delete(`https://6898-2c0f-fc89-127-1487-e540-4edd-8100-5650.ngrok-free.app/api/comments/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "ngrok-skip-browser-warning": "69420",
                }
            }
            );
            console.log(response.data)
            dispatch(setNotUpdated())
        }catch(error) {
            console.log(error);
        }

    }
    return{deletComment}
}

    
