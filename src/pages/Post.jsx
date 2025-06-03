import React, { useEffect } from 'react'
import { useFetchStore } from '../store/useFetchStore'
import PostItem from '../components/PostItem'

function Post() {
  const post = useFetchStore((state) => state.post)
  const fetch = useFetchStore((state) => state.fetchData)
  useEffect(() => {
    fetch()
  }, [])
  return (
    <div>
      <p>Post Page:</p>
      <div className='flex flex-wrap justify-around gap-3'>
        {post.map(el => (
          <PostItem key={el.id} item={el} />
        ))}
      </div>
    </div>
  )
}

export default Post