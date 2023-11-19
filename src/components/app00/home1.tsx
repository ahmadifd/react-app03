import {
  createSlice,
  createAsyncThunk,
  configureStore,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostState = {
  posts: Post[];
  status: string;
  error: SerializedError | null;
};

const initialStatePost: PostState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await axios.get(POSTS_URL).then((res) => res.data);
});

const postsSlice = createSlice({
  name: "posts",
  initialState: initialStatePost,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.error = null!;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});


type RootState = ReturnType<typeof store.getState>;
const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Child1 = () => {
   const posts = useAppSelector((state) => state.posts);
   console.log(posts);

  return <></>;
};

const Home1 = () => {
  store.dispatch(fetchPosts());
  return (
    <>
      {/* <React.StrictMode> */}
      <Provider store={store}>
        <Child1 />
      </Provider>
      {/* </React.StrictMode> */}
    </>
  );
};

export default Home1;