const Footer = () => {
  const getYear = new Date().getFullYear()
  return (
    <footer className="w-full mt-10 border-t-2 p-4">
      <div className="container mx-auto flex justify-center items-center">
        &copy; {getYear} Boundless Books
      </div>
    </footer>
  )
}

export default Footer
