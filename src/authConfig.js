import { LogLevel } from "@azure/msal-browser";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
	names: {
		signUpSignIn: "B2C_1_sign_up_sign_in"
	},
	authorities: {
		signUpSignIn: {
			authority:
				"https://henwoodb2c.b2clogin.com/henwoodb2c.onmicrosoft.com/B2C_1_sign_up_sign_in"
		}
	},
	authorityDomain: "henwoodb2c.b2clogin.com"
};

// Config object to be passed to Msal on creation
export const msalConfig = {
	auth: {
		clientId: "ad65ce17-db8b-411f-9a68-3643abe2929f",
		authority: b2cPolicies.authorities.signUpSignIn.authority,
		knownAuthorities: [b2cPolicies.authorityDomain],
		redirectUri: "http://localhost:5173",
		postLogoutRedirectUri: "http://localhost:5173"
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: isIE || isEdge || isFirefox
	},
	system: {
		allowNativeBroker: false, // Disables WAM Broker
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						console.info(message);
						return;
					case LogLevel.Verbose:
						console.debug(message);
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
					default:
						return;
				}
			}
		}
	}
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
	scopes: [
		"https://henwoodb2c.onmicrosoft.com/4741d403-1c18-4c2b-a1a7-c37a0ae5226d/read"
	]
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
// export const apiConfig = {
// 	scopes: ["https://msidlabb2c.onmicrosoft.com/msidlabb2capi/read"],
// 	uri: "https://msidlabb2c.onmicrosoft.com/msidlabb2capi"
// };

export const logOutRequest = {
	postLogoutRedirectUri: "http://localhost:5173"
};
