# Decrypt and verify the integrity verdict
> [!NOTE]
> "If you want all the code in a single file, checkout to the <b>monofile</b> branch." ✅

- Decrypt and verify the integrity verdict
After you request an integrity verdict, the Play Integrity API provides an encrypted response token. To obtain the device integrity verdicts, you must decrypt the integrity token on Google's servers. To do so, complete these steps:

- [Create a service account](https://cloud.google.com/iam/docs/service-accounts-create) within the Google Cloud project that's linked to your app.
On your app's server, fetch the access token from your service account credentials using the playintegrity scope, and make the following request:

```javascript
playintegrity.googleapis.com/v1/PACKAGE_NAME:decodeIntegrityToken -d \
'{ "integrity_token": "INTEGRITY_TOKEN" }'
```

> [!NOTE]
> To access the API's REST interface, you can use the [Google API Client Library](https://developers.google.com/api-client-library), which is available in many programming languages, [including Java](https://github.com/googleapis/google-api-java-client-services/tree/main/clients/google-api-services-playintegrity/v1) .
> Read the JSON response.

- The resulting payload is a plain-text token that contains [integrity verdicts](https://developer.android.com/google/play/integrity/verdicts) .
