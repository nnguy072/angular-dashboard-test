import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
    this.checkAccount();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logout();
  }
}
