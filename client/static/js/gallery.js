document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const backBtn = document.querySelector(".back-btn");

  backBtn.addEventListener("click", function () {
    const indexURL = `${window.location.href.split("gallery")[0]}#about`;
    const galleryURL = `${window.location.href.split("#")[0]}`;

    if (window.location.href === galleryURL) {
      window.location.href = indexURL;
    }
  });

  const s3 = new AWS.S3();


  const processedImageBucket = "processed-images-vividarts-cy";
  // Function to fetch images from S3 bucket
  async function fetchImagesFromS3() {
    try {
      // Populate images in the gallery

      s3.listObjectsV2({ Bucket: processedImageBucket }, (err, data) => {
        if (err) {
          console.error("Error fetching data...", err);
        } else {
          // Iterate over data being returned to display images

          data.Contents.forEach((file) => {
            const extArr = [".jpg", ".png", ".jpeg"];
            for (const ext in extArr) {
              if (file.Key.endsWith(extArr[ext])) {
                const imageUrl = s3.getSignedUrl("getObject", {
                  Bucket: processedImageBucket,
                  Key: file.Key,
                });
                const image = document.createElement("img");
                image.src = imageUrl;
                gallery.appendChild(image);
              }
            }
          });
        }
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  // Call function to fetch images from S3 bucket
  fetchImagesFromS3();
});
