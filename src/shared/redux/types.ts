export interface IUser {
    emailAddress: string;
    // username: string;
    role: string;
    rememberMe: boolean;
}
  
export interface IGenericResponse {
    status: string;
    message: string;
}
  