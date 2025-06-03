import { BrowserRouter,Routes, Route } from "react-router"
import Layout from "../components/Layout"
import Post from "../pages/Post"
import Home from "../pages/Home"
import CreatePost from "../pages/CreatePost"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/post" element={<Post />}/>
          <Route path="/createpost" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter