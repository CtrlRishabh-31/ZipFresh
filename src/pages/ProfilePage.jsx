import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import OrderList from '../components/OrderList';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';

export default function ProfilePage() {
    const { user, logout, updateUserProfile } = useAuth();
    const { addToast } = useUI();

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', phone: '' });

    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState({ label: 'Home', street: '', city: '', zip: '' });

    const startEditing = () => {
        setEditForm({ name: user.name, phone: user.phone || '' });
        setIsEditing(true);
    };

    const saveProfile = async () => {
        const result = await updateUserProfile(editForm);
        if (result.success) setIsEditing(false);
    };

    const saveAddress = async () => {
        if (!addressForm.street || !addressForm.city || !addressForm.zip) {
            addToast("Please fill all address fields", "error");
            return;
        }
        const newAddress = { id: Date.now(), ...addressForm };
        const updatedAddresses = [...(user.addresses || []), newAddress];
        const result = await updateUserProfile({ addresses: updatedAddresses });
        if (result.success) {
            setIsAddingAddress(false);
            setAddressForm({ label: 'Home', street: '', city: '', zip: '' });
        }
    };

    const deleteAddress = async (id) => {
        const updatedAddresses = user.addresses.filter(a => a.id !== id);
        await updateUserProfile({ addresses: updatedAddresses });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Col: User Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl h-fit">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl font-bold text-black mb-4">
                            {user?.name?.[0] || 'U'}
                        </div>
                        {!isEditing ? (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                                <p className="text-gray-400 mb-1">{user?.email}</p>
                                <p className="text-gray-400 mb-4">{user?.phone || 'No phone added'}</p>
                                <button onClick={startEditing} className="text-yellow-400 text-sm hover:underline flex items-center gap-1">
                                    <Edit2 className="w-3 h-3" /> Edit Profile
                                </button>
                            </>
                        ) : (
                            <div className="w-full space-y-3">
                                <input
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full p-2 rounded bg-black/40 text-white border border-white/20"
                                    placeholder="Name"
                                />
                                <input
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full p-2 rounded bg-black/40 text-white border border-white/20"
                                    placeholder="Phone"
                                />
                                <div className="flex gap-2">
                                    <button onClick={saveProfile} className="flex-1 bg-yellow-400 text-black py-1 rounded font-semibold">Save</button>
                                    <button onClick={() => setIsEditing(false)} className="flex-1 bg-white/10 text-white py-1 rounded">Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <hr className="border-white/10 my-6" />

                    <button
                        onClick={logout}
                        className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 py-2 rounded-lg font-semibold transition"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Right Col: Details */}
                <div className="md:col-span-2 space-y-8">

                    {/* Addresses */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                                <MapPin className="w-5 h-5" /> Saved Addresses
                            </h3>
                            <button onClick={() => setIsAddingAddress(true)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        {isAddingAddress && (
                            <div className="bg-black/30 p-4 rounded-xl mb-4 border border-yellow-400/30 animate-in fade-in">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input placeholder="Label (e.g. Home)" value={addressForm.label} onChange={e => setAddressForm({ ...addressForm, label: e.target.value })} className="p-2 rounded bg-black/40 text-white border border-white/10" />
                                    <input placeholder="ZIP Code" value={addressForm.zip} onChange={e => setAddressForm({ ...addressForm, zip: e.target.value })} className="p-2 rounded bg-black/40 text-white border border-white/10" />
                                    <input placeholder="Street Address" value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} className="col-span-2 p-2 rounded bg-black/40 text-white border border-white/10" />
                                    <input placeholder="City" value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} className="col-span-2 p-2 rounded bg-black/40 text-white border border-white/10" />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={saveAddress} className="bg-yellow-400 text-black px-4 py-1.5 rounded font-bold">Save</button>
                                    <button onClick={() => setIsAddingAddress(false)} className="text-gray-400 hover:text-white px-4">Cancel</button>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                            {user?.addresses?.length > 0 ? user.addresses.map(addr => (
                                <div key={addr.id} className="bg-black/20 p-4 rounded-xl border border-white/5 relative group">
                                    <p className="font-bold text-white mb-1">{addr.label}</p>
                                    <p className="text-gray-400 text-sm">{addr.street}</p>
                                    <p className="text-gray-400 text-sm">{addr.city} - {addr.zip}</p>
                                    <button onClick={() => deleteAddress(addr.id)} className="absolute top-3 right-3 text-red-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-500/20 rounded">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )) : (
                                !isAddingAddress && <p className="text-gray-500 italic">No addresses saved.</p>
                            )}
                        </div>
                    </div>

                    {/* Orders */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">My Orders</h3>
                        <OrderList />
                    </div>
                </div>
            </div>
        </div>
    );
}
