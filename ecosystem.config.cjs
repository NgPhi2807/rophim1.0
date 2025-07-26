module.exports = {
  apps: [
    {
      name: "phimmoii.top",
      script: "./dist/server/entry.mjs",
      exec_mode: "cluster", // Dùng hết 2 core
      instances: 2, // 2 core thì chạy 2 process song song
      node_args: "--max-old-space-size=1536", // 1.5GB RAM mỗi tiến trình
      env: {
        NODE_ENV: "production",
        PORT: 4222,
        HOST: "0.0.0.0",
      },
    },
  ],
};
