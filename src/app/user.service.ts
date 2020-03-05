import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public gitUsersData: any;
  public gitUserDetails: any;

  constructor(private http: Http) {

  }

  // method to fetch Github users data from REST Api by http request
  getGithubUsersByName(searchName) {
    return new Promise(resolve => {
      this.http.get('https://api.github.com/search/users?q=' + searchName)
        .pipe(map(resp => resp.json()))
        .subscribe(tempdata => {
          this.gitUsersData = tempdata;
          resolve(this.gitUsersData);
        });
    });
  }

  // method to fetch Githb users data from REST Api by http request
  getGithubUserDetails(userTrueName) {
    return new Promise(resolve => {
      this.http.get('https://api.github.com/users/' + userTrueName + '/repos')
        .pipe(map(resp => resp.json()))
        .subscribe(tempdata => {
          this.gitUserDetails = tempdata;
          resolve(this.gitUserDetails);
        });
    });
  }

}
