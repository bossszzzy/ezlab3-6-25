import * as Yup from "yup"

export const schema = Yup.object({
  name: Yup.string().required('Put your name'),
  post: Yup.string().required('Put your post'),
  image: Yup.string().url().required('Show some url')
})