export default function getDayIndices(data) {
  let dayIndices = [];
  dayIndices.push(0);

  let index = 0;
  let tmp = data.list[index].dt_txt.slice(8, 10);

  for (let i = 0; i < 3; i++) {
    while (
      tmp === data.list[index].dt_txt.slice(8, 10) ||
      data.list[index].dt_txt.slice(11, 13) !== "15"
    ) {
      index++;
    }
    dayIndices.push(index);
    tmp = data.list[index].dt_txt.slice(8, 10);
  }
  return dayIndices;
}
