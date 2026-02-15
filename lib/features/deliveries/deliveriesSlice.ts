import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface DeliveryStop {
  id: number;
  kind: string;
  sequence: number;
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country_code?: string;
  latitude?: string;
  longitude?: string;
  contact_name?: string;
  contact_phone?: string;
  instructions?: string;
}

export interface DeliveryItem {
  id: number;
  name: string;
  quantity: number;
}

export interface Delivery {
  id: number;
  public_id: string;
  status: string;
  price: number;
  description?: string;
  business_id: number;
  driver_id: number | null;
  customer_id: number | null;
  accepted_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  stops?: DeliveryStop[];
  items?: DeliveryItem[];
}

interface DeliveryState {
  deliveries: Delivery[];
  currentDelivery: Delivery | null;
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryState = {
  deliveries: [],
  currentDelivery: null,
  loading: false,
  error: null,
};

export const fetchDeliveries = createAsyncThunk(
  'deliveries/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deliveries`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch deliveries');
      }

      const data = await response.json();
      return data as Delivery[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchDeliveryById = createAsyncThunk(
  'deliveries/fetchById',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deliveries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch delivery');
      }

      const data = await response.json();
      return data as Delivery;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const createDelivery = createAsyncThunk(
  'deliveries/create',
  async (deliveryData: {
    description?: string;
    price?: number;
    recipient_email: string;
    pickup: {
      address1: string;
      address2?: string;
      city: string;
      region: string;
      postal_code?: string;
      country_code: string;
      latitude?: string;
      longitude?: string;
      contact_name: string;
      contact_phone: string;
      instructions?: string;
    };
    items: { name: string; quantity: number }[];
  }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deliveries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(deliveryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create delivery');
      }

      const data = await response.json();
      return data as Delivery;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const cancelDelivery = createAsyncThunk(
  'deliveries/cancel',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deliveries/${id}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        return rejectWithValue('Failed to cancel delivery');
      }

      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    clearCurrentDelivery: (state) => {
      state.currentDelivery = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all deliveries
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch delivery by ID
      .addCase(fetchDeliveryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDelivery = action.payload;
      })
      .addCase(fetchDeliveryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create delivery
      .addCase(createDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveries.unshift(action.payload);
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Cancel delivery
      .addCase(cancelDelivery.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.deliveries.findIndex(d => d.id === id);
        if (index !== -1) {
          state.deliveries[index].status = 'cancelled';
        }
        if (state.currentDelivery?.id === id) {
          state.currentDelivery.status = 'cancelled';
        }
      });
  },
});

export const { clearCurrentDelivery, clearError } = deliveriesSlice.actions;
export default deliveriesSlice.reducer;
