using type modules in package.json -> enables ES modules (import/export) in Node.js

env.ts:
- loads environment variables with dotenv
- reads .env.${process.env.NODE_ENV || 'development'}.local
- exports PORT and NODE_ENV from process.env
- provides app-wide runtime configuration

