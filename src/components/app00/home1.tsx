import {
  createSlice,
  createAsyncThunk,
  configureStore,
  SerializedError,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await axios.get(POSTS_URL).then((res) => res.data);
});

const addNewPosts = createAsyncThunk(
  "posts/addNewPosts",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialStatePost,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        console.log("loading-fetchPosts");
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log("fulfilled-fetchPosts");
        state.status = "succeeded";
        state.posts = action.payload;
        state.error = null!;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("failed-fetchPosts");
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addNewPosts.pending, (state, action) => {
        console.log("pending-addNewPost");
        state.status = "loading";
      })
      .addCase(addNewPosts.fulfilled, (state, action) => {
        console.log("fulfilled-addNewPost");
        state.status = "succeeded";
        state.posts.push(action.payload);
        state.error = null!;
      })
      .addCase(addNewPosts.rejected, (state, action) => {
        console.log("rejected-addNewPost");
        state.status = "failed";
        state.error = action.error;
      });
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  return await axios.get(POSTS_URL).then((res) => res.data);
});

const addNewPost = createAsyncThunk("post/addNewPost", async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost);
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: initialStatePost,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        console.log("loading-fetchPosts");
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        console.log("fulfilled-fetchPosts");
        state.status = "succeeded";
        state.posts = action.payload;
        state.error = null!;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        console.log("failed-fetchPosts");
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addNewPost.pending, (state, action) => {
        console.log("pending-addNewPost");
        state.status = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log("fulfilled-addNewPost");
        state.status = "succeeded";
        state.posts.push(action.payload);
        state.error = null!;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        console.log("rejected-addNewPost");
        state.status = "failed";
        state.error = action.error;
      });
  },
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    post: postSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const postSlice_posts = (state: RootState) => state.posts;
const create_Posts = createSelector([postSlice_posts], (postSlice_posts) => {
  return postSlice_posts;
});

const create_Post_Plus5 = createSelector(
  [postSlice_posts, (items, num: number) => num],
  (postSlice_posts, num) => {
    return { x: postSlice_posts.posts.length + num };
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Child1 = ({ name }: { name: string }) => {
  console.log(`${name}-Start`);

  const dispatch = useDispatch();
  const posts = useAppSelector((state: RootState) => {
    console.log(`${name}-useAppSelector`, state);
    return state.posts;
  });

  useEffect(() => {
    console.log(`${name}-Mount`);
  }, []);
  useEffect(() => {
    console.log(`${name}-Change`, posts);
  }, [posts]);

  function addpost() {
    dispatch(addNewPosts({ id: 0, userId: 1, title: "1", body: "1" }));
  }

  return (
    <>
      <button onClick={addpost}>Add Button {name}</button>
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Child2 = ({ name }: { name: string }) => {
  console.log(`${name}-Start`);

  const dispatch = useDispatch();
  const post = useAppSelector(create_Posts);
  const postPlusNum = useAppSelector((state) => create_Post_Plus5(state, 10));
  // useAppSelector((state: RootState) => {
  //   console.log(`${name}-useAppSelector`, state);
  //   return state.post;
  // });

  //useAppSelector(create_Posts);

  useEffect(() => {
    console.log(`${name}-Mount`);
  }, []);
  useEffect(() => {
    console.log(`${name}-Change`, post, postPlusNum);
  }, [post]);

  function addpost() {
    dispatch(addNewPost({ id: 0, userId: 1, title: "1", body: "1" }));
  }

  return (
    <>
      <button onClick={addpost}>Add Button {name}</button>
    </>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Home1 = () => {
  console.log("Home1-Start");
  store.dispatch(fetchPosts());
  store.dispatch(fetchPost());

  useEffect(() => {
    console.log("Home1-Mount");
  }, []);
  useEffect(() => {
    console.log("Home1-Change");
  });

  return (
    <>
      {/* <React.StrictMode> */}
      <Provider store={store}>
        <Child1 name="Child1" />
        <Child2 name="Child2" />
      </Provider>
      {/* </React.StrictMode> */}
    </>
  );
};

export default Home1;
