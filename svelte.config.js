
// import adapter from '@sveltejs/adapter-node';

// // /* @type {import('@sveltejs/kit').Config} */
// const config = { kit: { adapter: adapter() } };

// export default config;


// import adapter from '@sveltejs/adapter-static';
// import preprocess from 'svelte-preprocess';

// export default {
//   preprocess: preprocess(),
//   kit: {
//     adapter: adapter(),
//     prerender: {
//       entries: ['*']  // <-- this tells SvelteKit to prerender all pages
//     }
//   }
// };


import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
  kit: {
    adapter: vercel(),
    // other options...
  },
  preprocess: [vitePreprocess(), preprocess()]
};