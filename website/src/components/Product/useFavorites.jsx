import { useState, useEffect } from 'react';
import a from '../../services/axiosInstance';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Получить список избранных с сервера
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await a.get('favorites/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // подстрой под свою аутентификацию
        },
      });
      setFavorites(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Добавить или убрать товар из избранного
  const toggleFavorite = async (productId) => {
    try {
      await a.post(
        `/favorites/${productId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Обновить список после изменения
      fetchFavorites();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    fetchFavorites,
  };
}
