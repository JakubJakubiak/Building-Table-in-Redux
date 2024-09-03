import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../api';
import { RootState, User } from '../types';
import { setUsers, setFilter } from '../store';

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        dispatch(setUsers(fetchedUsers));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadUsers();
  }, [dispatch]);

  const handleFilterChange = (key: keyof RootState['filters'], value: string) => {
    dispatch(setFilter({ key, value }));
  };

  const filteredUsers = users.filter((user) =>
    Object.entries(filters).every(([key, value]) => {
      const userValue = user[key as keyof User];

      if (typeof userValue === 'string') {
        return userValue.toLowerCase().includes(value.toLowerCase());
      }   
      return false;
    })
  );
  return (
    <div>
      <div className="filters">
        {Object.entries(filters).map(([key, value]) => (
          <input
            key={key}
            type="text"
            placeholder={`Filter by ${key}`}
            value={value}
            onChange={(e) => handleFilterChange(key as keyof RootState['filters'], e.target.value)}
          />
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;