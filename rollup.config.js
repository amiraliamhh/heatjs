import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    name: 'Heatmap'
  },
  plugins: [typescript()]
}
