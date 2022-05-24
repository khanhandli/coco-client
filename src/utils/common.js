import { notification } from 'antd';

export const formatNumber = (number) => {
    return number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const getNotification = (desc, status) => {
    notification[status]({
        message: desc,
        placement: 'topRight',
    });
};

export const imageUpload = async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'breqd0hm');
    formData.append('cloud_name', 'hunre');

    const res = await fetch('https://api.cloudinary.com/v1_1/hunre/image/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};

export const RulesForm = {
    name: [
        {
            required: true,
            message: 'Họ tên không được để trống!',
        },
    ],
    email: [
        {
            required: true,
            message: 'Email không được bỏ trống!',
        },
        {
            type: 'email',
            message: 'Email không hợp lệ!',
        },
    ],
    password: [
        {
            required: true,
            message: 'Mật khẩu không được để trống!',
        },
        {
            min: 6,
            message: 'Mật khẩu tối thiểu 6 ký tự',
        },
    ],
    password_required: [
        {
            required: true,
            message: 'Mật khẩu không được để trống!',
        },
    ],
    re_password: [
        {
            required: true,
            message: 'Vui lòng xác nhận mật khẩu của bạn!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error('Hai mật khẩu bạn đã nhập không khớp!'));
            },
        }),
    ],
};
