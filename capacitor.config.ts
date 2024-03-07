
import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'budik.runner.check',
  appName: 'budik',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // BackgroundRunner:{
    //   label: 'budik.check',
    //   src: 'runners/runner.js',
    //   event: 'budikcheck',
    //   repeat: true,
    //   interval: 1,
    //   autoStart: true
    // },
    BackgroundRunner:{
      label: 'checkAlarms',
      src: 'runners/runner.js',
      event: 'alarm.check',
      repeat: true,
      interval: 60,
      autoStart: true
    }

  },
};

export default config;