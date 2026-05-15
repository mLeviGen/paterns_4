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


export class CryptoAPI {
    getExchange() { return { pair: "EUR/USD", value: 1.12 }; }
}

export class BankAPI {
    getCurrency() { return { code: "USD", price: 1.12 }; }
}


export class CryptoAdapter {
    constructor(cryptoApi) {
        this.api = cryptoApi;
    }
    getStandardRate() {
        const data = this.api.getExchange();
        return { currency: data.pair.split('/')[1], rate: data.value };
    }
}


export class BankAdapter {
    constructor(bankApi) {
        this.api = bankApi;
    }
    getStandardRate() {
        const data = this.api.getCurrency();
        return { currency: data.code, rate: data.price };
    }
}