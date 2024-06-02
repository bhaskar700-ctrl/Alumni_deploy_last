import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPastEvents, selectAllEvents } from '../../redux/store/eventSlice';

const PastEventPage = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPastEvents());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading past events...</p>;
  if (status === 'failed') return <p>{error}</p>;

  const pastEvents = events.filter(event => new Date(event.startDate) < new Date());

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Past Events</h2>
      <ul>
        {pastEvents.map(event => (
          <li key={event._id} className="mb-2">
            <h3 className="text-xl">{event.title}</h3>
            <p>{new Date(event.startDate).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastEventPage;
