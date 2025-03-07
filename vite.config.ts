import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import { viteBuildManifest } from "./script/build-manifest"
import ViteComponents from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

export default defineConfig({
  envPrefix: ["APP_", "npm_package_name", "npm_package_version"],
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`
    }
  },
  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 1024
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "border-radius-base": "4px"
        },
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    viteBuildManifest(),
    ViteComponents({
      resolvers: [
        AntDesignVueResolver({
          importLess: true
        })
      ]
    })
  ]
})
