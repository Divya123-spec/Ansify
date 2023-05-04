const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function tagArr(taglist) {
  let tags = [];
  if (taglist !== null && taglist !== undefined) {
    tags = taglist.split(",");
  }
  return tags;
}

export function convertJoinedDate(date) {
  let d = new Date(date);

  let year = d.getFullYear();
  let month = d.getMonth();
  return `${months[month]}, ${year}`;
}

export function convertDate(createdDt) {
  let createdDate = new Date(createdDt);
  let today = new Date();

  let difference = today.getTime() - createdDate.getTime();
  let hours = Math.floor(difference / (1000 * 60 * 60));
  difference -= hours * (1000 * 60 * 60);
  let mins = Math.floor(difference / (1000 * 60));
  difference -= mins * (1000 * 60);

  let days = Math.floor(hours / 24);
  let reminder = hours % 24;
  let hrs = Math.floor(reminder);
  // let min = Math.floor(60 * (reminder - hrs));

  if (days === 0) {
    if (hrs === 0) return `${mins} mins ago`;
    else return `${hrs} hrs ago`;
  } else {
    let timeset = calculateTimimg(days);
    return timeset.years !== 0
      ? `${timeset.years} Years ago`
      : timeset.months !== 0
      ? `${timeset.months} Months ago`
      : timeset.weeks !== 0
      ? `${timeset.weeks} Weeks ago`
      : `${timeset.days} Days ago`;
  }
}

const calculateTimimg = (d) => {
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (d) {
    if (d >= 365) {
      years++;
      d -= 365;
    } else if (d >= 30) {
      months++;
      d -= 30;
    } else if (d >= 7) {
      weeks++;
      d -= 7;
    } else {
      days++;
      d--;
    }
  }
  return {
    years,
    months,
    weeks,
    days,
  };
};
