import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useOutletContext } from "react-router";
import { useAuth } from "../Auth/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, signWithGoogle, setLoading, loading } = useAuth();
  const { isDark } = useOutletContext();
  const [passwordError, setPasswordError] = useState("");

  // Google Sign-In
  const handleGoogle = (e) => {
    e.preventDefault();
    setLoading(true);
    signWithGoogle()
      .then((result) => {
        const user = result.user;
        user.reload().then(() => {
          Swal.fire({
            icon: "success",
            title: "Logged in with Google!",
          });
          setLoading(false);
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
        setLoading(false);
      });
  };

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const password = data.password;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one number, and one special character."
      );
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    createUser(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.name,
          photoURL: data.photoURL,
        })
          .then(() => {
            Swal.fire({
              title: "Account created successfully",
              icon: "success",
              draggable: true,
            });
            setLoading(false);
            navigate("/");
          })
          .catch((error) => {
            console.error("Profile update failed:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        setLoading(false);
      });
  };

  return (
    <div
      className={`min-h-screen grid grid-cols-1 lg:grid-cols-12 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Left Side Image */}
      <div className="hidden lg:block lg:col-span-8">
        <img
          src="https://images.unsplash.com/photo-1612064189357-2b3b1c920b15?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div
        className={`flex items-center justify-center px-4 transition-colors duration-300 lg:col-span-4 ${
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
          <h2
            className={`text-2xl md:text-3xl font-bold text-center mb-6 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Create Your Account
          </h2>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogle}
            className={`flex items-center justify-center w-full border rounded-lg py-2 mb-6 transition-colors duration-300 ${
              isDark
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
            disabled={loading}
          >
            <FcGoogle className="text-2xl mr-2" />
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr
              className={`flex-1 ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            />
            <span
              className={`px-4 text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              or use your email
            </span>
            <hr
              className={`flex-1 ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"
                }`}
                required
              />
            </div>

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
                placeholder="example@email.com"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Photo URL
              </label>
              <input
                name="photoURL"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"
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
                placeholder="********"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 placeholder-gray-500 text-black focus:ring-blue-500"
                }`}
                required
              />
              {passwordError && (
                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-2 rounded-lg transition-colors duration-300 ${
                loading
                  ? "bg-blue-600 opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-blue-600 hover:bg-blue-800 text-white"
                  : "bg-blue-600 hover:bg-blue-800 text-white"
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p
            className={`mt-4 text-center text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-red-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Spinner */}
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            isDark ? "bg-gray-900/70" : "bg-white/70"
          }`}
        >
          <div
            className={`animate-spin h-10 w-10 border-4 border-t-transparent rounded-full ${
              isDark ? "border-blue-400" : "border-blue-600"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
