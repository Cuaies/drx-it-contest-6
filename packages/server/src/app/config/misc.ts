export const miscConfiguration = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
});
