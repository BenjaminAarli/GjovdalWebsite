
// import adapter from '@sveltejs/adapter-node';

// // /* @type {import('@sveltejs/kit').Config} */
// const config = { kit: { adapter: adapter() } };

// export default config;


// import vercel from '@sveltejs/adapter-vercel';
// import { preprocess } from '@sveltejs/vite-plugin-svelte';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   kit: {
//     adapter: vercel()
//   },
//   preprocess: preprocess()
// };

// export default config;

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;