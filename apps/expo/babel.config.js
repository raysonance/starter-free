module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      require.resolve('expo-router/babel'),
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            app: '../../packages/app',
            '@my/ui': '../../packages/ui',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // if you want reanimated support
      // 'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@my/ui', 'tamagui', 'react-native-google-places-autocomplete/GooglePlacesAutocomplete'],
                config: '../../packages/config/src/tamagui.config.ts',
              },
            ],
          ]),
    ],
  };
};
