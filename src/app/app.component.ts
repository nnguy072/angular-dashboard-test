import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { b2cPolicies } from './app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  loggedIn = false;
  subscriptions: Subscription[] = [];

  constructor(private broadcastService: BroadcastService, private authService: MsalService) { }

  ngOnInit() {
    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;

    this.checkAccount();

    // event listeners for authentication status
    loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {
      console.log('login succeeded. id token acquired at: ' + new Date().toString());
      console.log(success);

      // We need to reject id tokens that were not issued with the default sign-in policy.
      // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
      // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
      if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
        window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
        return this.authService.logout();
      }
  
      console.log('login succeeded. id token acquired at: ' + new Date().toString());
      console.log(success);

      this.checkAccount();
    });

    loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
      console.log('login failed');
      console.log(error);

      if (error.errorMessage) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          this.authService.loginRedirect(b2cPolicies.authorities.resetPassword);
        }
      }
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }
}
