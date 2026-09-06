import type {
  IRoom,
  IBooking,
  IVisitRequest,
  IMaintenanceRequest,
  IReview,
  IAmenity,
  IGallery,
  IUser,
  PaginatedRooms,
  RoomFilters,
  BookingFormData,
  VisitFormData,
  RegisterData,
  LoginData,
  AuthResponse,
  DashboardStats,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiClientError extends Error {
  status: number;
  errors?: { field: string; message: string }[];

  constructor(
    message: string,
    status: number,
    errors?: { field: string; message: string }[]
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiClientError(
      data.message || "Something went wrong",
      res.status,
      data.errors
    );
  }

  return data as T;
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export async function register(data: RegisterData): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginData): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMe(token: string): Promise<{ user: IUser }> {
  return request<{ user: IUser }>("/auth/me", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function updateProfile(
  data: FormData,
  token: string
): Promise<{ user: IUser }> {
  const res = await fetch(`${API_URL}/api/users/profile`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const json = await res.json();
  if (!res.ok)
    throw new ApiClientError(json.message || "Update failed", res.status);
  return json;
}

// ─── Rooms ────────────────────────────────────────────────────────────────────
export async function getRooms(
  filters: RoomFilters = {}
): Promise<PaginatedRooms> {
  const params = new URLSearchParams();
  if (filters.roomType) params.set("roomType", filters.roomType);
  if (filters.status) params.set("status", filters.status);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  const query = params.toString() ? `?${params.toString()}` : "";
  return request<PaginatedRooms>(`/rooms${query}`, {
    next: { revalidate: 60 },
  } as RequestInit);
}

export async function getRoom(id: string): Promise<{ room: IRoom }> {
  return request<{ room: IRoom }>(`/rooms/${id}`, {
    next: { revalidate: 60 },
  } as RequestInit);
}

export async function createRoom(
  data: FormData,
  token: string
): Promise<{ room: IRoom }> {
  const res = await fetch(`${API_URL}/api/rooms`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const json = await res.json();
  if (!res.ok)
    throw new ApiClientError(json.message || "Create failed", res.status);
  return json;
}

export async function updateRoom(
  id: string,
  data: FormData,
  token: string
): Promise<{ room: IRoom }> {
  const res = await fetch(`${API_URL}/api/rooms/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const json = await res.json();
  if (!res.ok)
    throw new ApiClientError(json.message || "Update failed", res.status);
  return json;
}

export async function deleteRoom(id: string, token: string): Promise<void> {
  await request(`/rooms/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Bookings ─────────────────────────────────────────────────────────────────
export async function createBooking(
  data: BookingFormData,
  token: string
): Promise<{ booking: IBooking }> {
  return request<{ booking: IBooking }>("/bookings", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function getMyBookings(
  token: string
): Promise<{ bookings: IBooking[] }> {
  return request<{ bookings: IBooking[] }>("/bookings/my", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getBooking(
  id: string,
  token: string
): Promise<{ booking: IBooking }> {
  return request<{ booking: IBooking }>(`/bookings/${id}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function updateBooking(
  id: string,
  data: Partial<{ status: string; paymentStatus: string }>,
  token: string
): Promise<{ booking: IBooking }> {
  return request<{ booking: IBooking }>(`/bookings/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function cancelBooking(
  id: string,
  token: string
): Promise<{ booking: IBooking }> {
  return request<{ booking: IBooking }>(`/bookings/${id}/cancel`, {
    method: "PUT",
    headers: authHeaders(token),
  });
}

// ─── Visits ───────────────────────────────────────────────────────────────────
export async function createVisit(
  data: VisitFormData,
  token?: string
): Promise<{ visit: IVisitRequest }> {
  return request<{ visit: IVisitRequest }>("/visits", {
    method: "POST",
    headers: token ? authHeaders(token) : {},
    body: JSON.stringify(data),
  });
}

export async function getMyVisits(
  token: string
): Promise<{ visits: IVisitRequest[] }> {
  return request<{ visits: IVisitRequest[] }>("/visits/my", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getAdminVisits(
  token: string
): Promise<{ visits: IVisitRequest[]; total: number }> {
  return request("/admin/visits", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function updateVisit(
  id: string,
  data: { status: string },
  token: string
): Promise<{ visit: IVisitRequest }> {
  return request<{ visit: IVisitRequest }>(`/admin/visits/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

// ─── Maintenance ──────────────────────────────────────────────────────────────
export async function createMaintenance(
  data: FormData,
  token: string
): Promise<{ request: IMaintenanceRequest }> {
  const res = await fetch(`${API_URL}/api/maintenance`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const json = await res.json();
  if (!res.ok)
    throw new ApiClientError(json.message || "Submit failed", res.status);
  return json;
}

export async function getMyMaintenance(
  token: string
): Promise<{ requests: IMaintenanceRequest[] }> {
  return request<{ requests: IMaintenanceRequest[] }>("/maintenance/my", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getAdminMaintenance(
  token: string
): Promise<{ requests: IMaintenanceRequest[]; total: number }> {
  return request("/admin/maintenance", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function updateMaintenance(
  id: string,
  data: Partial<{ status: string; priority: string }>,
  token: string
): Promise<{ request: IMaintenanceRequest }> {
  return request<{ request: IMaintenanceRequest }>(
    `/admin/maintenance/${id}`,
    {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
export async function getReviews(): Promise<{ reviews: IReview[] }> {
  return request<{ reviews: IReview[] }>("/reviews", {
    next: { revalidate: 300 },
  } as RequestInit);
}

export async function createReview(
  data: { rating: number; review: string; role?: string },
  token: string
): Promise<{ review: IReview }> {
  return request<{ review: IReview }>("/reviews", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function getAdminReviews(
  token: string
): Promise<{ reviews: IReview[] }> {
  return request<{ reviews: IReview[] }>("/admin/reviews", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function updateReview(
  id: string,
  data: { approved: boolean },
  token: string
): Promise<{ review: IReview }> {
  return request<{ review: IReview }>(`/admin/reviews/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteReview(id: string, token: string): Promise<void> {
  await request(`/admin/reviews/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export async function getGallery(): Promise<{ gallery: IGallery[] }> {
  return request<{ gallery: IGallery[] }>("/gallery", {
    next: { revalidate: 300 },
  } as RequestInit);
}

export async function createGalleryItem(
  data: FormData,
  token: string
): Promise<{ item: IGallery }> {
  const res = await fetch(`${API_URL}/api/gallery`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: data,
  });
  const json = await res.json();
  if (!res.ok)
    throw new ApiClientError(json.message || "Upload failed", res.status);
  return json;
}

export async function deleteGalleryItem(
  id: string,
  token: string
): Promise<void> {
  await request(`/gallery/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Amenities ────────────────────────────────────────────────────────────────
export async function getAmenities(): Promise<{ amenities: IAmenity[] }> {
  return request<{ amenities: IAmenity[] }>("/amenities", {
    next: { revalidate: 300 },
  } as RequestInit);
}

export async function createAmenity(
  data: Partial<IAmenity>,
  token: string
): Promise<{ amenity: IAmenity }> {
  return request<{ amenity: IAmenity }>("/amenities", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateAmenity(
  id: string,
  data: Partial<IAmenity>,
  token: string
): Promise<{ amenity: IAmenity }> {
  return request<{ amenity: IAmenity }>(`/amenities/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteAmenity(id: string, token: string): Promise<void> {
  await request(`/amenities/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export async function getDashboardStats(
  token: string
): Promise<{ stats: DashboardStats }> {
  return request<{ stats: DashboardStats }>("/admin/dashboard/stats", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getRevenueData(token: string): Promise<unknown> {
  return request("/admin/dashboard/revenue", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getOccupancyData(token: string): Promise<unknown> {
  return request("/admin/dashboard/occupancy", {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getAdminBookings(
  token: string,
  page = 1
): Promise<{ bookings: IBooking[]; total: number; pages: number }> {
  return request(`/admin/bookings?page=${page}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getAdminTenants(
  token: string,
  page = 1
): Promise<{ tenants: IUser[]; total: number; pages: number }> {
  return request(`/admin/tenants?page=${page}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export async function getTenant(
  id: string,
  token: string
): Promise<{ tenant: IUser }> {
  return request<{ tenant: IUser }>(`/admin/tenants/${id}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });
}

export { ApiClientError };
