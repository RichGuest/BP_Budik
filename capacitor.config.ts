
import { CapacitorConfig } from '@capacitor/cli';

import { BackgroundRunner } from '@capacitor/background-runner';
const config: CapacitorConfig = {
  appId: 'budik.runner.check',
  appName: 'budik',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    BackgroundRunner:{
      label: 'budik.runner.check',
      src: 'runners/runner.js',
      event: 'budikcheck',
      repeat: true,
      interval: 1,
      autoStart: true
    }

  },
};

export default config;