
const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const GetUsers = {
    //for log-in users !
    getUser: async () => {
      try {
        const response = await fetch(`${apiKey}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          return responseData;
        }
        throw new Error(response.status.toString());
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default GetUsers;
  