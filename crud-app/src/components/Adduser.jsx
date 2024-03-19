import React from "react";
import { showToast, Toaster } from './Toaster';

const AddUser = ({ adduser }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const website = form.elements['website'].value;

    const newUser = {
      name: name,
      email: email,
      website: website
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      console.log('User added successfully:', data);
      adduser(data);

      showToast('User added successfully', 'success');
    } catch (error) {
      console.error('Error adding user:', error);
      showToast('Failed to add user', 'error');
    }
  };


  return (
    <>
      <h1 className="m-2 text-2xl font-bold">Add New User</h1>
      <form action="" className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="my-5 p-4 bg-slate-400 rounded-lg">
          <label htmlFor="name" className="block mb-4">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 mb-4"
              required // HTML5 required attribute for mandatory field
            />
          </label>
          <label htmlFor="email" className="block mb-4">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              required // HTML5 required attribute for mandatory field
            />
          </label>

          <label htmlFor="website" className="block mb-4">
            <span className="text-gray-700">Website:</span>
            <input
              type="text"
              id="website"
              name="website"
              placeholder="Enter website"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              required // HTML5 required attribute for mandatory field
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
