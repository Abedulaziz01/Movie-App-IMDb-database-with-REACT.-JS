import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
console.log(API_ENDPOINT)
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
   
   const [isLoading, setLoading] = useState(true)
   const [error, setError] = useState({show:false,msg:'true'})
   const [movies,setMovie]= useState([])
   const [query,setQuery] = useState('batman')


   const fetchMovie = async (url)=>{
    setLoading(true);
       try {
           const response = await fetch(url);
           const data = await response.json();
         

       if(data.Response === 'True'){
        setMovie(data.Search)
        setError({show:false, msg:''})
       } else{
        setError({show:true, msg:data.Error})
       }


       } catch (error) {
        console.log(error)
       }


   }



  useEffect(()=>{
   fetchMovie(`${API_ENDPOINT}&s=${query}`)

  },[query])

   
  return <AppContext.Provider value={{isLoading,error,movies,query,setQuery}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
