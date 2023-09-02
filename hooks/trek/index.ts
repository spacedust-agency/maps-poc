import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../api-service/axios';

export interface TrekPayload {
  name: string;
  description: string;
  duration: string;
  price: number;
  location: string;
  altitude: string;
  bestTime: string;
  pickupPoint: string;
  difficultyLevel: string;
  state: string;
}

export interface filteringTrekParams {
  take: number;
  skip: number;
  orderBy: string;
  orderType: string;
  location?: any;
  month?: any;
  duration?: any;
  difficulty?: any;
  keyword?: any;
}

const getAllTreks = async (params?: any) => {
  const url = '/treks';
  const resp = await api.get(url, { params });
  return resp.data;
};

const useAllTreks = (params?: any) => {
  return useQuery(['treks'], () => getAllTreks(params));
};

export {
  getAllTreks,
  useAllTreks
};
