export default async (coords) => {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=1e4efade-d9ae-48e5-884f-633855421f88&format=json&geocode=${coords[1]},${coords[0]}`);
    const result = await response.json();
    
    const featureMember = result.response.GeoObjectCollection.featureMember;
    const address = featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address;
        
    return address;
}