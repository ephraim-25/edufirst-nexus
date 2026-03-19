import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import AccessManagementPage from "./pages/admin/AccessManagementPage";
import GradesEntryPage from "./pages/teacher/GradesEntryPage";
import EduStore from "./pages/store/EduStore";
import ProfilePage from "./pages/shared/ProfilePage";
import SettingsPage from "./pages/shared/SettingsPage";
import NotificationsPage from "./pages/shared/NotificationsPage";
import ChildrenPage from "./pages/parent/ChildrenPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Admin */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/students" element={<StudentsPage />} />
          <Route path="/dashboard/admin/access" element={<AccessManagementPage />} />
          <Route path="/dashboard/admin/store" element={<EduStore role="admin" />} />
          <Route path="/dashboard/admin/profile" element={<ProfilePage role="admin" />} />
          <Route path="/dashboard/admin/settings" element={<SettingsPage role="admin" />} />
          <Route path="/dashboard/admin/notifications" element={<NotificationsPage role="admin" />} />

          {/* Teacher */}
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/teacher/grades" element={<GradesEntryPage />} />
          <Route path="/dashboard/teacher/profile" element={<ProfilePage role="teacher" />} />
          <Route path="/dashboard/teacher/settings" element={<SettingsPage role="teacher" />} />
          <Route path="/dashboard/teacher/notifications" element={<NotificationsPage role="teacher" />} />

          {/* Student */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/profile" element={<ProfilePage role="student" />} />
          <Route path="/dashboard/student/settings" element={<SettingsPage role="student" />} />
          <Route path="/dashboard/student/notifications" element={<NotificationsPage role="student" />} />

          {/* Parent */}
          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/parent/children" element={<ChildrenPage />} />
          <Route path="/dashboard/parent/store" element={<EduStore role="parent" />} />
          <Route path="/dashboard/parent/profile" element={<ProfilePage role="parent" />} />
          <Route path="/dashboard/parent/settings" element={<SettingsPage role="parent" />} />
          <Route path="/dashboard/parent/notifications" element={<NotificationsPage role="parent" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
