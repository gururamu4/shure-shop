
export class AuthService {
  public isAuthenticated(): boolean {
    const token = (sessionStorage.getItem("currentuser"));
    console.log('auth',token)
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
}
