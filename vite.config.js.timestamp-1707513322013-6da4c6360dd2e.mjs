// vite.config.js
import { defineConfig } from "file:///D:/WebProject/startupProjectWeb/node_modules/vite/dist/node/index.js";
import react from "file:///D:/WebProject/startupProjectWeb/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///D:/WebProject/startupProjectWeb/node_modules/vite-plugin-pwa/dist/index.js";
import { fileURLToPath, URL } from "node:url";
import path from "path";
var __vite_injected_original_dirname = "D:\\WebProject\\startupProjectWeb";
var __vite_injected_original_import_meta_url = "file:///D:/WebProject/startupProjectWeb/vite.config.js";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "dist",
      sourcemap: true
    },
    plugins: [
      react(),
      VitePWA({
        injectRegister: false,
        filename: "index.tsx",
        srcDir: "src",
        devOptions: {
          enabled: true,
          type: "module"
        }
      })
    ],
    resolve: {
      alias: {
        src: path.resolve(__vite_injected_original_dirname, "./dist"),
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      port: 3434,
      open: true,
      host: "localhost"
    },
    review: {
      port: 3401,
      open: true,
      host: "localhost"
    },
    define: {
      "process.env.VITE_REACT_APP_REST_SERVICE_URL": JSON.stringify(mode)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWJQcm9qZWN0XFxcXHN0YXJ0dXBQcm9qZWN0V2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXZWJQcm9qZWN0XFxcXHN0YXJ0dXBQcm9qZWN0V2ViXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9XZWJQcm9qZWN0L3N0YXJ0dXBQcm9qZWN0V2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5pbXBvcnQge2ZpbGVVUkxUb1BhdGgsIFVSTH0gZnJvbSBcIm5vZGU6dXJsXCJcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgICBzb3VyY2VtYXA6IHRydWVcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIFZpdGVQV0Eoe1xyXG4gICAgICAgIGluamVjdFJlZ2lzdGVyOiBmYWxzZSxcclxuICAgICAgICBmaWxlbmFtZTogJ2luZGV4LnRzeCcsXHJcbiAgICAgICAgc3JjRGlyOiAnc3JjJyxcclxuICAgICAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgdHlwZTogJ21vZHVsZSdcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIHNyYzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL2Rpc3RcIiksXHJcbiAgICAgICAgXCJAXCI6ZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzNDM0LFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxyXG4gICAgfSxcclxuICAgIHJldmlldzoge1xyXG4gICAgICBwb3J0OiAzNDAxLFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBob3N0OiBcImxvY2FsaG9zdFwiXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIFwicHJvY2Vzcy5lbnYuVklURV9SRUFDVF9BUFBfUkVTVF9TRVJWSUNFX1VSTFwiOiBKU09OLnN0cmluZ2lmeShtb2RlKVxyXG4gICAgfVxyXG4gIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9CO0FBQ2xULE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUSxlQUFlLFdBQVU7QUFDakMsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBQWtJLElBQU0sMkNBQTJDO0FBTzVOLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixZQUFZO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxRQUNyQyxLQUFJLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3JEO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTiwrQ0FBK0MsS0FBSyxVQUFVLElBQUk7QUFBQSxJQUNwRTtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
