export interface ApiResponse<T> {
  /** The HTTP status code from the API response */
  status: number;
  /** The HTTP status message from the API response */
  statusMessage: string;
  /** The response that was provided by the API */
  data: T;
}

export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character extends ResourceBase {
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}
export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: Character[] | string[];
}

export interface Info<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results?: T;
}
