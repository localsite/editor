
# Google Sheet Editor

We're working toward a process to edit rows in a [MapsForUs Google Sheet](../localsite/map/mapsforus) using REST/CRUD after logging into a Google account within a brower.   

Javascript browser-frontend work resides in [Google-OneTap](onetap/).   

This repo requires having the [localsite repo](https://github.com/localsite/) in an adjacent folder in the same site root. See [getting started](../localsite/start/).  

Go to [console.developers.google.com](https://console.developers.google.com/). Under "Domain Verification" enter domains (works on localhost before doing this). Verify ownership by copying html file into site root. (Used maps.g account) <!-- also added l email.) -->

<!--
It may be possible to duplicate some of the following server-side process using this Python 2.7 
<a href="https://codelabs.developers.google.com/codelabs/credential-management-api/index.html">Auto Sign-in with the Credential Management API</a>.
-->


[JAM Stack website form to update a Google Sheet](https://medium.com/@abuango/how-to-collect-form-data-from-a-jamstack-website-to-google-sheets-using-google-cloud-functions-a59546c803a5)
using Google Cloud Function Web Service that appends any data sent to it to a Google sheet using a NodeJS script. Also sends an email notification.  




[How to host a Python websocket on Google Cloud](https://cloud.google.com/appengine/docs/flexible/python/using-websockets-and-session-affinity)  

[Google Cloud websockets for authentication](https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105)

[Includes link to activating https on one’s local computer using OpenSLL](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/)


<!--
Also see our screen scrapper that sends to a Google Sheet.
-->

<!--
maps.georgia.org account to edit diagram
https://app.diagrams.net/#G1hzphUDacB3DGW8UyzZptcxuTlv9uui53
-->
<br>

<h1>Flask Version (Incomplete)</h1>

Using Flask may not be necessary is using the [Google Cloud Function NodeJS example](https://medium.com/@abuango/how-to-collect-form-data-from-a-jamstack-website-to-google-sheets-using-google-cloud-functions-a59546c803a5) (Also linked above.)

These <a href='https://realpython.com/flask-google-login/'>Flask Google Login</a> set-up steps may be similar.

Here are steps for deploying [Flask to Google Cloud with Docker into a Kubernetes Cluster](https://medium.com/honeybadger-ai/how-to-deploy-machine-learning-models-using-flask-docker-and-google-cloud-platform-gcp-6e7bf1b339d5)  
<br>


## A. Clone this Repo

You'll be adding private keys, then running a local Python Flask server.  
Clone from <a href="https://github.com/modelearth/editor">github.com/modelearth/editor</a>  

## B. Get your Auth IDs

[Create a Google Project or use existing project IDs](google)  

## C. Install the Editor

1. Open a terminal in the local "editor" folder.

1. Install Python 3.7 if you don't have it currently.  

```
	python3 -V
```

3. Within your editor root directory run commands:
```
chmod +x setup.sh
./setup.sh
```

4. Run/Server python app.

```
cd app
python3 app.py
```
5. Go to [https://127.0.0.1:5000/](https://127.0.0.1:5000/) to view the app.  
<!-- Doesn't show same: or [http://localhost:5000/](http://localhost:5000/) -->


In Safari you will see "Your connection is not private".  
Click the "Advanced" button to view insecurely locally.  

If successful, you will see a 'Google Login' and you'll be able to login to your Google account to see "Hi [firstname]! Logout"  
This does not work in Chrome or Brave (tested on a Mac).   


## D. Self-Signed SSL

Even after installing locally, you will see a browser warning indicating that the certificate should not be trusted. You can proceed past this warning to view the encrypted site. 

Generate a self-signed ssl with openssl - <span style="background-color: #FFFF00">We need to document this procedure or link to an external page with steps.</span>  

Skip this step for now and use the "Advanced" button to view locally.  
<span style="background-color: #FFFF00">("Advanced" button only works on Safari. Not working on Chrome or Brave on Mac.)</span>  

Viewing at: <a href="https://127.0.0.1:5000">https://127.0.0.1:5000</a>   

The following did not work yet. (This was not needed for Safari.):  

<a href="https://devcenter.heroku.com/articles/ssl-certificate-self">Generate Self-Signed SSL Certificate</a><br>

After generating, tried adding to the "System" keychain, but error continues: NET::ERR\_CERT\_INVALID

<!--
## D. For MapsForUs Auth

To do: [Config to avoid Unverified apps error](https://support.google.com/cloud/answer/7454865) - To include email in [MapsForUs comment](../localsite/) in our copy of the MapsforUS Google Sheet Template.


Also did for gsample

Added model.earth as authorized domain on "OAuth consent screen"
(Only allows top level domain, like model.earth)

https://console.developers.google.com/apis/credentials/consent/edit?project=georgia-directory&duration=P1D

And here too (verify via HTML):

https://console.developers.google.com/apis/credentials/domainverification?project=georgia-directory

-->

<!--
 Progress: (Not currently working)  
[&#x2714;] Login/Logout with google.  
 [&#x2714;] Store login details in sqlitedb - to be changed later.  
 [&#x2714;] Show/Hide edit menu on Login/Logout.  
 [ &nbsp; ] Edit form.  
-->

<span style="background-color: #FFFF00">
<b>TO DO:</b> Create a CRUD/REST form based on [Real World](https://neighborhood.org/realworld) and set-up a [Real World Starter Kit](https://github.com/gothinkster/realworld-starter-kit) that also works with [Google Cloud Functions](https://medium.com/@abuango/how-to-collect-form-data-from-a-jamstack-website-to-google-sheets-using-google-cloud-functions-a59546c803a5)  

<b>Proposed Frontend:</b> Either existing "Vanilla JS Web Components" ([initial tests](https://model.earth/localsite/resources/google-onetap/)) or use JQuery. 

<b>Proposed Backend for Trust Levels:</b> Either a Google API Flask connector, DJango with Discourse](https://github.com/discourse/discourse), or another Trust Level storehouse, like Google Firebase.
</span>

<br>