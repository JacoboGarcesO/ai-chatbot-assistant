import { useCallback, useEffect, useMemo } from 'react';
import { useAppContext } from '../../../core/state/AppContext';
import { useApiErrorHandler } from '../../../shared/hooks/useApiErrorHandler';
import { conversationsService } from '../../../core/services/conversations.service';
import {
  setConversations,
  setLoading,
  setSearchTerm,
  setStatusFilter,
} from '../../../core/state/conversations/actions';
import type { Conversation } from '../../../core/types/Conversation';

export const useConversations = () => {
  const { state, dispatch } = useAppContext();
  const { conversations, loading, searchTerm, statusFilter } = state;
  const { handleApiError } = useApiErrorHandler();

  const fetchConversations = useCallback(async (search?: string, status?: string) => {
    try {
      dispatch(setLoading(true));

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
      // Usar handleApiError de manera estable
      if (handleApiError) {
        handleApiError(err, 'useConversations.fetchConversations');
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]); // Remover handleApiError de las dependencias

  const updateSearchTerm = useCallback((term: string) => {
    dispatch(setSearchTerm(term));
  }, [dispatch]);

  const updateStatusFilter = useCallback((filter: string) => {
    dispatch(setStatusFilter(filter));
  }, [dispatch]);

  const refreshConversations = useCallback(() => {
    fetchConversations(searchTerm, statusFilter);
  }, [fetchConversations, searchTerm, statusFilter]);

  // Estabilizar fetchConversations para evitar bucles infinitos
  const stableFetchConversations = useMemo(() => fetchConversations, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      stableFetchConversations(searchTerm, statusFilter);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, stableFetchConversations]);

  useEffect(() => {
    stableFetchConversations();
  }, [stableFetchConversations]);

  return {
    conversations,
    loading,
    searchTerm,
    statusFilter,
    updateSearchTerm,
    updateStatusFilter,
    refreshConversations,
    refetch: refreshConversations
  };
}; 