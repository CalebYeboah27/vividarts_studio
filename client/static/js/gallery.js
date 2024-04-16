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

  // Function to fetch images from api
  async function fetchImagesFromS3() {
    try {
      // Populate images in the gallery

      const apiUrl = "https://vividarts-api.onrender.com/api/v1/images";
      // const apiUrl = "http://localhost:3000/api/v1/images";
      const { data } = await fetchData(apiUrl);

      data.forEach(({ Key, signedUrl }) => {
        const image = document.createElement("img");
        // const alt = Key.split(".jpg")[0];
        image.src = signedUrl;
        image.alt = Key;
        image.setAttribute("class", "image");
        gallery.appendChild(image);
      });
      const images = document.getElementsByTagName("img");
      console.log(images);

      Array.from(images).forEach((img) => {
        img.addEventListener("mouseover", () => {
          console.log("mouse over");
          img.classList.add("image");
          console.log(img);
        });

        img.addEventListener("click", () => {
          // console.log("mouse click", img.alt);
          const Key = img.alt;
          const delApiURL = `https://vividarts-api.onrender.com/api/v1/images${Key}`
          console.log(delApiURL);
          deleteImage(delApiURL, Key);
        });
      });

      // s3.listObjectsV2({ Bucket: processedImageBucket }, (err, data) => {
      //   if (err) {
      //     console.error("Error fetching data...", err);
      //   } else {
      //     // Iterate over data being returned to display images

      //     data.Contents.forEach((file) => {
      //       const extArr = [".jpg", ".png", ".jpeg"];
      //       for (const ext in extArr) {
      //         if (file.Key.endsWith(extArr[ext])) {
      //           const imageUrl = s3.getSignedUrl("getObject", {
      //             Bucket: processedImageBucket,
      //             Key: file.Key,
      //           });
      //           const image = document.createElement("img");
      //           image.src = imageUrl;
      //           gallery.appendChild(image);
      //         }
      //       }
      //     });
      //   }
      // });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  // Call function to fetch images from S3 bucket
  fetchImagesFromS3();
});
