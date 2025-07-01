import React, { useState } from "react";
import { useAuth } from "../Auth/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation, useOutletContext } from "react-router";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signinUser, signWithGoogle, setLoading, loading } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const { isDark } = useOutletContext();

  const isLoading = loading ?? localLoading;
  const setAppLoading = setLoading ?? setLocalLoading;

  const handleGoogle = (e) => {
    e.preventDefault();
    setAppLoading(true);
    signWithGoogle()
      .then((result) => {
        const user = result.user;
        return user.reload().then(() => {
          Swal.fire({
            icon: "success",
            title: "Logged in with Google!",
          });
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Google login error:", error);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      })
      .finally(() => setAppLoading(false));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setAppLoading(true);
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    signinUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          title: "Welcome Back",
          icon: "success",
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })
      .finally(() => setAppLoading(false));
  };

  return (
    <div
      className={`min-h-screen grid grid-cols-1 lg:grid-cols-12 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Spinner Overlay */}
      {isLoading && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDark ? "bg-gray-900/70" : "bg-white/70"
          }`}
        >
          <div
            className={`animate-spin h-10 w-10 border-4 rounded-full border-t-transparent ${
              isDark ? "border-blue-400" : "border-blue-600"
            }`}
          ></div>
        </div>
      )}

      {/* Left Image */}
      <div className="hidden lg:block lg:col-span-8">
        <img
          src="https://images.unsplash.com/photo-1689421754955-d1595ea47d2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Login Form */}
      <div
        className={`flex items-center justify-center px-4 lg:col-span-4 transition-colors duration-300 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className={`w-full max-w-md p-8 rounded-xl shadow-md transition-colors duration-300 ${
            isDark
              ? "bg-gray-800 shadow-gray-700"
              : "bg-white shadow-gray-300"
          }`}
        >
          <h2 className={`text-3xl font-bold text-center mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
            Welcome Back
          </h2>

          <button
            onClick={handleGoogle}
            disabled={isLoading}
            className={`flex items-center justify-center w-full border rounded-lg py-2 mb-6 transition-colors duration-300 ${
              isDark
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FcGoogle className="text-2xl mr-2" />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <hr
              className={`flex-1 ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            />
            <span className={`px-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              or sign in with email
            </span>
            <hr
              className={`flex-1 ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            />
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="example@email.com"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400"
                    : "bg-blue-50 border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"
                }`}
              />
            </div>

            <div>
              <label
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="********"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400"
                    : "bg-blue-50 border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-2 rounded-lg transition-colors duration-300 ${
                isLoading
                  ? "bg-blue-500 opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p
            className={`mt-4 text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
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
