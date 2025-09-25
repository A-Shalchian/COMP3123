function capitalizeWords(str) {
  return str
    .split(" ") // split string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize first letter
    .join(" "); // join words back into a string
}

function max(a, b, c){
    return Math.max(a, b, c);
}

function right(str) {
    if (str.length < 3) return str; // if length < 3, return unchanged
    return str.slice(-3) + str.slice(0, str.length - 3);
}

function angle_Type(angle) {
    if (angle > 0 && angle < 90) return "Acute angle";
    if (angle === 90) return "Right angle";
    if (angle > 90 && angle < 180) return "Obtuse angle";
    if (angle === 180) return "Straight angle";
    return "Invalid angle";
}

// 01
const input = "the quick brown fox";
const result = capitalizeWords(input);
console.log(result);
// Output: "The Quick Brown Fox"

// 02
console.log(max (1,0,1)); // 1
console.log(max (0,-10,-20)); // 0
console.log(max (1000,510,440)); // 1000

// 03
console.log(right("Python"));     // honPyt
console.log(right("JavaScript")); // iptJavaScr
console.log(right("Hi")); // Hi

// 04
console.log(angle_Type(47));   // Acute angle
console.log(angle_Type(90));   // Right angle
console.log(angle_Type(145));  // Obtuse angle
console.log(angle_Type(180));  // Straight angle