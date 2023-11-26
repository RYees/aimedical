// await import("./src/env.mjs");
// /** @type {import("next").NextConfig} */

// const config = {
//   reactStrictMode: true,
  // images: {
  //   domains: ['alkdksmkvmrvm-prod.s3.amazonaws.com', 'lh3.googleusercontent.com'],
  // },
//  serverRuntimeConfig: {
//     initScheduler: true
//   },
  
//   i18n: {
//     locales: ["en"],
//     defaultLocale: "en",
//   },
// };


import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});


export default config;
