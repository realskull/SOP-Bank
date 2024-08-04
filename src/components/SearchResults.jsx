import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import RecommendationCard from './Recs/RecommendationCard';
import LoadingOverlay from './Recs/LoadingOverlay';
import '../css/SearchResults.css';

const PAGE_SIZE = 10;

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError('');
            try {
                // Query essays
                const essaysQuery = query(
                    collection(db, 'Essays'),
                    where('title', '>=', searchQuery),
                    where('title', '<=', searchQuery + '\uf8ff'),
                    orderBy('title'),
                    limit(PAGE_SIZE * page)
                );
                const essaysSnapshot = await getDocs(essaysQuery);
                const essays = essaysSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Query articles (if applicable)
                // Similar query for articles can be added here

                setResults(essays); // Combine results if needed
                setHasMore(essays.length === PAGE_SIZE * page);
            } catch (error) {
                setError('Failed to load search results. ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchQuery, page]);

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    if (loading) return <div className="search-results"><LoadingOverlay /></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="search-results">
            <h1>Search Results for "{searchQuery}"</h1>
            <div className="results-grid">
                {results.length > 0 ? (
                    results.map(result => (
                        <RecommendationCard
                            key={result.id}
                            title={result.title}
                            description={result.description}
                            link={`/essay/${result.id}`} // Update link for articles as needed
                        />
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
            {hasMore && (
                <button onClick={handleLoadMore} className="load-more-button">
                    Load More
                </button>
            )}
        </div>
    );
};

export default SearchResults;
