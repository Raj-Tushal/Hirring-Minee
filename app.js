const callingJobsApi = async () => {
  // Fetch job data
  const jobsApi = await fetch(
    "https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=1000&pageNo=1&keyWord=&category"
  );
  const resJson = await jobsApi.json();
  const jobs = resJson.data;
  console.log(jobs);

  const input = document.querySelector("#jobInput").value.toLowerCase();

  const filteredJobs = jobs.filter((item) => {
    return item.designation.toLowerCase().includes(input);
  });

  const cardGroupContainer = document.querySelector("#cardsList");
  cardGroupContainer.innerHTML = ""; // Clear the container before appending new cards

  filteredJobs.forEach((item) => {
    console.log(item.views);

    const salaryDisplay =
      item.salaryCurrency && item.payRangeStart && item.payRangeEnd
        ? `${item.salaryCurrency.toUpperCase()} ${item.payRangeStart} - ${
            item.payRangeEnd
          }`
        : "No Salary Mentioned";

    const locationDisplay =
      item.city || item.country
        ? `${item.city}, ${item.country}`
        : "No Location Mentioned";

    // Create a new div element for each job card
    const jobCard = document.createElement("div");
    jobCard.classList.add(
      "w-[40%]",
      "h-1/2",
      "max-sm:w-4/5",
      "flex-col",
      "border",
      "border-gray-600"
    );

    jobCard.innerHTML = `
        <!-- upper -->
        <div class="w-full h-1/2 flex pt-5 px-5">
          <!-- upper left --> 
          <div class="h-full w-[50%] ">
            <p>${item.companyName || "Anonymous"}</p>
            <p class="font-bold">${item.designation}</p>
            <p class=" font-bold">${salaryDisplay}</p>
          </div>
          <!-- upper right -->
          <div class="h-full w-[50%]  flex justify-end items-start">
            <img src="./images/card-logo.png" alt="" class="h-1/3">
          </div>
        </div>
        <!-- lower -->
        <div class="w-full h-1/2   p-5 pt-14 pb-0 flex">
          <!-- lower left --> 
          <div class="h-full w-[50%] ">
            <p class="font-semibold">${locationDisplay}</p>
            <p class="font-semibold">${item.updatedAt.slice(0, 10)}</p>
          </div>
          <!-- lower right -->
          <div class="h-full w-[50%]  flex justify-end items-center">
            <p class="font-semibold">${item.views} views</p>
          </div>
        </div>
      `;

    // Append the job card to the container
    cardGroupContainer.appendChild(jobCard);
  });
};

const searchBtn = document.querySelector("#findJobsBtn");
searchBtn.addEventListener("click", callingJobsApi);
