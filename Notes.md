using type modules in package.json -> enables ES modules (import/export) in Node.js

env.ts:
- loads environment variables with dotenv
- reads .env.${process.env.NODE_ENV || 'development'}.local
- exports PORT and NODE_ENV from process.env
- provides app-wide runtime configuration


.gitignore:
- lists files to ignore 
- make sure to invlude .env files in gitignore

routes:

- folder container files for app routing 
- /endpoint -> standard parameter
- /endpoint/:var -> var is a dynamic parameter that can have it's value dchanged
- you can have multiple routes with same enpoint but they have to use differnt verbs
    - ex: router.get(/) and router.post (/) are valid 

/modles:
folder for file containing schemas for how data should look   
schemas:
- contain objects that define how modles should look