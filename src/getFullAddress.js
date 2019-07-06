export default (addressObjects) => {
    let components = addressObjects.Components;

    let street = '';
    let house = '';
    let city = '';
    let code = addressObjects.postal_code || '';

    components.forEach(item => {
        switch (item.kind) {
            case "street":
                street = item.name;
                break;
            case "house":
                house = item.name;
                break;
            case "locality":
                city = item.name;
                break;
        }
    });

    return `${street}, ${house}, ${city}, ${code}`;
}