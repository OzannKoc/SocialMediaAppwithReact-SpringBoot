import {useState, useEffect} from 'react'
import axios from "axios";
export const useApiProgress=(apiMethod,apiUrl,strictPath)=>{

    const [pendingApiCall,setPendingApiCall] = useState(false);
    useEffect(()=>{
        let requestInterceptors, responseInterceptors ;

        const checkForUpdate=(method,path,apiProgress)=>{
            if(method !==apiMethod){
                return;
            }
            if(strictPath && path===apiUrl){
                setPendingApiCall(apiProgress);
            }
            else if(!strictPath && path.startsWith(apiUrl)){
                setPendingApiCall(apiProgress);
            }
        }
        const registerInterceptors=()=>{
            requestInterceptors = axios.interceptors.request.use(request =>{
                const{method,url} =request;
            checkForUpdate(method,url,true);
                return request;
            });
    
           responseInterceptors = axios.interceptors.response.use(response=>{
               const {method,url}= response.config;
                checkForUpdate(method,url,false);
                return response;
            },
            error=>{
                const{method,url} = error.config;
                checkForUpdate(method,url,false);
                throw error;
            });
        }
        registerInterceptors();
        const unregisterInterceptor=()=>{
            axios.interceptors.request.eject(requestInterceptors);
            axios.interceptors.response.eject(responseInterceptors);
        }
        return ()=>{
            unregisterInterceptor();
        } 
    },[apiUrl,apiMethod,strictPath]);

    return pendingApiCall;
}




