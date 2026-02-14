/**
 * Λίστα πελατών για το admin panel.
 * Μελλοντικά: από DB ή API.
 */

export interface Client {
  id: string;
  name: string;
  domain: string;
  /** Search Console ID από το URL του GSC (resource_id) */
  searchConsoleId?: string;
}

export const mockClients: Client[] = [
  { id: 'acme', name: 'Acme Corp', domain: 'acme.com', searchConsoleId: 'sc-domain:acme.com' },
  { id: 'demo', name: 'Demo Company', domain: 'demo.gr', searchConsoleId: 'sc-domain:demo.gr' },
  { id: 'itdev', name: 'IT DEV', domain: 'itdev.gr', searchConsoleId: 'sc-domain:itdev.gr' },
];

export function getClientById(id: string): Client | undefined {
  return mockClients.find((c) => c.id === id);
}
