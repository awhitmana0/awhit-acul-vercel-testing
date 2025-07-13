// src/lib/auth0-acul-js.js

// This is a shim/mock for the @auth0/auth0-acul-js SDK
// It provides placeholder classes and methods to allow local development
// when the full Auth0 Universal Login context is not available.

class BaseScreenProvider {
  constructor() {
    // Mimic the structure of the context object from Auth0
    // In a real Auth0 environment, this would be populated by Auth0's system.
    this.context = window.universal_login_context || {
      screen: {
        name: 'login-id',
        texts: {
          title: 'Welcome (Local Mock)',
          description: 'Login to continue (Local Mock)',
          emailPlaceholder: 'Enter your email (Local Mock)',
          buttonText: 'Continue (Local Mock)',
          footerText: "Don't have an account yet? (Local Mock)",
          footerLinkText: "Create your account (Local Mock)",
          forgottenPasswordText: "Forgot your Password? (Local Mock)",
        },
        data: {}, // Placeholder for data like pre-filled username
      },
      transaction: {
        isSignupEnabled: true,
        isForgotPasswordEnabled: true,
      },
      untrusted_data: {
        submittedFormData: {}
      }
      // Add other context properties as needed for your screens
    };

    this.screen = this.context.screen;
    this.transaction = this.context.transaction;
    this.untrustedData = this.context.untrusted_data;

    // Log a warning if running outside of Auth0 context
    if (!window.universal_login_context) {
      console.warn(
        "Auth0 ACUL JS: Running in local mock mode. Full Auth0 context is not available."
      );
    }
  }

  getContext(key) {
    return this.context[key];
  }
}

export class LoginId extends BaseScreenProvider {
  constructor() {
    super();
    console.log("LoginId Manager Initialized (Local Mock)");
  }

  async login(formData) {
    console.log("LoginId.login() called with:", formData);
    // Simulate a successful submission or a redirect
    // In a real Auth0 environment, this would trigger a form submission/redirect.
    alert("Login attempt (local mock): " + JSON.stringify(formData));
    // For local testing, you might want to simulate a delay or an error
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // throw new Error('Local mock login failed!');
  }

  // You can add other methods like socialLogin, passkeyLogin etc. if your screens use them
  async socialLogin(provider) {
    console.log("LoginId.socialLogin() called with:", provider);
    alert(`Social login with ${provider} (local mock)`);
  }
}

// Add other screen providers (e.g., LoginPassword, Signup) as needed
// export class LoginPassword extends BaseScreenProvider { /* ... */ }
// export class Signup extends BaseScreenProvider { /* ... */ }
