#!/usr/bin/env bash

environmentVars=("APPLICATION_URL" "API_ENDPOINT" "RECAPTCHA_SITE_KEY" "SENTRY_FRONTEND_ENDPOINT")
json="{"

for var in "${environmentVars[@]}";
do
  json+="\"${var}\": \"${!var}\", "
done

json=${json::-2}
json+="}"

echo $json
