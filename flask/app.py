from flask import redirect, url_for, session, request, jsonify, make_response
#from flask_jwt_extended import (
#    JWTManager, create_access_token, 
#    get_jwt_identity, jwt_required,
#    set_access_cookies, set_refresh_cookies, 
#    unset_jwt_cookies, create_refresh_token,
#    jwt_refresh_token_required
#)
import requests
from config import KAKAO_CLIENT_ID, KAKAO_SECRET, KAKAO_REDIRECT_URI, NAVER_CLIENT_ID, NAVER_SECRET, NAVER_REDIRECT_URI, GOOGLE_SECRET, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI
#from model import UserData_N, UserModel, UserData_G, UserData_K
from DBhandler import DBModule, UserProperty
from flask_app import *
import logs
from datetime import datetime, timedelta

### temporary server setup
DB = DBModule()

#Release: http://shift2me.com 
#Debug: http://localhost:3000
react_host = "http://localhost:3000"

@app.route("/kakao_login")
def kakao_login():
    if "KAKAOTALK" in request.headers.get('User-Agent'):
        #TODO: redirect to a react page that asserts change browser
        return redirect(url_for(""), 302)
    else:
        return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={KAKAO_CLIENT_ID}&redirect_uri={KAKAO_REDIRECT_URI}&prompt=select_account&response_type=code")
'''
@app.route("/naver_login")
def naver_login():
    return redirect(f"https://nid.naver.com/oauth2.0/authorize?client_id={NAVER_CLIENT_ID}&redirect_uri={NAVER_REDIRECT_URI}&auth_type=reauthenticate&response_type=code")

@app.route("/google_login")
def google_login():
    return redirect(f"https://accounts.google.com/o/oauth2/auth/authorize?client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=profile+email&response_type=code")
'''

@app.route("/kakao_callback")
def kakao_callback():
    code = request.args.get("code")
    if code:
        token_req = requests.post("https://kauth.kakao.com/oauth/token", headers={
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        }, data={
            "grant_type": "authorization_code",
            "client_id": KAKAO_CLIENT_ID,
            "redirect_uri": KAKAO_REDIRECT_URI,
            "code": code,
            "client_secret": KAKAO_SECRET,
        })
        token_json = token_req.json()

        if "access_token" in token_json:
            now = datetime.now()
            #to get user information
            my_info = requests.post("https://kapi.kakao.com/v2/user/me", headers={
                "Authorization": f"Bearer {token_json['access_token']}",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            })
            my_info_json = my_info.json()
            prop = UserProperty()
            if "kakao_account" in my_info_json:
                if "email" in my_info_json["kakao_account"] and my_info_json["kakao_account"]["is_email_valid"] and my_info_json["kakao_account"]["is_email_verified"]:
                    prop.email = my_info_json["kakao_account"]["email"]

                if "age_range" in my_info_json["kakao_account"] :
                    prop.age_range = my_info_json["kakao_account"]["age_range"]

                if "gender" in my_info_json["kakao_account"]:
                    prop.gender = my_info_json["kakao_account"]["gender"]

                if "phone_number" in my_info_json["kakao_account"]:
                    prop.phone_number = my_info_json["kakao_account"]["phone_number"]

            DB.sign_in("KAKAO", my_info_json["id"], prop)
            session["id"] = my_info_json["id"]
            session["login_type"] = "KAKAO"
            session["access_token"] = token_json["access_token"]
            session["access_expires"] = now + timedelta(seconds=token_json["expires_in"])
            session["refresh_token"] = token_json["refresh_token"]
            session["refresh_expires"] = now + timedelta(seconds=token_json["refresh_token_expires_in"])

            #session["expires_in"] = token_json["expires_in"]
            #session["refresh_token_expires_in"] = token_json["refresh_token_expires_in"]
            #session["login_time"] = datetime.now()
            return redirect(f"{react_host}/host/info")

    else:
        error_type = request.args.get("error")
        error_description = request.args.get("error_description")
        return make_response(f"error: {error_type}\n description: {error_description}", 403)
'''
@app.route("/naver_callback")
def naver_callback():
    code = request.args.get("code")
    if code:
        token_req = requests.post("https://nid.naver.com/oauth2.0/token", data={
            "grant_type": "authorization_code",
            "client_id": NAVER_CLIENT_ID,
            "client_secret": NAVER_SECRET,
            "code": code,
            "state": "state_string",  
            "redirect_uri": NAVER_REDIRECT_URI,
        })
        token_json = token_req.json()
        if "access_token" in token_json:
            session["naver_token"] = token_json["access_token"]
            return redirect(url_for("naver_profile"))

    return "Failed to get Naver access token."

@app.route("/google_callback")
def google_callback():
    code = request.args.get("code")
    if code:
        token_req = requests.post("https://oauth2.googleapis.com/token", data={
            "grant_type": "authorization_code",
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_SECRET,
            "code": code,
            "state": "state_string",  
            "redirect_uri": GOOGLE_REDIRECT_URI,
        })

        token_json = token_req.json()
        if "access_token" in token_json:
            session["google_token"] = token_json["access_token"]
            return redirect(url_for("google_profile"))

    return "Failed to get google access token."
'''

@app.route("/logout")
def logout():
    if not validate_token():
        return make_response("already_logged_out", 403)

    access_token = session["access_token"]
    if "login_type" in session and session["login_type"] == "KAKAO":
        requests.post("https://kapi.kakao.com/v1/user/logout", headers={
            "Authorization": f"Bearer {access_token}"
        })
        #session.pop("access_token", None)
        session.clear()
        return redirect(react_host, 302)
    '''
    if "naver_token" in session:
        session.pop("naver_token", None)

        response = make_response(redirect(url_for("index")))
        response.delete_cookie('naver_token')

        return response

    if "google_token" in session:
        access_token = session["google_token"]

        requests.post("https://accounts.google.com/o/oauth2/revoke?token=", headers={
            "Authorization": f"Bearer {access_token}"
        })
        session.pop("google_token", None)

        response = make_response(redirect(url_for("index")))
        response.delete_cookie('google_token')

        return response
    '''
    return make_response("failed_to_logout", 403)

# This function is used to validate the token in the session
# If there's no token in the session, it returns False, so you can use this function to check if the user is logged in
# Also, this function includes a token validation process with _refresh_token() function
def validate_token():
    if "access_expires" not in session:
        return False
    elif datetime.now() > session["access_expires"]:
        if "refresh_expires" in session and datetime.now() < session["refresh_expires"]:
            return _refresh_token()
        else:
            session.clear()
            return False
    else:
        return True

#NOTE: DO NOT USE WITHOUT VALIDATING TOKEN
def _refresh_token():
    token_req = requests.post("https://kauth.kakao.com/oauth/token", headers={
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }, data={
        "grant_type": "refresh_token",
        "client_id": KAKAO_CLIENT_ID,
        "refresh_token": session["refresh_token"],
        "client_secret": KAKAO_SECRET,
    })
    token_json = token_req.json()
    if "access_token" in token_json:
        now = datetime.now()
        session["access_token"] = token_json["access_token"]
        session["access_expires"] = now + timedelta(seconds=token_json["expires_in"])
        session["refresh_token"] = token_json["refresh_token"]
        session["refresh_expires"] = now + timedelta(seconds=token_json["refresh_token_expires_in"])
        return True
    else:
        session.clear()
        return False

if __name__ == "__main__":
    app.run(debug=True)
