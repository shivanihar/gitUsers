import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  inputName: string = '';
  totalUserCount: number;
  userDataSet: any;
  userDataItems: any = [];
  userDetails: any = [];
  selectedSort: string = 'NameAlphabeticallyAZ';

  filteredItems: any = [];
  pages: number;
  pageSize: number = 3;
  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;
  pageStart: number = 1;

  constructor(private userService: UserService) {
    // default call for varun on initialization
    this.userService.getGithubUsersByName('varun')
      .then(responseData => {
        this.userDataSet = responseData;
        this.totalUserCount = this.userDataSet.total_count;
        this.userDataItems = this.userDataSet.items;
        this.filteredItems = this.userDataItems;
        // Call pagination function for updated list
        this.initPagination();
      });
  }

  // Search by name method - if name empty then default otherwise by name
  searchByName() {
    if (this.inputName) {
      this.userService.getGithubUsersByName(this.inputName)
        .then(responseData => {
          this.userDataSet = responseData;
          this.totalUserCount = this.userDataSet.total_count;
          this.userDataItems = this.userDataSet.items;
          this.filteredItems = this.userDataItems;
          this.initPagination();
        });
    } else {
      // default search by varun
      this.userService.getGithubUsersByName('varun')
        .then(responseData => {
          this.userDataSet = responseData;
          this.totalUserCount = this.userDataSet.total_count;
          this.userDataItems = this.userDataSet.items;
          this.filteredItems = this.userDataItems;
          this.initPagination();
        });
    }

  }

  // Get full details method
  getUserFullDetails(userTrueName, id) {
    this.userService.getGithubUserDetails(userTrueName)
      .then(responseData => {
        this.userDetails = responseData;
      });
  }

  // Sorting method for dropdown select
  SortingResult() {
    if (this.selectedSort === 'NameAlphabeticallyAZ') {
      this.userDataItems.sort();
    } else if (this.selectedSort === 'NameReverseAlphabeticallyZA') {
      this.userDataItems.reverse();
    } else if (this.selectedSort === 'RankUp') {
      this.userDataItems.sort((a, b) => {
        return a.score < b.score;
      });
    } else if (this.selectedSort === 'RankDown') {
      this.userDataItems.sort((a, b) => {
        return a.score > b.score;
      });
    }

  }

  // Pagination methods
  initPagination() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = this.filteredItems.length / this.pageSize;

    this.pageNumber = parseInt('' + (this.filteredItems.length / this.pageSize));

    if (this.filteredItems.length % this.pageSize !== 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    console.log('this.pageNumber :  ' + this.pageNumber);
  }

  fillArray(): any {
    const obj = new Array();
    for (let index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }

  refreshItems() {
    this.userDataItems = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }

  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }

  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }
    this.refreshItems();
  }

  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

}
