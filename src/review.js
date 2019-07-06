class Review {
    constructor(coordX, coordY, address, placeName, text, date) {
        this.id = `${coordX}_${coordY}`,
        this.coords = [coordX, coordY];
        this.address = address,
        this.placeName = placeName
        this.text = text;
        this.date = date;
    }
}

export default Review;