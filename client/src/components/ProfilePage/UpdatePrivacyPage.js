import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserProfile, updatePrivacySettings } from '../../redux/store/userSlice'; // Corrected imports

const UpdatePrivacyPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, status, error } = useSelector((state) => state.user); // Assuming state shape based on UserSlice

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId, status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const privacySettings = {
      showEmail: formData.get('showEmail') === 'on',
      showPhone: formData.get('showPhone') === 'on',
      // Add more fields as necessary
    };

    dispatch(updatePrivacySettings({ userId, privacySettings }))
      .unwrap()
      .then(() => {
        navigate(`/profile/${userId}`); // Adjust as necessary
      })
      .catch((error) => {
        console.error('Failed to update privacy settings:', error);
        // Optionally, handle/display the error
      });
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Update Privacy Settings</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for privacy settings */}
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default UpdatePrivacyPage;
