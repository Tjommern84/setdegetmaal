import { getSupabase } from './supabaseClient';

export type Service = {
  id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  logo_image_url: string | null;
  address: string | null;
  rating_avg: number;
  rating_count: number;
  distance_km: number | null;
};

export type SearchOptions = {
  mainCategory: string;
  tags?: string[];
  city: string;
  lat: number;
  lon: number;
  limit?: number;
};

export async function searchServices(opts: SearchOptions): Promise<Service[]> {
  const { data, error } = await getSupabase().rpc('search_services', {
    p_main_category: opts.mainCategory,
    p_tags: opts.tags ?? null,
    p_city: opts.city.toLowerCase(),
    p_lat: opts.lat,
    p_lon: opts.lon,
    p_limit: opts.limit ?? 3,
    p_offset: 0,
    p_sort: 'best_match',
    p_query: null,
    p_type: null,
    p_venue: null,
    p_max_price: null,
    p_goal: null,
    p_min_rating: null,
    p_radius_km: null,
    p_service_id: null,
  });

  if (error) throw error;

  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    cover_image_url: (row.cover_image_url as string | null) ?? null,
    logo_image_url: (row.logo_image_url as string | null) ?? null,
    address: (row.address as string | null) ?? null,
    rating_avg: (row.rating_avg as number) ?? 0,
    rating_count: (row.rating_count as number) ?? 0,
    distance_km: typeof row.distance_km === 'number' ? row.distance_km : null,
  }));
}
