
export class AuthService {
  public isAuthenticated(): boolean {
    const token = (localStorage.getItem("currentUser"));
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
}
