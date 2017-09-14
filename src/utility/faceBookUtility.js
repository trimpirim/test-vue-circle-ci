import config from "../config.json"

export function facebookInit(store) {
    if (typeof window.fbAsyncInit == "undefined") {
        window.fbAsyncInit = function () {
            FB.init({
                appId: config.auth.facebook.clientId,
                xfbml: true,
                autoLogAppEvents: true,
                status: true,
                version: 'v2.10'
            });
            FB.XFBML.parse();
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    }
    else {
        FB.XFBML.parse();
    }
}

export function getFaceBookUserInfo() {
    return new Promise((resolve, reject) => {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                // user is logged in to Facebook
                console.log(response);
                var uid = response.authResponse.userID;
                FB.api('/me', { fields: 'id,name,email' }, function (response) {
                    resolve(response);
                });
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
                reject("unauthorized");
            } else {
                //user is not logged in to Facebook
                FB.login(function (response) {
                    console.log(response);
                    if (response.authResponse) {
                        FB.api('/me',{ fields: 'id,name,email' }, function (response) {
                            resolve(response);
                        });
                        
                    } else {
                        reject(response);
                    }
                });
            }
        })
    });
}