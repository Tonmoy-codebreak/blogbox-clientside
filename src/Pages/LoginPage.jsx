import React from "react";
import { useAuth } from "../Auth/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signinUser, signWithGoogle, setUser } = useAuth();

  // googleSign in
  const handleGoogle = (e) => {
    e.preventDefault();
    signWithGoogle()
      .then((result) => {
        setUser(result.user);
        alert("Google Login Done");
        navigate("/");
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    // signing in user
    signinUser(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Swal.fire({
          title: "Welcome Back",
          icon: "success",
        });
        // ...
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          <button
            onClick={handleGoogle}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition mb-6"
          >
            <FcGoogle className="text-2xl mr-2" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 text-sm text-gray-500">
              or sign in with email
            </span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* ///////////////////////////////////////////////////////FORM */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-red-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
