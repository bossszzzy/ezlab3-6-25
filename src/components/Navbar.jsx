import {NavLink} from "react-router"

function Navbar() {
  const menu = [
    {id:1,name:'Home',path:'/'},
    {id:2,name:'Post',path:'/post'},
    {id:3,name:'Create Post', path:'createpost'}
  ]
  return (
    <div className="flex gap-3 h-15 bg-primary items-center">
      {menu.map((el)=>(
        <NavLink key = {el.id} to ={el.path} className='btn'>{el.name}</NavLink>
      ))}
    </div>
  )
}

export default Navbar