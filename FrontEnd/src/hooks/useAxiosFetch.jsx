import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useAxiosFetch = (url) => {
const token = useSelector((state)=>state.token.accessToken)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async()=>{
        try {
            const response = await axios.get(url,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }});
                console.log(response.data);
                 setData(response.data);
        } catch (error) {
            setError(error);
        }finally{
            setLoading(false)
        }
    }
    fetchData();
  }, [url]);

  return {loading,error,fetchedComments:data}
};

export default useAxiosFetch;
