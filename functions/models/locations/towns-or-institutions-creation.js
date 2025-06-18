/* eslint-disable*/
import LocationCreation from './location-creation.js';
import SupportedTownOrInstitution from './supported-town-or-institution.js';
import LocationController from '../../controllers/location-controller.js';

class TownsOrInstitutionsCreation extends LocationCreation {
    constructor() {
        super();
        this.locationController = new LocationController();
    }

    async createSupportedTownsOrInstitutions() {
        const umlazi = new SupportedTownOrInstitution("1", "Umlazi", "1",);
        await this.locationController.createSupportedTownsOrInstitution(umlazi.toJson());
        const mut = new SupportedTownOrInstitution("1", "Mangosuthu (MUT)", "2",);
        await this.locationController.createSupportedTownsOrInstitution(mut.toJson());
        const dut = new SupportedTownOrInstitution("1", "DUT", "3");
        await this.locationController.createSupportedTownsOrInstitution(dut.toJson());
        const howard = new SupportedTownOrInstitution("1", "Howard College UKZN", "4");
        await this.locationController.createSupportedTownsOrInstitution(howard.toJson());
        const mayville = new SupportedTownOrInstitution("1", "Mayville", "5");
        await this.locationController.createSupportedTownsOrInstitution(mayville.toJson());
        const sydenham = new SupportedTownOrInstitution("1", "Sydenham", "6");
        await this.locationController.createSupportedTownsOrInstitution(sydenham.toJson());
        const durbanCentral = new SupportedTownOrInstitution("1", "Durban Central", "7");
        await this.locationController.createSupportedTownsOrInstitution(durbanCentral.toJson());

    }
}

export default TownsOrInstitutionsCreation