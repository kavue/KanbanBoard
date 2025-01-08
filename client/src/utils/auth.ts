import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile(): UserData {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      
      if (decodedToken?.exp && decodedToken?.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Token expired check failed:', error);
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    const currentUser = localStorage.getItem('id_token') || '';
    return currentUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    const userInfo = JSON.stringify(jwtDecode<UserData>(idToken));
    localStorage.setItem('user_info', userInfo);
    // TODO: redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_info');
    // TODO: redirect to the login page
  }
}

export default new AuthService();
