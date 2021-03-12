import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Account } from 'msal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  loggedIn = false;
  displayName: string = "";
  email: string = "";

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  checkAccount() {
    const account: Account = this.authService.getAccount();
    if (account === undefined || account === null) {
      this.loggedIn = false;
      this.displayName = "";
      this.email = "";
      return;
    }

    this.displayName = account.name;
    this.email = account.idTokenClaims[""];
  }

}
