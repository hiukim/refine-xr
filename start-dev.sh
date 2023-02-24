#!/bin/bash	

( \
(cd fake-rest-server && npm run dev) \
& (cd next-app && npm run dev) \
& (local-ssl-proxy --source 3001 --target 3000) \
& (local-ssl-proxy --source 4001 --target 4000) \
)
