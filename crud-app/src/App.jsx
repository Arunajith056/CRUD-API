import React, { useEffect, useState } from "react";
import "./App.css";
import Adduser from "./components/Adduser";
import Delete from "./components/Delete";
import EditableField from "./components/Editable";
import { Toaster, showToast } from "./components/Toaster";

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
// get the data 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

// Add the User 
  const adduser = (newuser) => {
    setUsers((users) => [...users, newuser]);
  };
// Delete the user 
  const deleteUserHandler = async (id) => {
    try {
      await Delete(id, setUsers);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
// update the user 
  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };

  const handleWebsiteChange = (id, newValue) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, website: newValue } : user
      )
    );
  };

  const handleEmailChange = (id, newValue) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, email: newValue } : user
      )
    );
  };
  const handleUpdate = async (id) => {
    try {
      // Fetch the original user data from the backend
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const originalUserData = await response.json();

      // Retrieve updated user data from state or wherever you store it
      const updatedUser = getUserById(id);

      // Check if any changes have been made
      const hasChanges =
        originalUserData.website !== updatedUser.website ||
        originalUserData.email !== updatedUser.email;

      if (!hasChanges) {
        console.log("No changes detected");
        showToast("No changes to save", "info");
        return; // Exit early if no changes
      }

      // Perform the update if changes are detected
      const updateResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update user");
      }

      // Update the UI with the updated user data
      // You can update your state here or trigger a refetch of user data

      showToast("User updated successfully", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showToast("Failed to update user", "error");
    }
  };

  return (
    <>
      <Toaster />
      <header className="text text-2xl text-blue-400 font-bold">
        API CRUD operation
      </header>

      <div className="bg-slate-900 rounded-md">
        <h3 className="my-3 p-2 text-red-500 font-bold">
          Get the Fake data from this API
          <span className="ml-2">
            <a
              href="https://jsonplaceholder.typicode.com/"
              target="_blank"
              className="text-yellow-300 px-2 py-2"
              rel="noreferrer"
            >
              Click me
            </a>
          </span>
        </h3>
        <p className="text-sm mb-2">Note: This is fake data try to change the value check the response but value not change in end point</p>
        <div className="overflow-x-auto p-2">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-red-200 text-slate-950">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">NAME</th>
                <th className="border px-4 py-2">EMAIL</th>
                <th className="border px-4 py-2">WEBSITE</th>
                <th className="border px-4 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">
                    <EditableField
                      initialValue={user.name}
                      onSave={(newValue) => handleNameChange(user.id, newValue)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <EditableField
                      initialValue={user.email}
                      onSave={(newValue) =>
                        handleEmailChange(user.id, newValue)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <EditableField
                      initialValue={user.website}
                      onSave={(newValue) =>
                        handleWebsiteChange(user.id, newValue)
                      }
                    />
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      className="bg-cyan-500 hover:border-black hover:bg-cyan-700"
                      onClick={() => handleUpdate(user.id)}
                    >
                      Update
                    </button>{" "}
                    <button
                      className="bg-red-400 hover:border-black hover:bg-red-500"
                      onClick={() => deleteUserHandler(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-6"></div>
      </div>
      <Adduser adduser={adduser} />
    </>
  );
}

export default App;
