from flask import redirect, url_for, session, request, jsonify, render_template, make_response
from flask_jwt_extended import (
    JWTManager, create_access_token, 
    get_jwt_identity, jwt_required,
    set_access_cookies, set_refresh_cookies, 
    unset_jwt_cookies, create_refresh_token,
    jwt_refresh_token_required
)
import requests
from config import KAKAO_CLIENT_ID, KAKAO_SECRET, KAKAO_REDIRECT_URI, NAVER_CLIENT_ID, NAVER_SECRET, NAVER_REDIRECT_URI, GOOGLE_SECRET, GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI
from model import UserData_N, UserModel, UserData_G, UserData_K
from question import Question
from flask_app import *
import logs
from flask_cors import cross_origin

### temporary server setup
quest = Question()

@app.route("/kakao_login")
def kakao_login():
    return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={KAKAO_CLIENT_ID}&redirect_uri={KAKAO_REDIRECT_URI}&prompt=login&response_type=code")

@app.route("/naver_login")
def naver_login():
    return redirect(f"https://nid.naver.com/oauth2.0/authorize?client_id={NAVER_CLIENT_ID}&redirect_uri={NAVER_REDIRECT_URI}&auth_type=reauthenticate&response_type=code")

@app.route("/google_login")
def google_login():
    return redirect(f"https://accounts.google.com/o/oauth2/auth/authorize?client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=profile+email&response_type=code")

@app.route("/kakao_callback")
def kakao_callback():
    code = request.args.get("code")
    if code:
        token_req = requests.post("https://kauth.kakao.com/oauth/token", data={
            "grant_type": "authorization_code",
            "client_id": KAKAO_CLIENT_ID,
            "redirect_uri": KAKAO_REDIRECT_URI,
            "code": code,
            "client_secret": KAKAO_SECRET,
        })
        token_json = token_req.json()

        if "access_token" in token_json:
            session["kakao_token"] = token_json["access_token"]
            return redirect(url_for("kakao_profile"))

    return "Failed to get Kakao access token."

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

@app.route("/kakao_profile")
def kakao_profile():
    if "kakao_token" in session:
        headers = {"Authorization": f"Bearer {session['kakao_token']}"}
        profile_req = requests.get("https://kapi.kakao.com/v2/user/me", headers=headers)
        profile_json = profile_req.json()

        user = UserData_K(profile_json)
        UserModel().upsert_user(user)

        return jsonify(profile_json)

    return "Kakao login required."

@app.route("/naver_profile")
def naver_profile():
    if "naver_token" in session:
        headers = {"Authorization": f"Bearer {session['naver_token']}"}
        profile_req = requests.get("https://openapi.naver.com/v1/nid/me", headers=headers)
        profile_json = profile_req.json()

        user = UserData_N(profile_json)
        UserModel().upsert_user(user)

        return jsonify(profile_json)

    return "Naver login required."

@app.route("/google_profile")
def google_profile():
    if "google_token" in session:
        headers = {"Authorization": f"Bearer {session['google_token']}"}
        profile_req = requests.get("https://www.googleapis.com/oauth2/v3/userinfo", headers=headers)
        profile_json = profile_req.json()

        user = UserData_G(profile_json)
        UserModel().upsert_user(user)

        return jsonify(profile_json)

    return "Google login required."

@app.route("/logout")
def logout():
    if "naver_token" in session:
        session.pop("naver_token", None)

        response = make_response(redirect(url_for("index")))
        response.delete_cookie('naver_token')

        return response

    if "kakao_token" in session:
        access_token = session["kakao_token"]
        requests.post("https://kapi.kakao.com/v1/user/logout", headers={
            "Authorization": f"Bearer {access_token}"
        })
        session.pop("kakao_token", None)

        response = make_response(redirect(url_for("index")))
        response.delete_cookie('logined')

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


    return "logout failed"

# these are example response codes
@app.route('/page_200', methods=['GET'])
def test():
    output = dict()
    output['message'] = 'success'

    response = make_response(jsonify(output), 200)
    return response

@app.route('/page_400', methods=['GET'])
def test22():
    output = dict()
    output['message'] = 'failed'

    response = make_response(jsonify(output), 400)
    return response

@app.route('/get-desire', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_question():
    if request.method == 'OPTIONS':
        print('preflight request')
        return '', 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        }
    output = dict()
    output['message'] = 'success'
    output['result'] = quest.get_list()

    response = make_response(jsonify(output), 200)
    return response


if __name__ == "__main__":
    app.run(debug=True)
