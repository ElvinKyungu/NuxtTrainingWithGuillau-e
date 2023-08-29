import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth"
declare module "D:/Projets/creatif/portfolio/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}