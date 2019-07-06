class Review {
    constructor(coordX, coordY, address, name, place, text, date) {
        this.id = `${coordX}_${coordY}`;
        this.coords = [coordX, coordY];
        this.address = address;
        this.name = name;
        this.place = place;
        this.text = text;
        this.date = date;
    }
}

export default Review;