import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import UciStandingsTabs from './components/standings/UciStandingsTabs';
import RaceDaysLevelTabs from './raceDays/RaceDaysLevelTabs';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "standings",
        element: <UciStandingsTabs />,
      },
      {
        path: "raceDays",
        element: <RaceDaysLevelTabs />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
