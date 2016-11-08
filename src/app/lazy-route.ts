export const LazyRoute = (dir: string, fileName: string, moduleName: string, path?: string) => ({
  path: path ? path : dir,
  pathMatch: path === '' ? 'full' : 'prefix',
  loadChildren: () => System.import(`./${dir}/${fileName}`).then((comp: any) => {
    return comp[moduleName]
  })
});
