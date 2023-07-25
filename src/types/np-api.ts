type NpBaseResponse<T> = {
  success: boolean;
  data: T;
  errors: [];
  warnings: [];
  info: [];
  messageCodes: [];
  errorCodes: [];
  warningCodes: [];
  infoCodes: [];
};

type Delivery = {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
};

type LimitationsOnDimensions = {
  Width: number;
  Height: number;
  Length: number;
};

export type NpGetSettlementsResponseAddress = {
  Present: string;
  Warehouses: number;
  MainDescription: string;
  Area: string;
  Region: string;
  SettlementTypeCode: string;
  Ref: string;
  DeliveryCity: string;
  AddressDeliveryAllowed: boolean;
  StreetsAvailability: boolean;
  ParentRegionTypes: string;
  ParentRegionCode: string;
  RegionTypes: string;
  RegionTypesCode: string;
};

export type NpGetSettlementsResponseData = {
  TotalCount: string;
  Addresses: NpGetSettlementsResponseAddress[];
  Warehouses: string;
  MainDescription: string;
  Area: string;
  Region: string;
  SettlementTypeCode: string;
  Ref: string;
  DeliveryCity: string;
};
export type NpGetWarehousesResponseData = {
  SiteKey: string;
  Description: string;
  DescriptionRu: string;
  ShortAddress: string;
  ShortAddressRu: string;
  Phone: string;
  TypeOfWarehouse: string;
  Ref: string;
  Number: string;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  SettlementRef: string;
  SettlementDescription: string;
  SettlementAreaDescription: string;
  SettlementRegionsDescription: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Longitude: string;
  Latitude: string;
  PostFinance: string;
  BicycleParking: string;
  PaymentAccess: string;
  POSTerminal: string;
  InternationalShipping: string;
  SelfServiceWorkplacesCount: string;
  TotalMaxWeightAllowed: string;
  PlaceMaxWeightAllowed: string;
  SendingLimitationsOnDimensions: LimitationsOnDimensions;
  ReceivingLimitationsOnDimensions: LimitationsOnDimensions;
  Reception: Delivery;
  Delivery: Delivery;
  Schedule: Delivery;
  DistrictCode: string;
  WarehouseStatus: string;
  WarehouseStatusDate: string;
  CategoryOfWarehouse: string;
  RegionCity: string;
  WarehouseForAgent: string;
  MaxDeclaredCost: string;
  DenyToSelect: string;
  PostMachineType: string;
  PostalCodeUA: string;
  OnlyReceivingParcel: string;
  WarehouseIndex: string;
};

export type NpGetSettlementsResponse = NpBaseResponse<
  NpGetSettlementsResponseData[]
>;
export type NpGetWarehousesResponse = NpBaseResponse<
  NpGetWarehousesResponseData[]
>;
