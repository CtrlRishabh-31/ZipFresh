import Skeleton from './Skeleton';

export default function ProductGrid({ isLoading, products, renderItem }) {
    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white/10 p-5 rounded-2xl h-80 animate-pulse border border-white/10">
                        <Skeleton className="w-28 h-28 mx-auto mb-4 rounded-lg bg-white/20" />
                        <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-white/20 rounded" />
                        <Skeleton className="h-4 w-1/2 mx-auto mb-4 bg-white/10 rounded" />
                        <Skeleton className="h-8 w-1/3 mx-auto mb-4 bg-white/20 rounded" />
                        <Skeleton className="h-10 w-full rounded-full bg-white/20" />
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-2xl font-bold text-gray-400 mb-2">No products found</p>
                <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(renderItem)}
        </div>
    );
}
