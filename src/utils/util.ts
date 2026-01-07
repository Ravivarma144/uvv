const getImagePrefix = () => {
    return process.env.NODE_ENV === "production"
        ? ""
        : "";
};
const getAppPrefix = () => {
    return process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_APP_URL || ""
        : "http://localhost:3000/";
};

export { getImagePrefix, getAppPrefix };