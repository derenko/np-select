import {
  ApiConfig,
  NpGetSettlementsResponse,
  NpGetWarehousesResponse,
} from '@/types';

const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

type NpRequestConfig = {
  modelName: 'Address';
  calledMethod: 'searchSettlements' | 'getWarehouses';
  methodProperties: Record<string, unknown>;
};

class NpApi {
  private API_URL: string;

  constructor(private config: ApiConfig) {
    this.API_URL = API_URL;
  }

  async getNpCities(input: string) {
    try {
      const response = await fetch(
        this.API_URL,
        this.getConfig({
          modelName: 'Address',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: input,
            Limit: '30',
          },
        }),
      );

      const { data } = (await response.json()) as NpGetSettlementsResponse;

      return data[0].Addresses;
    } catch (e) {
      return [];
    }
  }

  async getNpWarehouses(city: string) {
    try {
      const response = await fetch(
        API_URL,
        this.getConfig({
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityName: city,
          },
        }),
      );

      const { data } = (await response.json()) as NpGetWarehousesResponse;

      return data;
    } catch (e) {
      return [];
    }
  }

  private getConfig(options: NpRequestConfig) {
    return {
      body: JSON.stringify({
        apiKey: this.config.apiKey,
        modelName: options.modelName,
        calledMethod: options.calledMethod,
        methodProperties: options.methodProperties,
      }),
      method: 'POST',
    };
  }
}

export default NpApi;
