'use client';

import { createSlice } from '@reduxjs/toolkit';
import uuidv4 from 'src/utils/uuidv4';
import { apiSlice } from './apiSlice';

const initialState = {
  collections: [
    {
      name: 'Winter Collection', // Default name
      products: [
        {
          _id: '123',
          url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
          brandName: 'J.',
          price: 123,
          currency: 'USD',
          image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
          title: 'Winter Wear',
          description: 'A warm and stylish jacket for winter',
          buttonTitle: 'Get it Yourself!',
          buttonUrl: '',
        },
      ], // Default empty products array
      _id: '123', // Default ID
      visibility: true,
    },
    {
      name: 'Summer Collection', // Default name
      products: [
        {
          _id: '122',
          url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
          brandName: 'J.',
          price: 122,
          currency: 'USD',
          image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
          title: 'Winter Wear',
          description: 'A warm and stylish jacket for winter',
          buttonTitle: 'Get it Yourself!',
          buttonUrl: '',
        },
      ], // Default empty products array
      _id: '1343', // Default ID
      visibility: true,
    },
  ],
  pinnedProducts: {
    name: 'Pinned Products',
    productsList: [
      {
        _id: '123',
        url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
        brandName: 'J.',
        price: 123,
        image: 'https://m.media-amazon.com/images/I/61JbzM+aWzL._AC_SY300_SX300_.jpg',
        title: 'Pinned Product 1',
        description: 'A warm and stylish jacket for winter',
        visibility: true,
      },
      {
        _id: '124',
        url: 'https://www.amazon.com/Self-Locking-Automatic-Gravity-Wooden-Resistance/dp/B08MYBQ9Q3/?_encoding=UTF8&pd_rd_w=8xm7D&content-id=amzn1.sym.d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_p=d6aaa73e-4455-44fa-88a3-6e1ae26769ee&pf_rd_r=GVWEWYC8A1Q3NT8SB2DT&pd_rd_wg=ixrH4&pd_rd_r=3aedbcbe-09a2-4994-8855-76403b8ab2c4&ref_=pd_hp_d_btf_exports_top_sellers_unrec',
        brandName: 'J.',
        price: 123,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiaAhX6KGLzOkJnwm6p31VyX3iq9VnkR7oVA&s',
        title: 'Pinned Product 2',
        description: 'A warm and stylish jacket for winter',
        visibility: true,
      },
    ], // Default empty list
    visibility: false,
  },
  visibility: true,
  loading: false,
  error: null,
  message: '',
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCollectionsData: (state, action) => {
      state.collections = action.payload;
    },
    setPinnedProductData: (state, action) => {
      state.pinnedProducts = action.payload;
    },
    setPinnedProductsTitle: (state, action) => {
      state.pinnedProducts.name = action.payload;
    },
    setPinnedProductsList: (state, action) => {
      state.pinnedProducts.productsList = action.payload;
    },

    removePinnedProductItem: (state, action) => {
      const itemToRemove = action.payload;
      const updatedList = state.pinnedProducts.productsList.filter(
        (item) => item._id !== itemToRemove._id
      );
      state.pinnedProducts.productsList = updatedList;
    },
    togglePinnedProductsVisibility: (state) => {
      state.pinnedProducts.visibility = !state.pinnedProducts.visibility;
    },

    setNewCollection: (state, action) => {
      state.collections = [
        ...state.collections,
        { name: action.payload, products: [], visibility: true, _id: uuidv4() },
      ];
    },
    removeCollection: (state, action) => {
      state.collections = state.collections.filter(
        (collection) => collection.name !== action.payload
      );
    },
    editCollectionProducts: (state, action) => {
      const { collectionName, updatedProduct } = action.payload;
      const collectionIndex = state.collections.findIndex(
        (collection) => collection.name === collectionName
      );

      if (collectionIndex !== -1) {
        state.collections[collectionIndex].products = [
          ...state.collections[collectionIndex].products,
          updatedProduct,
        ];
      }
    },
    removeProductFromCollection: (state, action) => {
      const { collectionId, productId } = action.payload;
      const collectionIndex = state.collections.findIndex(
        (collection) => collection._id === collectionId
      );

      if (collectionIndex !== -1) {
        // Filter out the product with the specified _id
        state.collections[collectionIndex].products = state.collections[
          collectionIndex
        ].products.filter((product) => product._id !== productId);
      }
    },
  },
  extraReducers: (builder) => {
    // GET Shop
    builder
      .addMatcher(apiSlice.endpoints.getShop.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getShop.matchFulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload?.data', action.payload?.data);
        state.name = action.payload?.data?.name || '';
        state.collections = action.payload?.data?.collections || [];
        state.pinnedProducts = action.payload?.data?.pinnedProducts || [];
        state.visibility = action.payload?.data?.visibility || true;
        state.message = action.payload?.message;
      })
      .addMatcher(apiSlice.endpoints.getShop.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch profile';
      });

    // Handle getCollections API states
    builder
      .addMatcher(apiSlice.endpoints.getCollections.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getCollections.matchFulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload?.data', action.payload?.data);
        state.collections = action.payload?.data || [];
        state.message = action.payload?.message;
      })
      .addMatcher(apiSlice.endpoints.getCollections.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch Collectiobs';
      });

    // TODO: Create Collection (DATA)
    builder
      .addMatcher(apiSlice.endpoints.createCollection.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.createCollection.matchFulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload?.data', action.payload?.data);
        const newCollections = action.payload?.data;
        state.collections = newCollections;
        // if (newCollection) {
        //   // Check if the collection already exists by name
        //   const collectionIndex = state.collections.findIndex(
        //     (col) => col.name === newCollection.name
        //   );

        //   if (collectionIndex === -1) {
        //     // Add if it doesn't exist
        //     state.collections.push(newCollection);
        //   } else {
        //     // Update the existing collection if needed
        //     state.collections[collectionIndex] = newCollection;
        //   }
        // }

        state.message = action.payload?.message;
      })
      .addMatcher(apiSlice.endpoints.createCollection.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch profile';
      });

    builder
      .addMatcher(apiSlice.endpoints.updateSingleProductCollection.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        apiSlice.endpoints.updateSingleProductCollection.matchFulfilled,
        (state, action) => {
          state.loading = false;
          console.log('action.payload?.data', action.payload?.data);
          const newCollection = action.payload?.data;
          if (newCollection) {
            // Check if the collection already exists by name
            const collectionIndex = state.collections.findIndex(
              (col) => col.name === newCollection.name
            );

            if (collectionIndex === -1) {
              // Add if it doesn't exist
              state.collections.push(newCollection);
            } else {
              // Update the existing collection if needed
              state.collections[collectionIndex] = newCollection;
            }
          }

          state.message = action.payload?.message;
        }
      )
      .addMatcher(
        apiSlice.endpoints.updateSingleProductCollection.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Failed to fetch profile';
        }
      );
  },
});

export const {
  setLoading,
  setError,
  setCollectionsData,
  setPinnedProductData,
  setPinnedProductsTitle,
  setPinnedProductsList,
  removePinnedProductItem,
  togglePinnedProductsVisibility,
  setNewCollection,
  removeCollection,
  editCollectionProducts,
  removeProductFromCollection,
} = shopSlice.actions;

export default shopSlice.reducer;
