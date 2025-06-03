import { useState } from "react"
import { schema } from "../validate/schema"
import { YupToErr } from "../validate/YupToErr"

function PostItem({ item }) {
  const [isEdit, setIsEdit] = useState(false)
  const [dataEdit,setDataEdit] = useState({
    name: item.name,
    post: item.post,
    image: item.image
  })
  const [error,setError] = useState({})

  const hdlChange =(e)=>{
    setDataEdit({...dataEdit, [e.target.name]:e.target.value})
  }

  const hdlSave = async (item) =>{
    try{
      await schema.validate(dataEdit,{abortEarly:false})
      await fetch(`http://localhost:8000/posts/${item.id}`,{
        method: "PATCH",
        body: JSON.stringify(dataEdit)
      })
      setIsEdit(false)
    }
    catch(error){
      const objErr = YupToErr(error)
      setError(objErr)
    }
  }

  const hdlDelete = async(item) =>{
    let check = prompt('do you want to delete?')
    if(check === 'sure' || check === 'ok' || check === 'yes'){
      await fetch(`http://localhost:8000/posts/${item.id}`,{
        method: 'DELETE'
      })
    }
  }
  return (
    <div className="card bg-base-100 w-96 shadow-sm p-2">
      <figure>
        <img
          src={item.image}
          alt={item.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>{item.post}</p>
        <div className="card-actions justify-around">
          {!isEdit ? (
            <button className="btn btn-primary" onClick={() => setIsEdit(true)}>Edit</button>
          ) : (
            <button className="btn btn-primary" onClick={() => hdlSave(item)}>Save</button>
          )}
          <button className="btn btn-pimary" onClick={() => hdlDelete(item)}>Delete</button>
        </div>
        {isEdit && (
          <div>
              <label htmlFor={`${item.id}+${item.name}`}>Edit name: </label>
              <input type="text" name='name' id={`${item.id}+${item.name}`} value = {dataEdit.name} className="input" onChange={hdlChange}/>
              {error.name &&<p className="text-red-500">{error.name}</p>}

              <label htmlFor={`${item.id}+${item.post}`}>Edit post: </label>
              <input type="text" name='post' id={`${item.id}+${item.post}`} value = {dataEdit.post} className="input" onChange={hdlChange}/>
              {error.post &&<p className="text-red-500">{error.post}</p>}

              <label htmlFor={`${item.id}+${item.image}`}>Edit image: </label>
              <input type="text" name='image' id={`${item.id}+${item.image}`} value = {dataEdit.image} className="input" onChange={hdlChange}/>
              {error.image &&<p className="text-red-500">{error.image}</p>}      

          </div>
        )}
      </div>
    </div>
  )
}

export default PostItem