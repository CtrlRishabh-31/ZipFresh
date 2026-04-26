import { formatPrice } from '../utils/price';
import { useOrders } from '../hooks/useOrders';

export default function OrderList() {
    const { getOrders } = useOrders();
    const orders = getOrders();

    if (orders.length === 0) {
        return <p className="text-gray-500 italic">No orders yet.</p>;
    }

    return (
        <div className="space-y-4">
            {orders.map(order => (
                <div key={order.id} className="bg-black/30 p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="font-bold text-white">Order #{order.id.slice(-6)}</p>
                            <p className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-yellow-400 text-lg">{formatPrice(order.total)}</p>
                            <span className="inline-block bg-yellow-400/20 text-yellow-300 text-xs px-2 py-1 rounded-full mt-1">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-2 mt-2">
                        <p className="text-sm text-gray-300 truncate">
                            {order.items.map(i => `${i.name} (x${i.qty})`).join(', ')}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
