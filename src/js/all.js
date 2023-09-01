const allVideoUrl = `https://openapi.programming-hero.com/api/videos/category/1000`;

const getVideoData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  const media = data.data;
  pushVideoCards(media);
};

const pushVideoCards = (array) => {
  const videoContainer = document.getElementById("video-container");
  const isVerified = [];
  array.forEach((element) => {
    const videoCard = document.createElement("div");
    videoCard.setAttribute("id", element.category_id);
    videoCard.classList = "card max-w-[312px] rounded-md";
    videoCard.innerHTML = `
      <figure class="rounded-md relative">
        <img class="w-[312px] h-[200px]" src="${element.thumbnail}" />
        <p class="absolute bg-[#171717] text-gray-100 rounded-md px-2 bottom-2 right-2">
          ${element.others.posted_date} ago
        </p>
      </figure>
      <div class="mt-3 flex gap-2">
        <img class="rounded-full w-10 h-10" src="${element.authors[0].profile_picture}" alt="" />
        <div class="text-left">
          <p class="font-bold">${element.title}</p>
          <p class="text-[#171717b3] font-normal text-sm my-2 flex items-center gap-2">
            ${element.authors[0].profile_name}
            <span>
              <img class="w-5 h-5 verified-img hidden" src="../assets/img/verified.png" alt="verified" />
            </span>
          </p>
          <p class="text-[#171717b3] font-normal text-sm">${element.others.views} views</p>
        </div>
      </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};
// console.log(element.authors[0].profile_name, isVerified);
  // const isVerified = element.authors[0].verified;
  // const verifiedImages = document.getElementsByClassName("verified-img");
  // console.log(verifiedImages);

// getVideoData(allVideoUrl);
