import { createAsyncThunk, createSlice , PayloadAction} from '@reduxjs/toolkit';
import { ICustomer, IName } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            email: string;
            name: string;
            userid: string;
            api_key: string;
            google_client_id: string;
            google_client_secret: string;
            google_project_id: string;
            facebook_app_id:string,
            facebook_client_secret:string,
            instagram_business_id:string,
            password: string;
            ads: string;
            is_active:boolean;
            status: number;
        };
        prev: number;
        next: number;
        errors: any;
    };
    errors: Record<string, string>;
    items: {
        filter: {
            [key: string]: any;
            keyword: string;
            order_by: string;
            manager: number;
            status: number;
            property: number;
            page: number;
            pageSize: number;
            enable: boolean;
        };
        result: {
            data: ICustomer[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            email: '',
            userid: '',
            api_key: '',
            name: '',
            password: '',
            google_project_id: '',
            google_client_id: '',
            google_client_secret: '',
            facebook_app_id:'',
            instagram_business_id:'',
            facebook_client_secret:'',
            is_active:true,
            ads: '',
            status: 0,
        },
        prev: 0,
        next: 0,
        errors: {}
    },
    errors: {},
    items: {
        filter: {
            keyword: '',
            order_by: 'id',
            manager: 0,
            status: 0,
            property: 0,
            page: 1,
            pageSize: 10,
            enable: true
        },
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async (filter: any) => {
    const res = await getRequest('/v0/customers/sns', filter);
    return res;
});

export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async (id: string) => {
    const res = await getRequest(`/v0/customers/${id}`);
    return res;
});

export const slice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        reset: () => initialState,
        clearCurrentItem: (state: State) => {
            state.item = initialState.item;
        },
        setCurrentItem: (state: State, action) => {
            state.item = {
                ...state.item,
                form: action.payload
            };
        },
        setCurrentItemValue: (state: State, action) => {
            state.item = {
                ...state.item,
                form: {
                    ...state.item.form,
                    ...action.payload
                }
            };
        },
        // setError: (state: State, action) => {
        //     state.item = {
        //         ...state.item,
        //         errors: action.payload
        //     };
        // },
        setError: (state: State, action: PayloadAction<Record<string, string>>) => {
            console.log('setError action dispatched with payload:', action.payload);
            state.errors = action.payload;
        },
        clearError: (state: State) => {
            state.item = {
                ...state.item,
                errors: initialState.item.errors
            };
        },
        setFilter: (state: State, action) => {
            state.items = {
                ...state.items,
                filter: action.payload
            };
        },
        setFilterValue: (state: State, action) => {
            state.items = {
                ...state.items,
                filter: {
                    ...state.items.filter,
                    ...action.payload
                }
            };
        },
        clearFilter: (state: State) => {
            state.items = {
                ...state.items,
                filter: initialState.items.filter
            };
        },
        setResult: (state: State, action) => {
            state.items = {
                ...state.items,
                result: action.payload
            };
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchCustomer.fulfilled, (state, action) => {
            if (action.payload.data) {
                const { data, prev, next } = action.payload.data;
                state.item = {
                    ...state.item,
                    form: data as any,
                    prev: prev,
                    next: next
                };
            }
        });
    }
});

export const {
    reset,
    clearCurrentItem,
    setCurrentItem,
    setCurrentItemValue,
    setError,
    clearError,
    setFilter,
    setFilterValue,
    clearFilter,
    setResult
} = slice.actions;

export default slice.reducer;
