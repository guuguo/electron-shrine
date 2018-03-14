// Array.prototype.indexOf = (val) => {
//   for (let i = 0; i < this.length; i++) {
//     if (this[i] === val) return i;
//   }
//   return -1;
// };
Array.prototype.remove = (val) => {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  } else return this;
};
