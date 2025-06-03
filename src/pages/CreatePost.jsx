import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { YupToErr } from "../validate/YupToErr"
import { schema } from "../validate/schema"

function CreatePost() {
  const post = {
    name: '',
    post: '',
    image: ''
  }
  const [formData,setformData] = useState(post)
  const [errObj,setErrObj] = useState({})
  const navi = useNavigate();
  const hdlChange =(e)=>{
    setformData({...formData, [e.target.id]: e.target.value})
  }

  const hdlSubmit = async (e) =>{
    e.preventDefault()
    try{
      await schema.validate(formData,{abortEarly: false})
      await fetch('http://localhost:8000/posts',{
        method: 'POST',
        body: JSON.stringify(formData)
      })
      navi("/post")
    }
    catch(error){
      const errObj = YupToErr(error);
      setErrObj(errObj)
    }
  }
  console.log(errObj)

  return (
    <div className='flex justify-center mt-5'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label" htmlFor='name'>Name:</label>
        <input id='name' type="text" className="input" placeholder="Your name ..." value={formData.name} onChange={hdlChange} />
        <p className="text-red-500 text-center">{errObj.name}</p>

        <label className="label" htmlFor='post'>Post:</label>
        <input id="post" type="text" className="input" placeholder="Post ..." value = {formData.post} onChange={hdlChange} />
        <p className="text-red-500 text-center">{errObj.post}</p>

        <label className="label" htmlFor='image'>Image:</label>
        <input id="image" type="text" className="input" placeholder="Image ..." value = {formData.image} onChange={hdlChange} />
        <p className="text-red-500 text-center">{errObj.image}</p>

        <button type="submit" className="btn btn-neutral mt-4" onClick={hdlSubmit}>Post!!</button>
      </fieldset>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  )
}

export default CreatePost