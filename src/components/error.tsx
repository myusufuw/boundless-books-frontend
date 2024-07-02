const Error = () => {
  return (
    <div className="flex w-full h-[100vh] items-center justify-center bg-slate-200">
      <div className="p-4 shadow-md bg-white w-full max-w-[500px]">
        <p className="text-4xl text-black text-center mb-8 font-bold">
          Page Not Found (404)
        </p>
        <p className="text-xl text-slate-600 mb-4 text-center">
          We’re sorry, but the page you are looking for does not exist.
        </p>
        <p className="text-xl font-semibold mb-3">Possible reasons:</p>
        <ul className="text-slate-500">
          <li>🔹 The URL was mistyped.</li>
          <li>🔹 The page has been moved or deleted.</li>
          <li>🔹 The link you followed is broken.</li>
        </ul>
      </div>
    </div>
  )
}

export default Error
