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
import { cookies } from "../utilities/auth"

type SignInResponse = {
  message: string
  token: string
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const userData = {
    username: formData.get("username"),
    password: formData.get("password"),
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const signInResponse: SignInResponse = await response.json()

  if (response.status !== 200) {
    toast.error(signInResponse.message)
    return null
  } else {
    toast.success(signInResponse.message)

    const token = signInResponse.token

    cookies.set("token", token)

    return redirect("/")
  }
}

const schema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(5),
  })
  .required()

const SignIn = () => {
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
      <p className="text-4xl text-black mb-4 text-center font-bold">
        Welcome back!
      </p>
      <p className="text-gray-600 mb-1 text-center font-medium">
        Enter your credential to sign in.
      </p>
      <p className="text-gray-600 mb-[48px] text-center font-medium text-sm">
        We're glad to see you again!
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
        Sign In
      </button>

      <div className="mt-4 text-sm flex flex-row gap-1">
        <p>Don't have an account?</p>
        <Link className=" hover:underline text-blue-500" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </Form>
  )
}

export default SignIn
