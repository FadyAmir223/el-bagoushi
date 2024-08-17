# DONE (setup):

turborepo + pnpm
next.js
@repo/tsconfig
nativewind
@repo/eslint-config
husky CI
@repo/tailwind-config
shadcn-ui
@repo/prettier-config
docker (1)
prisma + env vars
docker (2)
next-auth (not working expo)
@repo/db: prisma

# TODO (setup):

@repo/api: tRPC
@repo/auth: next-auth
@repo/ui: react-native-web

docker osx (ios simulator)

# open emulator

/home/fezza/Android/Sdk/emulator/emulator @Pixel_4_API_35
turbo dev

# TODO:

git rid of "dev": "ANDROID_HOME=$HOME/Android/Sdk expo start"

<!-- EXPO_USE_METRO_WORKSPACE_ROOT=1 -->

# reset

find . -name .turbo -type d -prune -exec rm -rf '{}' + && \
find . -name node_modules -type d -prune -exec rm -rf '{}' + && \
rm pnpm-lock.yaml && \
pnpm i && \
pnpm db:generate
