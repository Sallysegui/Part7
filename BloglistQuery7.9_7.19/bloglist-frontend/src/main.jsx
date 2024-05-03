import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "../notificationContext";
import { UserContextProvider } from "../loginContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(

  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>

);
