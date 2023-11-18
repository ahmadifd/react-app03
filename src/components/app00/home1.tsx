import {
  PayloadAction,
  SerializedError,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostState = {
  posts: Post[];
  isloading: boolean;
  error?: SerializedError;
};

const initialStatePost: PostState = {
  posts: [],
  isloading: false,
  error: undefined,
};

const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/`)
    .then((res) => res.data);
});

const csPosts = createSlice({
  name: "csPosts",
  initialState: initialStatePost,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.isloading = true;
      state.error = null!;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.error = null!;
      state.isloading = false;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error;
    });
  },
});

const store = configureStore({
  reducer: {
    rcPosts: csPosts.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Child1 = () => {
  const { posts, isloading, error } = useAppSelector((state) => state.rcPosts);


  useEffect(() => {
    // const sum = posts.reduce((s, i) => (s += i.id),0);
    console.log(posts);
  }, [posts]);

  return <>{""}</>;
};

const Child2 = () => {
  useEffect(() => {
    console.log("Child2");
  }, []);
  return <>Child2</>;
};

const Childs = () => {
  const dispatch = useAppDispatch();
  dispatch(getAllPosts());
  return (
    <>
      <Child1 />
      <Child2 />
    </>
  );
};

const Home1 = () => {
  return (
    <>
      {/* <React.StrictMode> */}
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Childs />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      {/* </React.StrictMode> */}
    </>
  );
};

export default Home1;
