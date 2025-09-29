import "dotenv/config";
import { SERVER_ROUTES } from "../../../src/api/routes/serverRoutes.js";

export class ServerApi {
  static async fetchJsonData(item) {
    const itemUri = encodeURIComponent(item);
    const url = `${SERVER_ROUTES.DDRAGON.JSON_DATA}${itemUri}.json`;
  }

}
