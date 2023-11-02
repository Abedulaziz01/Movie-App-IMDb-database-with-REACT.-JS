import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
 
  const {id}  = useParams();
  console.log(id)
  const [movie , setMovie] = useState({})
  const[isloading, setLoading] = useState(true)
  const [error,serError] = useState({show:false,msg:''})
     
const fetcMovies =async(url)=>{
  const response =  await fetch(url)
  const data =  await response.json();
  console.log(data)
  if(data.Response === 'False'){
    serError({show:true ,msg:data.Error})
    setLoading(false)

  }else {
    setMovie(data)
    setLoading(false)
  }

  }
  useEffect(()=>{
    fetcMovies(`${API_ENDPOINT}&i=${id}`)
  },[id])

 const { Poster:poster , Title:title , Plot:plot, Year:year} = movie
   return(
    <section className='single-movie'>
      <img src = {poster} alt = {title}/>
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>  
      </div>
    <Link to ='/' className='btn'>
      back to movies 
    </Link>
    </section>
   )

}

export default SingleMovie
