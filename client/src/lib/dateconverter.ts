type Props = {
  date?: string;
};

export function dateconverter({ date }: Props) {
  if (date) {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const months_words = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${months_words[Number(month)]} ${day}, ${year}`;
  }
}
