// Delete.jsx
import { showToast } from "./Toaster";
const Delete= async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user with ID ${id}`);
      }
      console.log(`User with ID ${id} deleted successfully`);
      showToast("Deleted Sucessfuly!",)
      return id;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  
  export default Delete;
  