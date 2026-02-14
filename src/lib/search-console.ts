/**
 * Data fetching layer για Google Search Console.
 * Τώρα επιστρέφει mock data· στο μέλλον αντικαθίσταται από GSC API calls.
 */

import type { DashboardData } from '../data/mock-dashboard';
import { mockDashboardData } from '../data/mock-dashboard';

export interface FetchDashboardOptions {
  /** Domain για εμφάνιση (π.χ. example.com) */
  domain?: string;
  /** Search Console ID από το URL του GSC (resource_id) – χρήση για GSC API */
  searchConsoleId?: string;
  period?: string;
  accessToken?: string;
}

/**
 * Φέρνει τα δεδομένα dashboard. Production: κλήση στο Google Search Console API με searchConsoleId.
 */
export async function fetchDashboardData(
  options: FetchDashboardOptions = {}
): Promise<DashboardData> {
  const { domain, searchConsoleId, period } = options;

  // Μελλοντικά: κλήση GSC API με searchConsoleId (siteUrl) και accessToken
  // const siteUrl = searchConsoleId; // π.χ. sc-domain:example.com ή https://www.example.com/
  // const response = await fetch(GSC_API_URL, { headers: { Authorization: `Bearer ${accessToken}` }, body: { siteUrl, ... } });
  // return response.json();

  return Promise.resolve({
    ...mockDashboardData,
    ...(domain && { domain }),
    ...(period && { period }),
  });
}
