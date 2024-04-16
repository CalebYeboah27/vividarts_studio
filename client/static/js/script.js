const accessKeyId = "";
const secretAccessKey = "";
const region = "us-west-2";
const bucketName = "raw-images-vividarts-cy";

// Configure AWS SDK
AWS.config.update({
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
  region,
});

const s3 = new AWS.S3();

const uploadBtn = document.getElementById("btn");

uploadBtn.addEventListener("click", uploadImage);

function uploadImage(e) {
  e.preventDefault();
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];
  console.log(file);

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      // const apiUrl = "http://localhost:3000/api/v1/images";
      const apiUrl = "https://vividarts-api.onrender.com/api/v1/images";
      imageUploadFunc(apiUrl, file)
        .then((responseData) => {
          // Handle response from server if needed
          console.log(responseData);
        })
        .catch((err) => {
          // Handle error
          console.error(err);
        });

      // const params = {
      //   Bucket: bucketName,
      //   Key: file.name,
      //   Body: file,
      //   ContentType: contentType,
      //   ACL: "public-read",
      // };

      // s3.upload(params, function (err, data) {
      //   if (err) {
      //     console.error("Error uploading image:", err);
      //     alert("Please select an image file.");
      //   } else {
      //     console.log("Image uploaded successfully. URL:", data, data.Location);
      //     // You can perform further actions with the uploaded image URL here
      //     // Reset the file input

      //     form.reset();
      //     fileInput.value = "";
      //     const currentURL = `${window.location.href.split("#")[0]}#about`;
      //     const galleryURL = `${window.location.href.split("#")[0]}gallery`;

      //     if (window.location.href != currentURL) {
      //       window.location.href = galleryURL;
      //     } else {
      //       window.location.href = galleryURL;
      //     }
      //   }
      // });
    };
  } else {
    console.error("No file selected.");
  }
}
