
export class AuthService {
  public isAuthenticated(): boolean {
    const token = (localStorage.getItem("currentUser"));
    console.log('auth',token)
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
}
