import moment from 'moment';

const Notification = ({ item }) => {
    console.log('🚀 ~ file: Notification.jsx ~ line 2 ~ Notification ~ item', item);
    return (
        <div className="w-full p-3 mt-2 bg-white rounded-2xl shadow-lg flex">
            <div className="w-[4.6rem] h-8 border rounded-full border-gray-200 flex items-center justify-center">
                <img className="h-[16px] w-[16px]" src={item.img} alt="avt" />
            </div>
            <div className="pl-3">
                <p className="text-sm mb-1 leading-5" dangerouslySetInnerHTML={{ __html: item.title }} />

                <p className="text-xs leading-3 pt-1 text-gray-500">{moment(item.createdAt).fromNow()}</p>
            </div>
        </div>
    );
};
export default Notification;
