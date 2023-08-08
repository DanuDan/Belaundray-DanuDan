export default function ShimmerLoading({className}) {
    return (
        <div className={`h-2 bg-slate-300 rounded animate-pulse ${className}`} />
    )
}