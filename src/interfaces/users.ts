export namespace UsersInterface {
  export interface UsersCompany {
    name: string;
    catchPhrase: string;
    bs: string;
  }

  export interface UsersAddressGeo {
    lat: string;
    lng: string;
  }

  export interface UsersAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: UsersAddressGeo;
  }

  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: UsersAddress;
    company: UsersCompany;
  }
}