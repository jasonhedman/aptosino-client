import { useState, useEffect, DependencyList } from 'react';

// Define the hook with generic typing to allow for any type of value to be memoized
const useDelayedMemo = <T>(factory: () => T, dependencies: DependencyList, delay: number): T => {
    const [memoizedValue, setMemoizedValue] = useState<T>(factory());

    useEffect(() => {
        const timer = setTimeout(() => {
            setMemoizedValue(factory());
        }, delay);

        // Cleanup to avoid memory leaks
        return () => clearTimeout(timer);
    }, dependencies); // This effect runs when dependencies change.

    return memoizedValue;
}

export default useDelayedMemo;