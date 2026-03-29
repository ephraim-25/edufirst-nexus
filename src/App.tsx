import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import AccessManagementPage from "./pages/admin/AccessManagementPage";
import OverviewPage from "./pages/admin/OverviewPage";
import DisciplinePage from "./pages/admin/DisciplinePage";
import HRPage from "./pages/admin/HRPage";
import TransportPage from "./pages/admin/TransportPage";
import GradesEntryPage from "./pages/teacher/GradesEntryPage";
import EduStore from "./pages/store/EduStore";
import ProfilePage from "./pages/shared/ProfilePage";
import SettingsPage from "./pages/shared/SettingsPage";
import NotificationsPage from "./pages/shared/NotificationsPage";
import ChatPage from "./pages/shared/ChatPage";
import CalendarPage from "./pages/shared/CalendarPage";
import SchoolWallPage from "./pages/shared/SchoolWallPage";
import HonorBoardPage from "./pages/shared/HonorBoardPage";
import ChildrenPage from "./pages/parent/ChildrenPage";
import WalletPage from "./pages/parent/WalletPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Admin */}
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/overview" element={<OverviewPage />} />
          <Route path="/dashboard/admin/students" element={<StudentsPage />} />
          <Route path="/dashboard/admin/access" element={<AccessManagementPage />} />
          <Route path="/dashboard/admin/discipline" element={<DisciplinePage role="admin" />} />
          <Route path="/dashboard/admin/hr" element={<HRPage />} />
          <Route path="/dashboard/admin/calendar" element={<CalendarPage role="admin" />} />
          <Route path="/dashboard/admin/transport" element={<TransportPage />} />
          <Route path="/dashboard/admin/chat" element={<ChatPage role="admin" />} />
          <Route path="/dashboard/admin/wall" element={<SchoolWallPage role="admin" />} />
          <Route path="/dashboard/admin/honor" element={<HonorBoardPage role="admin" />} />
          <Route path="/dashboard/admin/store" element={<EduStore role="admin" />} />
          <Route path="/dashboard/admin/profile" element={<ProfilePage role="admin" />} />
          <Route path="/dashboard/admin/settings" element={<SettingsPage role="admin" />} />
          <Route path="/dashboard/admin/notifications" element={<NotificationsPage role="admin" />} />

          {/* Teacher */}
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/teacher/grades" element={<GradesEntryPage />} />
          <Route path="/dashboard/teacher/discipline" element={<DisciplinePage role="teacher" />} />
          <Route path="/dashboard/teacher/calendar" element={<CalendarPage role="teacher" />} />
          <Route path="/dashboard/teacher/chat" element={<ChatPage role="teacher" />} />
          <Route path="/dashboard/teacher/wall" element={<SchoolWallPage role="teacher" />} />
          <Route path="/dashboard/teacher/profile" element={<ProfilePage role="teacher" />} />
          <Route path="/dashboard/teacher/settings" element={<SettingsPage role="teacher" />} />
          <Route path="/dashboard/teacher/notifications" element={<NotificationsPage role="teacher" />} />

          {/* Student */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/student/calendar" element={<CalendarPage role="student" />} />
          <Route path="/dashboard/student/wall" element={<SchoolWallPage role="student" />} />
          <Route path="/dashboard/student/honor" element={<HonorBoardPage role="student" />} />
          <Route path="/dashboard/student/profile" element={<ProfilePage role="student" />} />
          <Route path="/dashboard/student/settings" element={<SettingsPage role="student" />} />
          <Route path="/dashboard/student/notifications" element={<NotificationsPage role="student" />} />

          {/* Parent */}
          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/parent/children" element={<ChildrenPage />} />
          <Route path="/dashboard/parent/wallet" element={<WalletPage />} />
          <Route path="/dashboard/parent/calendar" element={<CalendarPage role="parent" />} />
          <Route path="/dashboard/parent/chat" element={<ChatPage role="parent" />} />
          <Route path="/dashboard/parent/wall" element={<SchoolWallPage role="parent" />} />
          <Route path="/dashboard/parent/honor" element={<HonorBoardPage role="parent" />} />
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
