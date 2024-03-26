module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-syntax-jsx', // Add this line
      ['module-resolver', {
        root: ['.'],
        alias: {
          '@/components': './src/components',
          '@/config': './src/config',
          '@/pages': './src/pages',
          '@/styles': './src/styles',
          // Add more aliases as needed based on your project structure
        },
      }],
    ],
    
  };