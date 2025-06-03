import { create } from "zustand"

export const useFetchStore = create((set)=>({
  post: [],
  fetchData: async () =>{
    try{
      const res = await fetch('http://localhost:8000/posts')
      const data = await res.json()
      set({post: data})
    }
    catch(error){
      console.log(error)
    }
  }
}))