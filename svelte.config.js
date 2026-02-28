
// import adapter from '@sveltejs/adapter-node';

// // /* @type {import('@sveltejs/kit').Config} */
// const config = { kit: { adapter: adapter() } };

// export default config;


import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: vercel()
  },
  preprocess: preprocess()
};

export default config;