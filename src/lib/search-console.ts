/**
 * Data fetching layer για Google Search Console.
 * Τώρα επιστρέφει mock data· στο μέλλον αντικαθίσταται από GSC API calls.
 */

import type { DashboardData } from '../data/mock-dashboard';
import { mockDashboardData } from '../data/mock-dashboard';

export interface FetchDashboardOptions {
  domain?: string;
  period?: string;
  accessToken?: string;
}

/**
 * Φέρνει τα δεδομένα dashboard. Production: κλήση στο Google Search Console API.
 */
export async function fetchDashboardData(
  options: FetchDashboardOptions = {}
): Promise<DashboardData> {
  const { domain, period } = options;

  // Μελλοντικά: κλήση GSC API με accessToken
  // const response = await fetch(GSC_API_URL, { headers: { Authorization: `Bearer ${accessToken}` } });
  // return response.json();

  return Promise.resolve({
    ...mockDashboardData,
    ...(domain && { domain }),
    ...(period && { period }),
  });
}
