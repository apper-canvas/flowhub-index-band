import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import ProcessInstancesPage from '@/components/pages/ProcessInstancesPage'
import '@/index.css'
import SettingsPage from "@/components/pages/SettingsPage";
import TemplatesPage from "@/components/pages/TemplatesPage";
import DashboardPage from "@/components/pages/DashboardPage";
import ProcessesPage from "@/components/pages/ProcessesPage";
import Header from "@/components/organisms/Header";

function App() {
return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
<Routes>
            <Route path="/" element={<ProcessesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/processes" element={<ProcessesPage />} />
            <Route path="/instances" element={<ProcessInstancesPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
</div>
    </BrowserRouter>
  );
}

export default App;