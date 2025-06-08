import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Auth/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, signWithGoogle, setUser } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const password = data.password;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one number, and one special character."
      );
      setIsLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    // Register
    createUser(data.email, data.password)
      .then((userCredential) => {
        // Sign up
        const user = userCredential.user;
        updateProfile(user, { displayName: data.name, photoURL: data.photoURL })
          .then(() => user)
          .then((user) => {
            Swal.fire({
              title: "Account created successfully",
              icon: "success",
              draggable: true,
            });
            navigate("/");
            console.log(user);
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogle}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
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

          {/* Registration Form */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300  rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {passwordError && (
                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
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
