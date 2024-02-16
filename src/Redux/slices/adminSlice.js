import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMovieAPI,
  deleteMovie,
  getMovieDetails,
  getMoviesAPI,
  updateMovie,
} from "../../apis/movieAPI";
import { getCinemaTheater, getLogoCinemaAPI } from "../../apis/cinemaAPI";
import { createShowTime } from "../../apis/TicketAPI";
const initialState = {
  movies: [],
  movie: {},
  isLoading: false,
  error: null,
  search: "",
  cinemaSystem: [],
  cinemaTheater: [],
};

// get list
export const getMovies = createAsyncThunk(
  "home/admin/getMovies",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { search } = getState().admin;

      const data = await getMoviesAPI(search);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// add film
export const addMovie = createAsyncThunk(
  "home/admin/addMovie",
  async (movie, { dispatch, rejectWithValue }) => {
    try {
      await createMovieAPI(movie);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete film
export const deleteMoviee = createAsyncThunk(
  "home/admin/deleteMovie",
  async (movieId, { dispatch, rejectWithValue }) => {
    try {
      await deleteMovie(movieId);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// edit film
export const getMovieDetail = createAsyncThunk(
  "home/admin/getMovieDetail",
  async (movieId, { rejectWithValue }) => {
    try {
      const data = await getMovieDetails(movieId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update film
export const updateMovies = createAsyncThunk(
  "home/admin/updateMovie",
  async (movieId, { dispatch, rejectWithValue }) => {
    try {
      await updateMovie(movieId);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// lấy hệ thống rạp
export const showtimes = createAsyncThunk(
  "home/admin/showtimes",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getLogoCinemaAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// lấy cụm rạp
export const theater = createAsyncThunk(
  "home/admin/theater",
  async (cinemaId, { rejectWithValue }) => {
    try {
      const data = await getCinemaTheater(cinemaId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// thêm lịch chiếu
export const booking = createAsyncThunk(
  "home/admin/booking",
  async (movie, { dispatch, rejectWithValue }) => {
    try {
      await createShowTime(movie);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
  name: "home/admin/movies",
  initialState,
  reducers: {
    changeSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.isLoading = false;
    });
    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getMovieDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieDetail.fulfilled, (state, { payload }) => {
      state.movie = payload;
      state.isLoading = false;
    });
    builder.addCase(getMovieDetail.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(showtimes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(showtimes.fulfilled, (state, { payload }) => {
      state.cinemaSystem = payload;
      state.isLoading = false;
    });
    builder.addCase(showtimes.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(theater.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(theater.fulfilled, (state, { payload }) => {
      state.cinemaTheater = payload;
      state.isLoading = false;
    });
    builder.addCase(theater.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const { changeSearch } = adminSlice.actions;

export default adminSlice.reducer;
