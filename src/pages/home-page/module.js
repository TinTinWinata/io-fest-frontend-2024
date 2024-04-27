module.exports = {
  apps: [
    {
      name: 'khelocric-clone',
      interpreter: 'bash',
      script: 'npm',
      args: 'run dev',
      cwd: '/var/www/winbuzz-cloaker/khelocric-clone',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'buystars-clone',
      interpreter: 'bash',
      script: 'npm',
      args: 'run dev',
      cwd: '/var/www/winbuzz-cloaker/buystars-clone',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
