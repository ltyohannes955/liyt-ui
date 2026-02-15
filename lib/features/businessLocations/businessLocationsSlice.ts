import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface BusinessLocation {
  id: number;
  business_id: number;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country_code: string;
  latitude?: string;
  longitude?: string;
  instructions?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface BusinessLocationState {
  locations: BusinessLocation[];
  loading: boolean;
  error: string | null;
}

const initialState: BusinessLocationState = {
  locations: [],
  loading: false,
  error: null,
};

export const fetchBusinessLocations = createAsyncThunk(
  'businessLocations/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/business_locations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch business locations');
      }

      const data = await response.json();
      return data as BusinessLocation[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const createBusinessLocation = createAsyncThunk(
  'businessLocations/create',
  async (locationData: {
    name: string;
    country_code: string;
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    latitude?: string;
    longitude?: string;
    instructions?: string;
    active?: boolean;
  }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/business_locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create location');
      }

      const data = await response.json();
      return data as BusinessLocation;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateBusinessLocation = createAsyncThunk(
  'businessLocations/update',
  async ({ id, data }: { id: number; data: Partial<BusinessLocation> }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/business_locations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return rejectWithValue('Failed to update location');
      }

      const updatedData = await response.json();
      return updatedData as BusinessLocation;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteBusinessLocation = createAsyncThunk(
  'businessLocations/delete',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;

    if (!token) {
      return rejectWithValue('No access token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/business_locations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        return rejectWithValue('Failed to delete location');
      }

      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const businessLocationsSlice = createSlice({
  name: 'businessLocations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all locations
      .addCase(fetchBusinessLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchBusinessLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create location
      .addCase(createBusinessLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBusinessLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locations.push(action.payload);
      })
      .addCase(createBusinessLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update location
      .addCase(updateBusinessLocation.fulfilled, (state, action) => {
        const index = state.locations.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      })
      // Delete location
      .addCase(deleteBusinessLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter(l => l.id !== action.payload);
      });
  },
});

export const { clearError } = businessLocationsSlice.actions;
export default businessLocationsSlice.reducer;
