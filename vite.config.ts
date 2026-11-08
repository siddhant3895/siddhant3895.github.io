export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },

    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
