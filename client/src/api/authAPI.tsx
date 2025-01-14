import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    // Make a POST request to the login route
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Send user credentials as JSON
    });
    console.log(response);
    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error('Failed to login');
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the data upon successful login
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch request or parsing
    console.error('Login error:', error);
    throw error; // Rethrow the error to allow it to be handled in the calling function
  }
};

export { login };
