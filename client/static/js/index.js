// async function uploadImage(url, imageFile) {
//   try {
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const responseData = await response.json();
//     console.log("Image uploaded successfully:", responseData);
//     return responseData;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error;
//   }
// }

// const imageUrl = "http://localhost:3000/api/v1/images"; // URL of your Node.js server endpoint
// const imageFile = document.querySelector('input[type="file"]').files[0]; // Assuming you have an input element for selecting the image file
// console.log(imageFile);
// uploadImage(imageUrl, imageFile)
//   .then((responseData) => {
//     // Handle response from server if needed
//     console.log(responseData);
//   })
//   .catch((error) => {
//     // Handle error
//     console.log(error);
//   });



async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("Data fetched successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  
  // const apiUrl = "http://localhost:3000/api/v1/images"; // Replace with your API endpoint URL
  // fetchData(apiUrl)
  //   .then((responseData) => {
  //     // Handle response data
  //     console.log(responseData);
  //   })
  //   .catch((error) => {
  //     // Handle error
  //   });
  