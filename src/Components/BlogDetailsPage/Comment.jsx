import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../Auth/useAuth";
import { Link } from "react-router";

const Comment = ({ blogId, blogMail }) => {
  const axiosSecure = useAxios();
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/blogs/${blogId}`).then((res) => {
      setComments(res.data.comments || []);
    });
  }, [blogId, axiosSecure]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.comment.value.trim();

    if (!text) return Swal.fire("Comment can't be empty", "", "warning");

    const commentData = {
      name: user.displayName,
      photo: user.photoURL,
      text,
    };

    try {
      await axiosSecure.patch(`/blogs/comment/${blogId}`, commentData);
      Swal.fire("Comment added!", "", "success");
      setComments((prev) => [...prev, commentData]);
      e.target.reset();
    } catch (err) {
      Swal.fire("Failed to add comment", "", "error");
    }
  };


  return (
    <div className="">
      {blogMail === user.email ? (
        
        <>
          <Link
            to={`/blog/update/${blogId}`}
            className="btn bg-blue-600 text-white rounded-2xl my-10 p-5"
          >
            Update
          </Link>
          <h1 className="text-blue-700 font-main pb-10">You cannot comment on your own post. Thank you for sharing your thoughts!</h1>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 pb-10">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((cmt, index) => (
              <div key={index} className="flex gap-4 items-start border-b pb-4">
                <img
                  src={cmt.photo}
                  alt="pfp"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{cmt.name}</p>
                  <p className="text-gray-700">{cmt.text}</p>
                </div>
              </div>
            ))
          )}
          </div>
        </>
      ) : (
       
        <div className="space-y-4 mt-8">
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <label className="block text-gray-700 font-semibold">
              Leave a comment
            </label>
            <textarea
              name="comment"
              required
              rows={3}
              placeholder="Write your comment here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Submit Comment
            </button>
          </form>

          <h2 className="text-xl font-semibold text-gray-800 pt-10 pb-5">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((cmt, index) => (
              <div key={index} className="flex gap-4 items-start border-b pb-4">
                <img
                  src={cmt.photo}
                  alt="pfp"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{cmt.name}</p>
                  <p className="text-gray-700">{cmt.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
