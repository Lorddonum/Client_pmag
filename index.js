// Entry point for Hostinger deployment
// This file imports and starts the actual server from server/index.ts

import('tsx/esm').then(({ register }) => {
    register();
    import('./server/index.ts');
});
