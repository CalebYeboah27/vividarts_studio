const form = document.querySelector("form");
const fileInput = document.getElementById("file-input");

async function imageUploadFunc(url, imageFile) {
  try {
    const formData = new FormData();
    formData.append("photo", imageFile);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    form.reset();
    fileInput.value = "";
    const currentURL = `${window.location.href.split("#")[0]}#about`;
    const galleryURL = `${window.location.href.split("#")[0]}gallery`;

    if (window.location.href != currentURL) {
      window.location.href = galleryURL;
    } else {
      window.location.href = galleryURL;
    }
    console.log("Image uploaded successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

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

async function deleteImage(url, Key) {
  try {
    // const formData = new FormData();
    // formData.append("photo", imageFile);
    // alert("Are you sure you want to delete this image?");
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Image deleted successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
