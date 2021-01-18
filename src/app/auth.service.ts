import { Injectable } from '@angular/core';

/**
 * a. The login method will return true if provided the correct user and password pair.
 *    - Also when it is matched, its going to use LocalStorage to save the username. This will also serve as a flag to indicate whether or not there is an active logged user.
 *    - LocalStorage is a HTML5 key/value pair that allows us to persit information on the browser.
 * b. The logout method just clears the username value.
 * c. getUser method returns the username or is null
 * d. Isloggedin uses the getUser() to return true if we have a user.
 * e. Checks for the currently logged in user, log the user in, and log the userout. 
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  login(user: string, password: string): boolean { // (a)
    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  logout(): any { // (b)
    localStorage.removeItem('username');
  }

  getUser(): any { // (c)
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean { // (d)
    return this.getUser() !== null
  }

}
export const AUTH_PROVIDERS: Array<any>[ // (e)
  { provide: AuthService, useClass: AuthService }
]