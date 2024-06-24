const loader = async () => {
  const result = await fetch("http://localhost:3000/products")
  const data = result.json()
  return data
}

export default loader
