import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/common/models/user.model';
import { headers, rootURL } from '../../../assets/data/globals';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  async fetchData(path: string) {
    const uri = `${rootURL}/${path}`;
    return await (await fetch(uri)).json();
  }

  isValidUser = async (user: User): Promise<boolean> => {
    const users = await this.fetchData('users');
    const loginUser: User = users.find((x) => x.email === user.email);

    if (loginUser && loginUser.password === user.password) {
      localStorage.setItem('loggedUser', JSON.stringify(loginUser));
    }

    return loginUser.password === user.password;
  };

  isUserLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    return !!user;
  }

  signup = async (user: User): Promise<boolean> => {
    const users: User[] = await this.fetchData('users');
    let check: boolean = true;

    users.forEach((person) => {
      if (person.email == user.email) {
        check = false;
      }
    });

    if (check) {
      const data = user;
      await fetch(`${rootURL}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers,
      });
      return Promise.resolve(true);
    }

    return Promise.reject(false);
  };

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/authentication']);
  }

  async getUserInfo(): Promise<User> {
    let user = JSON.parse(localStorage.getItem('loggedUser'));

    const users: User[] = await this.fetchData('users');

    user = users.find((x) => x.email === user.email);
    return user;
  }

  async verifyPassword(password: string): Promise<boolean> {
    const user = await this.getUserInfo();
    return password == user.password;
  }

  async editUserInfo(user: User) {
    const data = user;
    await fetch(`${rootURL}/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    });
  }
}
