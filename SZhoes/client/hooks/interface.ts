export interface UseFetchResult<T> {
    fetchData: () => void;
    status: boolean;
    data: T | null;
}
