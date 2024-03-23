import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/domain';

import { InputAdornment, TextField } from '@mui/material';
import { IoSearch } from 'react-icons/io5';

const Filter = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.domain.items.filter);

    return (
        <div className='w-full flex items-center justify-end mb-[16px]'>
            <TextField
                size='small'
                value={filter.keyword}
                onChange={e => dispatch(setFilterValue({ keyword: e.target.value }))}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <IoSearch />
                        </InputAdornment>
                    )
                }}
                placeholder='検索ワードを入力'
            />
        </div>
    );
};

export default Filter;
