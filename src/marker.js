class Marker {
    constructor(coordX, coordY, address, review) {
        this.id = `${coordX}-${coordY}`;
        this.coordX = coordX;
        this.coordY = coordY;
        this.address = address,
        this.review = review;
    }
}

export default Marker;