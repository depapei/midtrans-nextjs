import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Provider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
