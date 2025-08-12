import { useCallback, useEffect } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { conversationsService } from '../../../core/services/conversations.service';
import {
  setConversations,
  setLoading,
  setError,
  setSearchTerm,
  setStatusFilter,
  clearError
} from '../../../core/state/conversations/actions';
import type { Conversation } from '../../../core/types/Conversation';

export const useConversations = () => {
  const { state, dispatch } = useAppContext();
  const { conversations, loading, error, searchTerm, statusFilter } = state;

  const fetchConversations = useCallback(async (search?: string, status?: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      let data: Conversation[];

      if (search && search.trim()) {
        data = await conversationsService.searchConversations(search.trim());
      } else {
        const filters: { status?: string; customer?: string } = {};
        if (status && status !== 'all') {
          filters.status = status;
        }
        data = await conversationsService.listConversations(filters);
      }

      dispatch(setConversations(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch conversations';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const updateSearchTerm = useCallback((term: string) => {
    dispatch(setSearchTerm(term));
  }, [dispatch]);

  const updateStatusFilter = useCallback((filter: string) => {
    dispatch(setStatusFilter(filter));
  }, [dispatch]);

  const refreshConversations = useCallback(() => {
    fetchConversations(searchTerm, statusFilter);
  }, [fetchConversations, searchTerm, statusFilter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchConversations(searchTerm, statusFilter);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, fetchConversations]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    loading,
    error,
    searchTerm,
    statusFilter,
    updateSearchTerm,
    updateStatusFilter,
    refreshConversations,
    refetch: refreshConversations
  };
}; 