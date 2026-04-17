// EduFirst — API stub layer (ready for backend integration)
// Replace BASE_URL when wiring a real backend.
const API_BASE = "/api";

async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fallback to mock data when backend not available (dev mode)
    console.warn(`[API stub] ${path} — using mock`, err.message);
    return null;
  }
}

window.api = {
  // === STORE ===
  getArticles: () => apiFetch("/articles"),
  createArticle: (data) => apiFetch("/articles", { method: "POST", body: JSON.stringify(data) }),
  updateArticle: (id, data) => apiFetch(`/articles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteArticle: (id) => apiFetch(`/articles/${id}`, { method: "DELETE" }),

  // === FINANCE ===
  getTransactions: (filters) => apiFetch(`/transactions?${new URLSearchParams(filters || {})}`),
  getRevenueStats: (campus) => apiFetch(`/finance/stats?campus=${campus || ""}`),
  getUnpaid: () => apiFetch("/finance/unpaid"),

  // === USERS ===
  getUsers: (role) => apiFetch(`/users${role ? `?role=${role}` : ""}`),
  createUser: (data) => apiFetch("/users", { method: "POST", body: JSON.stringify(data) }),

  // === MESSAGES ===
  getChannels: () => apiFetch("/chat/channels"),
  getMessages: (channelId) => apiFetch(`/chat/channels/${channelId}/messages`),
  sendMessage: (channelId, text) => apiFetch(`/chat/channels/${channelId}/messages`, { method: "POST", body: JSON.stringify({ text }) }),

  // === NOTIFICATIONS ===
  getNotifications: () => apiFetch("/notifications"),
  markRead: (id) => apiFetch(`/notifications/${id}/read`, { method: "POST" }),

  // === CAMPUS ===
  getCampuses: () => apiFetch("/campuses"),

  // === STUDENTS ===
  getStudents: (campus) => apiFetch(`/students?campus=${campus || ""}`),

  // === GRADES ===
  saveGrades: (classId, grades) => apiFetch(`/grades/${classId}`, { method: "POST", body: JSON.stringify(grades) }),
};
