import { useLoaderData } from "react-router-dom"

const Home = () => {
  const data = useLoaderData()
  console.log(data)

  return <div>home</div>
}

export default Home
