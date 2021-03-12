// #region 1) B2C policies and user flows
/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
      signUpSignIn: 'B2C_1_SignUpIn',
      resetPassword: 'B2C_1_PasswordReset',
      editProfile: 'B2C_1_ProfileEdit'
  },
  authorities: {
      signUpSignIn: {
          authority: 'https://tenant.b2clogin.com/tenant.onmicrosoft.com/B2C_1_SignUpIn'
      },
      resetPassword: {
          authority: 'https://tenant.b2clogin.com/tenant.onmicrosoft.com/B2C_1_PasswordReset'
      },
      editProfile: {
          authority: 'https://tenant.b2clogin.com/tenant.onmicrosoft.com/B2C_1_ProfileEdit'
      }
  }
};
// #endregion