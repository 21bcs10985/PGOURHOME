// ─── User ────────────────────────────────────────────────────────────────────
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "tenant" | "admin";
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Room ─────────────────────────────────────────────────────────────────────
export type RoomType = "single" | "double" | "triple";
export type RoomStatus = "available" | "occupied" | "maintenance";

export interface RoomImage {
  url: string;
  publicId: string;
  _id?: string;
}

export interface IRoom {
  _id: string;
  roomNumber: string;
  roomType: RoomType;
  title: string;
  description: string;
  price: number;
  securityDeposit: number;
  occupancy: number;
  roomSize: number;
  floor: number;
  images: RoomImage[];
  amenities: string[];
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedRooms {
  rooms: IRoom[];
  total: number;
  pages: number;
  page: number;
}

export interface RoomFilters {
  roomType?: RoomType | "";
  status?: RoomStatus | "";
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}

// ─── Booking ──────────────────────────────────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface IBooking {
  _id: string;
  user: IUser | string;
  room: IRoom | string;
  name: string;
  phone: string;
  email: string;
  moveInDate: string;
  duration: number;
  occupants: number;
  monthlyRent: number;
  securityDeposit: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  room: string;
  name: string;
  phone: string;
  email: string;
  moveInDate: string;
  duration: number;
  occupants: number;
}

// ─── Visit Request ────────────────────────────────────────────────────────────
export type VisitStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface IVisitRequest {
  _id: string;
  user?: IUser | string;
  name: string;
  phone: string;
  email: string;
  roomType?: RoomType;
  preferredDate: string;
  preferredTime: string;
  numberOfVisitors: number;
  message?: string;
  status: VisitStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VisitFormData {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  numberOfVisitors: number;
  roomType?: RoomType | "";
  message?: string;
}

// ─── Maintenance ──────────────────────────────────────────────────────────────
export type MaintenanceCategory =
  | "electrical"
  | "plumbing"
  | "internet"
  | "furniture"
  | "cleaning"
  | "other";
export type MaintenancePriority = "low" | "medium" | "high";
export type MaintenanceStatus = "submitted" | "in-progress" | "resolved";

export interface IMaintenanceRequest {
  _id: string;
  user: IUser | string;
  room?: IRoom | string;
  category: MaintenanceCategory;
  description: string;
  image?: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────
export interface IReview {
  _id: string;
  user: IUser | string;
  name: string;
  role: string;
  rating: number;
  review: string;
  profileImage: string | null;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Amenity ──────────────────────────────────────────────────────────────────
export interface IAmenity {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export type GalleryCategory = "Rooms" | "Common Areas" | "Dining" | "Exterior";

export interface IGallery {
  _id: string;
  title: string;
  image: string;
  publicId: string;
  category: GalleryCategory;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: IUser;
}

// ─── API Error ────────────────────────────────────────────────────────────────
export interface ApiError {
  message: string;
  errors?: { field: string; message: string }[];
  status?: number;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  totalBookings: number;
  pendingBookings: number;
  totalTenants: number;
  pendingVisits: number;
  pendingMaintenance: number;
  occupancyRate: number;
}

// ─── Auth Context ─────────────────────────────────────────────────────────────
export interface AuthContextValue {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: IUser) => void;
}
