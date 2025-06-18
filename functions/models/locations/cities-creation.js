/* eslint-disable*/
import LocationCreation from './location-creation.js';
import SupportedCity from './supported-city.js';
import LocationController from '../../controllers/location-controller.js';

class CitiesCreation extends LocationCreation {

    constructor() {
        super();
        this.locationController = new LocationController();
    }

    async createSupportedCities() {

        const durban = new SupportedCity("1", "Durban", "1",);
        await this.locationController.createSupportedCity(durban.toJson())
    }
}

export default CitiesCreation