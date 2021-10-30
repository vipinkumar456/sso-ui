export const PATH = {
    USER: 'users',
    USER_RESET_PASSWORD:'users/resetPassword',
    SIGNIN: 'users/signIn',
    RESET_PASSWORD: 'users/resetPassword/request',
    ROLES:'roles',
    GET_USER_BY_NAME:'users/username/',
    USER_DETAILS:'users/details',
    SAP_URL:'sap/url',
    REQUEST_OTP:'users/resetPassword/otp/request',
    VALIDATE_OTP:'users/resetPassword/otp/validate',
    SAP_PASSWORD_UPDATE:'sap/url/password/',
    RBS_TOKEN:'rbs/token',
    SIGN_OUT:'users/signOut',
    CAPTCHA:"users/captcha",
    NOTIFICATIONS:"notifications"
}

export const SERVER_PATHS = {
    DEV_HTTP: "http://172.16.15.223:8080/sso-api/api/v1/",
    DEV_HTTPS: "https://172.16.15.223:8443/sso-api/api/v1/",

    PROD_HTTP: "http://ssoedwdcap.edw.obc.co.in:8080/sso-api/api/v1/",
    PROD_HTTPS: "https://ssoedwdcap.edw.obc.co.in:8443/sso-api/api/v1/",


    LOCAL_HTTP: 'http://3.95.36.75:8012/api/v1/'
};
