import React from 'react';

const AddBlogs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    console.log(data); // Send this to backend via fetch/axios
  };

  return (
    <div className='w-11/12 md:w-9/12 mx-auto mt-10 font-main'>
      <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>Add New Blog</h1>

      <form onSubmit={handleSubmit} className='space-y-6 bg-white p-6 rounded-lg shadow-md'>

        {/* Blog Title */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>Blog Title</label>
          <input
            type='text'
            name='title'
            required
            placeholder='Enter blog title'
            className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        {/* Image URL */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>Image URL</label>
          <input
            type='text'
            name='image'
            required
            placeholder='https://example.com/image.jpg'
            className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>Category</label>
          <select
            name='category'
            defaultValue=""
            required
            className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            <option value='' disabled >Select category</option>
            <option value='technology'>Technology</option>
            <option value='lifestyle'>Lifestyle</option>
            <option value='travel'>Travel</option>
            <option value='health'>Health</option>
            <option value='education'>Education</option>
            <option value='business'>Business</option>
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>Short Description</label>
          <textarea
            name='shortDesc'
            rows={2}
            required
            placeholder='A quick summary of your blog...'
            className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          ></textarea>
        </div>

        {/* Long Description */}
        <div>
          <label className='block text-gray-700 font-medium mb-2'>Long Description</label>
          <textarea
            name='longDesc'
            rows={6}
            required
            placeholder='Write your full blog content here...'
            className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className='text-center'>
          <button
            type='submit'
            className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300'
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;
