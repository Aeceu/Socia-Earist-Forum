type Props = {
  date?: string;
};

export function dateconverter({ date }: Props) {
  if (date) {
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

    return `${months_words[Number(date.split("-")[1])]} ${
      date.split("-")[2]
    }, ${date.split("-")[0]}`;
  }
}
