import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Auth/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, signWithGoogle, setUser, setLoading, loading } = useAuth();
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
    <div>
      {/* Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogle}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
            disabled={loading}
          >
            <FcGoogle className="text-2xl mr-2" />
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 text-sm text-gray-500">
              or use your email
            </span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                name="photoURL"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {passwordError && (
                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
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
    </div>
  );
};

export default RegisterPage;
