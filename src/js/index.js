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
  buttonElement.addEventListener("click", () => {
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
    const isVerified = element.authors[0].verified;
    if (isVerified === true) {
      verifiedElement = `<span><img class="w-5 h-5 verified-img" src="../assets/img/verified.png" alt="verified"/></span>`;
    } else {
      verifiedElement = "";
    }
    const videoCard = document.createElement("div");
    videoCard.setAttribute("id", element.category_id);
    videoCard.classList = "card max-w-[312px] rounded-md";
    const postedSeconds = element.others.posted_date;
    let time = "";
    if (postedSeconds <= 0 || postedSeconds.length > 5) {
      time = "";
    } else if (postedSeconds > 0 || postedSeconds.length < 5) {
      const postedHours = Math.floor(postedSeconds / 3600);
      const postedMinitue = Math.floor((postedSeconds % 3600) / 60);
      time = `${postedHours}hrs ${postedMinitue}min ago`;
    }
    videoCard.innerHTML = `
      <figure class="rounded-md relative">
        <img class="w-[312px] h-[200px]" src="${element.thumbnail}" />
        <p class="text-sm bg-opacity-60 absolute bg-black text-white rounded-md px-2 bottom-2 right-2">
          ${time}
        </p>
      </figure>
      <div class="mt-3 flex gap-2">
        <img class="rounded-full w-10 h-10" src="${element.authors[0].profile_picture}" alt="" />
        <div class="text-left">
          <p class="font-bold">${element.title}</p>
          <p class="text-[#171717b3] font-normal text-sm my-2 flex items-center gap-2">
            ${element.authors[0].profile_name} ${verifiedElement}</p>
          <p class="text-[#171717b3] font-normal text-sm">${element.others.views} views</p>
        </div>
      </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

const sortByView = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const media = data.data;
  media.sort((a, b) => {
    const first = parseFloat(a.others.views);
    const second = parseFloat(b.others.views);
    return second - first;
  });
  const notFoundDiv = document.getElementById("not-found");
  notFoundDiv.classList.remove("min-h-screen");
  notFoundDiv.textContent = "";
  pushVideoCards(media);
};

const sortBtn = document.getElementById("sort-btn");
sortBtn.addEventListener("click", function () {
  sortByView(1000);
});

getCatData();
fetchClearShowData(1000);
