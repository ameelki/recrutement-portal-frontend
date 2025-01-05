export interface UserlistResponse {
  content:User[];
  totalElements:number;

}


export interface User{
  firstName:string;
  lastName:string;
  email:string;
  phone:string;
}
