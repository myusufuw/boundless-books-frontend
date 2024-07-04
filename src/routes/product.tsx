import { useLoaderData } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import Banner1 from "../assets/banner1.png"
import Banner2 from "../assets/banner2.jpg"
import Banner3 from "../assets/banner3.jpg"
import Banner4 from "../assets/banner4.jpg"
import Banner5 from "../assets/banner5.jpg"
import ProductCard from "../components/product-card"
import { Product as ProductType } from "../types/product"

export const loader = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
  const product: ProductType[] = await response.json()
  return product
}

export const Product = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  const listBanner = [Banner1, Banner2, Banner3, Banner4, Banner5]

  const sliderOptions = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  }

  return (
    <div>
      {/* BANNER */}
      <Slider {...sliderOptions}>
        {listBanner.map((banner, index) => (
          <div key={index}>
            <img src={banner} alt="banner" width="100%" />
          </div>
        ))}
      </Slider>

      {/* PRODUCT LIST */}
      <div className="grid gap-4 mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>
    </div>
  )
}
