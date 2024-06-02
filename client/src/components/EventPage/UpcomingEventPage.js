import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingEvents, selectAllEvents } from '../../redux/store/eventSlice';

const UpcomingEventPage = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUpcomingEvents());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading upcoming events...</p>;
  if (status === 'failed') return <p>{error}</p>;

  const upcomingEvents = events.filter(event => new Date(event.startDate) >= new Date());

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <ul>
        {upcomingEvents.map(event => (
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

export default UpcomingEventPage;
