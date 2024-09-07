import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PostFormData = {
    title: string;
    description: string;
    is_youtube: boolean;
    is_tiktok: boolean;
    is_instagram: boolean;
    instance_dispatch: boolean;
    date?: string;
    time?: string;
    video?: ArrayBuffer | Blob; // Updated type
};

type State = {
    form: PostFormData;
    errors: Record<string, string>;
};

const initialState: State = {
    form: {
        title: '',
        description: '',
        is_youtube: true,
        is_tiktok: true,
        is_instagram: true,
        instance_dispatch: true,
        date: '',
        time: '',
        video: undefined
    },
    errors: {}
};

const postDispatchSlice = createSlice({
    name: 'postDispatch',
    initialState,
    reducers: {
        reset: (state: State) => {
            console.log('reset action dispatched');
            state.form = initialState.form;
        },
        clearCurrentItem: (state: State) => {
            console.log('clearCurrentItem action dispatched');
            state.form = initialState.form;
        },
        setCurrentItem: (state: State, action: PayloadAction<PostFormData>) => {
            console.log('setCurrentItem action dispatched with payload:', action.payload);
            state.form = action.payload;
        },
        setCurrentItemValue: (state: State, action: PayloadAction<Partial<PostFormData>>) => {
            console.log('setCurrentItemValue action dispatched with payload:', action.payload);
            state.form = {
                ...state.form,
                ...action.payload
            };
        },
        
        setVideo: (state: State, action: PayloadAction<ArrayBuffer | Blob | undefined>) => {
            console.log('setVideo action dispatched with payload:', action.payload);
            state.form.video = action.payload;
        },
        setError: (state: State, action: PayloadAction<Record<string, string>>) => {
            console.log('setError action dispatched with payload:', action.payload);
            state.errors = action.payload;
        },
        clearError: (state: State) => {
            console.log('clearError action dispatched');
            state.errors = {};
        }
    }
});

export const {
    reset,
    clearCurrentItem,
    setCurrentItem,
    setCurrentItemValue,
    setVideo,
    setError,
    clearError
} = postDispatchSlice.actions;

export default postDispatchSlice.reducer;
