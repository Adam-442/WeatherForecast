export interface CitiesInterface {
    data: CityData[]
    metadata: CitySearchMetadata
  }
  
  export interface CityData {
    id?: number
    wikiDataId?: string
    type?: string
    city?: string
    name: string
    country: string
    countryCode: string
    region?: string
    regionCode?: string
    regionWdId?: string
    latitude: number
    longitude: number
    population?: number
  }
  
  export interface CitySearchMetadata {
    currentOffset: number
    totalCount: number
  }
  