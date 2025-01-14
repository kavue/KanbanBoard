import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile(): UserData | null {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<UserData>(token);
      } catch (err) {
        console.error('Error decoding token:', err);
        return null;
      }
    }
    return null;
  }

  loggedIn(): boolean {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    try {
      // Decode the token to access the exp field
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (decodedToken.exp) {
        // Check if the token has expired
        return decodedToken.exp * 1000 < Date.now();
      }
      return false;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  getToken(): string | null {
    // TODO: return the token
    try {
      const token = localStorage.getItem('id_token');
      if (!token || token.split('.').length !== 3) {
        return null; // Invalid token format
      }
      return token;
    } catch (err) {
      console.error('Error retrieving token from localStorage:', err);
      return null;
    }
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    try {
      console.log(idToken);
      localStorage.setItem('id_token', idToken);
      // Redirect to the homepage after login
      window.location.href = '/';
    } catch (err) {
      console.error('Login failed:', err);
    }
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    try {
      localStorage.removeItem('id_token');
      localStorage.removeItem('user_info');
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }
}

export default new AuthService();
