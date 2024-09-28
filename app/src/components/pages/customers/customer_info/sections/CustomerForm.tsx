import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const CustomerForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);
    const errors = useAppSelector(state => state.customer.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());
    }, []);

    const formattedDate = currentItem?.created_at
    ? new Date(currentItem?.created_at).toISOString().split('T')[0]
    : '';


    return (
        <>
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>No</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField disabled={true} size='small' fullWidth value={currentItem?.id} />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>ソーシャルタイプ</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField disabled={true} size='small' fullWidth value={currentItem?.provider} />
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>名前</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem?.added_by?.last_name || ""}
                        onChange={e => dispatch(setCurrentItemValue({ last_name: e.target.value }))}
                        error={errors.last_name ? true : false}
                        helperText={errors.last_name ? errors.last_name : ''}
                    />
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem?.added_by?.first_name || ""}
                        onChange={e => dispatch(setCurrentItemValue({ first_name: e.target.value }))}
                        error={errors.first_name ? true : false}
                        helperText={errors.first_name ? errors.first_name : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>電話番号</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem?.added_by?.phone || ""}
                        onChange={e => dispatch(setCurrentItemValue({ phone: e.target.value }))}
                        error={errors.phone ? true : false}
                        helperText={errors.phone ? errors.phone : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            {/* <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>電話番号2</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem?.phone_2}
                        onChange={e => dispatch(setCurrentItemValue({ phone_2: e.target.value }))}
                        error={errors.phone_2 ? true : false}
                        helperText={errors.phone_2 ? errors.phone_2 : ''}
                    />
                </div>
            </div> */}

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem?.added_by?.email || ""}
                        onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
                        error={errors.email ? true : false}
                        disabled={true}
                        helperText={errors.email ? errors.email : ''}
                    />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>作成日</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        type='date'
                        size='small'
                        fullWidth
                        value={formattedDate}
                        disabled={true}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}

            {currentItem?.provider === "YOUTUBE" && (
                <>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>プロジェクトID</FormLabel>
                        <div className='w-full flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem?.youtube_project_id}
                                onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                                disabled={true}
                                error={errors.youtube_project_id ? true : false}
                                helperText={errors.youtube_project_id ? errors.youtube_project_id : ''}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>クライアントID</FormLabel>
                        <div className='w-full flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem?.youtube_client_id}
                                onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                                disabled={true}
                                error={errors?.youtube_client_id ? true : false}
                                helperText={errors?.youtube_client_id ? errors.youtube_client_id : ''}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>クライアントシークレット</FormLabel>
                        <div className='w-full flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem?.youtube_client_secret}
                                onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                                disabled={true}
                                error={errors.youtube_client_secret ? true : false}
                                helperText={errors.youtube_client_secret ? errors.youtube_client_secret : ''}
                            />
                        </div>
                    </div>
                </>
            )}



            {currentItem?.provider === "INSTAGRAM" && (
                <>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>インスタグラムビジネスID</FormLabel>
                        <div className='w-full flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem?.instagram_business_id}
                                onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                                disabled={true}
                                error={errors.instagram_business_id ? true : false}
                                helperText={errors.instagram_business_id ? errors.instagram_business_id : ''}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>アプリID</FormLabel>
                        <div className='w-full flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem?.facebook_app_id}
                                onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                                disabled={true}
                                error={errors?.facebook_app_id ? true : false}
                                helperText={errors?.facebook_app_id ? errors.facebook_app_id : ''}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>クライアントシークレット</FormLabel>
                        <div className='w-full flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem?.facebook_client_secret}
                                onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                                disabled={true}
                                error={errors.facebook_client_secret ? true : false}
                                helperText={errors.facebook_client_secret ? errors.facebook_client_secret : ''}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CustomerForm;





// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { setCurrentItemValue } from '@/store/features/customer';
// import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

// import { MenuItem, Select, TextField } from '@mui/material';
// import FormLabel from '@/components/atoms/FormLabel';

// const CustomerForm = () => {
//     const dispatch = useAppDispatch();

//     const currentItem = useAppSelector(state => state.customer.item.form);
//     const errors = useAppSelector(state => state.customer.item.errors);
//     const shared_data = useAppSelector(state => state.shared_data);

//     useEffect(() => {
//         dispatch(fetchStatusData());
//         dispatch(fetchPropertyData());
//     }, []);

//     return (
//         <>
//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>No</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField size='small' fullWidth value={currentItem?.id} />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>担当</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField size='small' fullWidth value={currentItem?.manager?.name} />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>広告媒体</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.ads}
//                         onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
//                         error={errors.ads ? true : false}
//                         helperText={errors.ads ? errors.ads : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>名前</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.last_name}
//                         onChange={e => dispatch(setCurrentItemValue({ last_name: e.target.value }))}
//                         error={errors.last_name ? true : false}
//                         helperText={errors.last_name ? errors.last_name : ''}
//                     />
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.first_name}
//                         onChange={e => dispatch(setCurrentItemValue({ first_name: e.target.value }))}
//                         error={errors.first_name ? true : false}
//                         helperText={errors.first_name ? errors.first_name : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>電話番号</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.phone}
//                         onChange={e => dispatch(setCurrentItemValue({ phone: e.target.value }))}
//                         error={errors.phone ? true : false}
//                         helperText={errors.phone ? errors.phone : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>電話番号2</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.phone_2}
//                         onChange={e => dispatch(setCurrentItemValue({ phone_2: e.target.value }))}
//                         error={errors.phone_2 ? true : false}
//                         helperText={errors.phone_2 ? errors.phone_2 : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.email}
//                         onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
//                         error={errors.email ? true : false}
//                         helperText={errors.email ? errors.email : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス2</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         size='small'
//                         fullWidth
//                         value={currentItem?.email_2}
//                         onChange={e => dispatch(setCurrentItemValue({ email_2: e.target.value }))}
//                         error={errors.email_2 ? true : false}
//                         helperText={errors.email_2 ? errors.email_2 : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>入金日</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         type='date'
//                         size='small'
//                         fullWidth
//                         value={currentItem?.deposit_date}
//                         onChange={e => dispatch(setCurrentItemValue({ deposit_date: e.target.value }))}
//                         error={errors.deposit_date ? true : false}
//                         helperText={errors.deposit_date ? errors.deposit_date : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>契約開始日</FormLabel>
//                 <div className='w-full flex gap-[8px]'>
//                     <TextField
//                         type='date'
//                         size='small'
//                         fullWidth
//                         value={currentItem?.contract_start_date}
//                         onChange={e => dispatch(setCurrentItemValue({ contract_start_date: e.target.value }))}
//                         error={errors.contract_start_date ? true : false}
//                         helperText={errors.contract_start_date ? errors.contract_start_date : ''}
//                     />
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>契約日数</FormLabel>
//                 <div className='w-full'>
//                     <Select
//                         fullWidth
//                         size='small'
//                         value={currentItem?.contract_days}
//                         onChange={e => dispatch(setCurrentItemValue({ contract_days: e.target.value }))}
//                         error={errors.contract_days ? true : false}
//                     >
//                         <MenuItem value={0}>選択する</MenuItem>
//                         <MenuItem value={30}>30日</MenuItem>
//                         <MenuItem value={60}>60日</MenuItem>
//                         <MenuItem value={90}>90日</MenuItem>
//                         <MenuItem value={180}>180日</MenuItem>
//                         <MenuItem value={365}>365日</MenuItem>
//                     </Select>

//                     {errors.contract_days && (
//                         <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.contract_days}</p>
//                     )}
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>属性</FormLabel>
//                 <div className='w-full'>
//                     <Select
//                         fullWidth
//                         size='small'
//                         value={currentItem?.property == null ? 0 : currentItem?.property}
//                         onChange={e => dispatch(setCurrentItemValue({ property: e.target.value }))}
//                         error={errors.property ? true : false}
//                     >
//                         <MenuItem value={0}>選択する</MenuItem>
//                         {shared_data.property_data.map(property => (
//                             <MenuItem value={property.id} key={property.id}>
//                                 {property.name}
//                             </MenuItem>
//                         ))}
//                     </Select>

//                     {errors.property && (
//                         <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.property}</p>
//                     )}
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>ステータス</FormLabel>
//                 <div className='w-full'>
//                     <Select
//                         fullWidth
//                         size='small'
//                         value={currentItem?.status == null ? 0 : currentItem?.status}
//                         onChange={e => dispatch(setCurrentItemValue({ status: e.target.value }))}
//                         error={errors.status ? true : false}
//                     >
//                         <MenuItem value={0}>選択する</MenuItem>
//                         {shared_data.status_data.map(status => (
//                             <MenuItem value={status.id} key={status.id}>
//                                 {status.name}
//                             </MenuItem>
//                         ))}
//                     </Select>

//                     {errors.status && <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.status}</p>}
//                 </div>
//             </div>

//             {/* ************************************************************************ */}
//             <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
//                 <FormLabel className='min-w-[134px] mt-[10px]'>システム提供</FormLabel>
//                 <div className='w-full'>
//                     <Select
//                         fullWidth
//                         size='small'
//                         value={currentItem?.system_provided == true ? 1 : 0}
//                         onChange={e => dispatch(setCurrentItemValue({ system_provided: e.target.value }))}
//                         error={errors.system_provided ? true : false}
//                     >
//                         <MenuItem value={0}>NG</MenuItem>
//                         <MenuItem value={1}>OK</MenuItem>
//                     </Select>

//                     {errors.system_provided && (
//                         <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.system_provided}</p>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CustomerForm;
