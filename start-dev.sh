#!/bin/bash	

( \
(cd fake-rest-server && npm run dev) \
& (cd next-app && npm run dev) \
)
