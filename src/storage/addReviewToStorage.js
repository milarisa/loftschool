export default (reviewsMap) => {
    if (!reviewsMap)
        return;

    let savedData = [];

    for (var [key, value] of reviewsMap) {
        savedData.push({
            key: key,
            value: value
        });
    }
    
    localStorage.reviews = JSON.stringify(savedData);
}