const getCatData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const media = data.data;
  pushCatButtons(media);
};

const pushCatButtons = (array) => {
  const vidContainer = document.getElementById("video-catagories");
  array.forEach((element) => {
    const catButton = document.createElement("button");
    catButton.setAttribute("id", `${element.category_id}`);
    catButton.classList = `btn bg-[#25252526] border-none outline-none min-h-0 h-10 rounded-md capitalize hover:bg-red-500 hover:text-white`;
    catButton.innerText = `${element.category}`;
    vidContainer.appendChild(catButton);
    catId = `${element.category_id}`;
    showData(catId);
  });
};

const showData = (id) => {
  const buttonElement = document.getElementById(id);
  buttonElement.addEventListener("click", (event) => {
    fetchClearShowData(id);
  });
};

const fetchClearShowData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const status = data.status;
  if (!status) {
    console.log(!status);
    const videoContainer = document.getElementById("video-container");
    videoContainer.textContent = "";
    const notFoundDiv = document.getElementById("not-found");
    notFoundDiv.classList =
      "min-h-screen flex flex-col justify-center items-center text-center";
    notFoundDiv.innerHTML = `
    <img src="../assets/img/icon.png" alt="not-found-icon" />
    <h2 class="font-bold text-3xl">
      Oops!!Sorry, There is no <br />
      content here
    </h2>
    `;
  } else {
    const notFoundDiv = document.getElementById("not-found");
    notFoundDiv.classList.remove("min-h-screen");
    notFoundDiv.textContent = "";
    const media = data.data;
    pushVideoCards(media);
  }
};

const pushVideoCards = (array) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent = "";
  array.forEach((element) => {
    console.log(element.authors[0].verified);
    let srcImage = "../assets/img/verified.png";
    if (element.authors[0].verified) {
      let srcImage = "../assets/img/verified.png";
    } else {
      let srcimage;
    }
    const videoCard = document.createElement("div");
    videoCard.setAttribute("id", element.category_id);
    videoCard.classList = "card max-w-[312px] rounded-md";
    const postedSeconds = element.others.posted_date;
    const postedHours = postedSeconds / 3600;

    // console.log(postedHours.toFixed(2));
    videoCard.innerHTML = `
      <figure class="rounded-md relative">
        <img class="w-[312px] h-[200px]" src="${element.thumbnail}" />
        <p class="absolute bg-[#171717] text-gray-100 rounded-md px-2 bottom-2 right-2">
          ${element.others.posted_date} ago
        </p>
      </figure>
      <div class="mt-3 flex gap-2">
        <img class="rounded-full w-10 h-10" src="${
          element.authors[0].profile_picture
        }" alt="" />
        <div class="text-left">
          <p class="font-bold">${element.title}</p>
          <p class="text-[#171717b3] font-normal text-sm my-2 flex items-center gap-2">
            ${element.authors[0].profile_name}
            <span>
              <img class="w-5 h-5 verified-img hidden" src="${
                element.authors[0].verified ? "../assets/img/verified.png" : ""
              }" alt="verified" />
            </span>
          </p>
          <p class="text-[#171717b3] font-normal text-sm">${
            element.others.views
          } views</p>
        </div>
      </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

getCatData();
fetchClearShowData(1000);
