export const capitalizeString = (str) => {
    if (typeof str !== "string" || str.length === 0) {
        return "";
    }
    const capitalizedLetter = str.charAt(0).toUpperCase();
    const restString = str.slice(1);
    const newString = capitalizedLetter + restString;
    return newString;
};
