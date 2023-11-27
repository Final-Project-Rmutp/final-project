module.exports = {
    apps: [
      {
        name: 'api',
        script: 'server.js',
        env: {
          NODE_TLS_REJECT_UNAUTHORIZED: '0',
          // Other environment variables if needed
        },
      },
    ],
  };
  