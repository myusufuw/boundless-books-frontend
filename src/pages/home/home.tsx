import { useLoaderData } from "react-router-dom"
import Banner from "../../assets/banner.png"
import loader from "./loader"

const Home = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>
  console.log(data)

  return (
    <div className="pt-[82px]">
      <div className="container mx-auto">
        {/* BANNER */}
        <img src={Banner} alt="banner" width="100%" />

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-4 gap-4 mt-3">
          {data.map((item) => (
            <div key={item.id} className="shadow">
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
