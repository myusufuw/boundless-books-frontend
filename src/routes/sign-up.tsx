import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useSubmit,
} from "react-router-dom"
import { toast } from "react-toastify"
import * as z from "zod"

type SignUpResponse = {
  message: string
  newUSer: {
    id: number
    username: string
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const signUpResponse: SignUpResponse = await response.json()

  if (response.status !== 200) {
    toast.error(signUpResponse.message)
    return null
  } else {
    toast.success(signUpResponse.message)

    return redirect("/sign-in")
  }
}

const schema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
  })
  .required()

const SignUp = () => {
  const submit = useSubmit()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  type FormData = z.infer<typeof schema>

  const onSubmit = (data: FormData) => {
    submit(data, {
      method: "post",
    })
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="w-full bg-white px-4 py-8 lg:p-0 max-w-[400px] lg:max-w-full shadow-lg lg:shadow-none rounded-md"
    >
      <p className="text-4xl text-black mb-4 text-center font-bold">Sign Up</p>
      <p className="text-gray-600 text-center mb-1 font-medium">
        Create your account to get started.
      </p>
      <p className="text-gray-600 mb-[48px] text-center font-medium text-sm">
        We're excited to have you on board!
      </p>

      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Username
        </label>
        <input
          type="text"
          {...register("username")}
          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-blue-500"
          placeholder="mark_z"
          required
        />
        {errors.username && (
          <span className="text-sm text-red-500 ml-2">
            {errors.username?.message}
          </span>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-blue-500"
          placeholder="mark@meta.com"
          required
        />
        {errors.email && (
          <span className="text-sm text-red-500 ml-2">
            {errors.email?.message}
          </span>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 focus:outline-blue-500"
          placeholder="Enter your password"
          required
        />
        {errors.password && (
          <span className="text-sm text-red-500 ml-2">
            {errors.password?.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign Up
      </button>

      <div className="mt-4 text-sm flex flex-row gap-1">
        <p>Already have an account?</p>
        <Link className=" hover:underline text-blue-500" to="/sign-in">
          Sign In
        </Link>
      </div>
    </Form>
  )
}

export default SignUp
