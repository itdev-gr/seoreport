/**
 * Γεννήτρια περιόδων για το dropdown (συμβατό με Google Search Console – 16 μήνες δεδομένων).
 */

const GREEK_MONTHS = ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'];

export interface PeriodOption {
  value: string;
  label: string;
  startDate: string;
  endDate: string;
}

function formatDayMonthYear(d: Date): string {
  const day = d.getDate();
  const month = GREEK_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/** Επιστρέφει τις μηνιαίες περιόδους από τώρα και 16 μήνες πίσω (όπως GSC). */
export function getPeriodOptions(): PeriodOption[] {
  const options: PeriodOption[] = [];
  const now = new Date();

  for (let i = 0; i < 16; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const value = `${start.toISOString().slice(0, 10)}_${end.toISOString().slice(0, 10)}`;
    options.push({
      value,
      label: `${formatDayMonthYear(start)} - ${formatDayMonthYear(end)}`,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    });
  }

  return options;
}
