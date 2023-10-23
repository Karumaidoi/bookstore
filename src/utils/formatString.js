/* eslint-disable spaced-comment */
export function capitalizeString(str) {
  //1. Split the string using spaces [Alex, maina]
  // alex maina ==> Alex Maina
  const arrString = str.split(' ');
  //2.
  return arrString.map((word) => `${word.at(0).toUpperCase()}${word.slice(1).toLowerCase()}`).join(' ');
}

export function initials(str) {
  // Split the string
  const wordArr = str.trim().split(' ');

  if (wordArr.length === 1) return wordArr.at(0).split('').at(0).toUpperCase();

  // return the first el in the arr
  const newArray = wordArr.map((el) => el.at(0).toUpperCase());

  return `${newArray.at(0)}${newArray.slice(newArray.length - 1)}`;
}
