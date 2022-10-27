class AuthService {
  private key = 'create-vue';
  getToken() {
    return localStorage.getItem(this.key);
  }
  logout() {
    localStorage.removeItem(this.key);
  }
  setToken(token: string) {
    localStorage.setItem(this.key, token);
  }
}

export const auth = new AuthService();
