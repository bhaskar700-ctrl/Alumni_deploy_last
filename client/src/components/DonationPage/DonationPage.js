import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDonationHistory, resetDonationState } from '../../redux/store/donationSlice';
import { Link } from 'react-router-dom';

const DonationPage = () => {
    const dispatch = useDispatch();
    const { history, status, error } = useSelector(state => state.donations);

    useEffect(() => {
        dispatch(fetchDonationHistory());

        // Clean up state on component unmount
        return () => {
            dispatch(resetDonationState());
        };
    }, [dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Donation History</h1>
            <Link to="/make-donation">
                <button>Make a New Donation</button>
            </Link>
            <Link to="/donation-analytics">
                <button>View Donation Analytics</button>
            </Link>
            {history.length ? (
                <ul>
                    {history.map((donation) => (
                        <li key={donation._id}>
                            <strong>Amount:</strong> {donation.amount} INR <br />
                            <strong>Message:</strong> {donation.message || 'No message'} <br />
                            <strong>Status:</strong> {donation.status} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No donations found.</p>
            )}
        </div>
    );
};

export default DonationPage;
