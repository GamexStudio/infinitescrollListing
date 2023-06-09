import axios from 'axios';

const API_KEY = '70f81b5e'; 
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`
const get = async (endpoint: string, header: {} = {}) => {
  
    try {
  
      const response = await axios({
        method: 'get',
        url: endpoint,
        headers: {          
          'Cache-Control': 'no-cache,no-store',
          Pragma: 'no-cache',
          'Content-Type': 'application/json',
          ...header,
        },
      });      
      return response;
    } catch (error) {      
        return {
          networkError: JSON.stringify(error),
        };            
    }
  };
  

export const network = {
    getMovieList :async (page:any) => {        
        const response: any = await get(          
          `${API_URL}&s=movies&type=movie&page=${page}`
        );
        return response;
      }
}