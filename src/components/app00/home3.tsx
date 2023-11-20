import {
  SerializedError,
  configureStore,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
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
  status: string;
  error: SerializedError | null;
};

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialStatePost = postsAdapter.getInitialState<PostState>({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: initialStatePost,
  reducers: {
    setAllPosts: postsAdapter.setAll,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null!;
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("failed-fetchPosts");
        state.status = "failed";
        state.error = action.error;
      });
  },
});

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
//const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//const { setAllPosts } = postsSlice.actions;

const postsSelectors = postsAdapter.getSelectors(
  (state: RootState) => state.posts
);

/////////////////////////////////////////////////////////////////////////////////

const Child1 = () => {
  const posts = useAppSelector(postsSelectors.selectTotal);
  const post = useSelector((state: RootState) =>
    postsSelectors.selectById(state, 10)
  );

  console.log(posts, "*******************", post);

  return <></>;
};

/////////////////////////////////////////////////////////////////////////////////

const Home3 = () => {
  store.dispatch(fetchPosts());

  return (
    <>
      <Provider store={store}>
        <Child1 />
      </Provider>
    </>
  );
};

export default Home3;
