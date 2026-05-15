export class LegacyLocationService {
    getRawCoordinates() {
        return [
            "48.8566, 2.3522",
            "59.8468, 155.6698",
            "148.8566, 202.3522"
        ];
    }
}

export class GeoAdapter {
    static transform(coordString) {
        const [lat, long] = coordString.split(',').map(s => parseFloat(s.trim()));
        const isLatValid = lat >= -90 && lat <= 90;
        const isLongValid = long >= -180 && long <= 180;

        return {
            latitude: isLatValid ? lat : "INVALID",
            longitude: isLongValid ? long : "INVALID"
        };
    }
}

export class CurrencyAdapter {
    static adapt(data) {
        if (data.pair && data.value) { 
            return { currency: data.pair.split('/')[1], rate: data.value };
        } 
        if (data.code && data.price) { 
            return { currency: data.code, rate: data.price };
        }
        return { currency: "UNKNOWN", rate: 0 };
    }
}