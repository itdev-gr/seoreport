/**
 * Mock data για το SEO Report.
 * Αντικαθίσταται από Google Search Console API στο μέλλον.
 */

export interface MetricSparkPoint {
  value: number;
  date: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  sparkData: number[];
  icon: string;
}

export interface KeywordRow {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  change: number;
}

export interface PageRow {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  change: number;
}

export interface DashboardData {
  domain: string;
  period: string;
  metrics: {
    impressions: MetricCardData;
    clicks: MetricCardData;
    position: MetricCardData;
    ctr: MetricCardData;
    totalClicks: MetricCardData;
    totalKeywords: MetricCardData;
  };
  topKeywords: KeywordRow[];
  topPages: PageRow[];
}

export const mockDashboardData: DashboardData = {
  domain: 'example.com',
  period: 'Τελευταίος Μήνας',
  metrics: {
    impressions: {
      title: 'Εμφανίσεις',
      value: '124.532',
      change: 12.4,
      changeLabel: 'vs προηγ. περίοδο',
      sparkData: [98000, 102000, 105000, 110000, 115000, 118000, 122000, 124532],
      icon: 'eye',
    },
    clicks: {
      title: 'Κλικ',
      value: '3.842',
      change: 8.2,
      sparkData: [3200, 3400, 3500, 3600, 3700, 3780, 3820, 3842],
      icon: 'click',
    },
    position: {
      title: 'Μέση Θέση',
      value: '12.4',
      change: -0.8,
      sparkData: [14.2, 13.8, 13.5, 13.2, 12.9, 12.7, 12.5, 12.4],
      icon: 'position',
    },
    ctr: {
      title: 'CTR',
      value: '3.08%',
      change: 0.3,
      sparkData: [2.6, 2.7, 2.8, 2.9, 2.95, 3.0, 3.05, 3.08],
      icon: 'ctr',
    },
    totalClicks: {
      title: 'Σύνολο Οργανικών Κλικ',
      value: '3.842',
      change: 8.2,
      sparkData: [3200, 3400, 3500, 3600, 3700, 3780, 3820, 3842],
      icon: 'total-clicks',
    },
    totalKeywords: {
      title: 'Σύνολο Λέξεων Κλειδιών',
      value: '1.247',
      change: 5.1,
      sparkData: [1100, 1150, 1180, 1200, 1220, 1235, 1240, 1247],
      icon: 'keywords',
    },
  },
  topKeywords: [
    { keyword: 'seo ελλάδα', clicks: 420, impressions: 15200, ctr: 2.76, position: 4.2, change: 0.3 },
    { keyword: 'ψηφιακό marketing', clicks: 318, impressions: 9800, ctr: 3.24, position: 6.1, change: -0.5 },
    { keyword: 'web design αθήνα', clicks: 285, impressions: 7200, ctr: 3.95, position: 5.8, change: 0.8 },
    { keyword: 'διαφήμιση google', clicks: 256, impressions: 6500, ctr: 3.94, position: 7.2, change: -0.2 },
    { keyword: 'seo υπηρεσίες', clicks: 198, impressions: 5200, ctr: 3.81, position: 8.1, change: 0.4 },
    { keyword: 'βελτιστοποίηση μηχανών αναζήτησης', clicks: 176, impressions: 4800, ctr: 3.67, position: 9.2, change: -0.1 },
    { keyword: 'content marketing', clicks: 154, impressions: 4100, ctr: 3.76, position: 10.5, change: 0.6 },
    { keyword: 'social media management', clicks: 132, impressions: 3800, ctr: 3.47, position: 11.2, change: -0.3 },
    { keyword: 'ecommerce seo', clicks: 118, impressions: 3200, ctr: 3.69, position: 12.1, change: 0.2 },
    { keyword: 'local seo', clicks: 95, impressions: 2800, ctr: 3.39, position: 13.4, change: 0.5 },
  ],
  topPages: [
    { url: 'https://example.com/', clicks: 520, impressions: 18500, ctr: 2.81, position: 3.8, change: 0.2 },
    { url: 'https://example.com/blog', clicks: 385, impressions: 12200, ctr: 3.16, position: 5.2, change: -0.4 },
    { url: 'https://example.com/υπηρεσίες', clicks: 298, impressions: 8900, ctr: 3.35, position: 6.1, change: 0.5 },
    { url: 'https://example.com/επικοινωνία', clicks: 156, impressions: 4200, ctr: 3.71, position: 8.4, change: -0.1 },
    { url: 'https://example.com/blog/seo-tips', clicks: 142, impressions: 3800, ctr: 3.74, position: 9.2, change: 0.7 },
    { url: 'https://example.com/portfolio', clicks: 128, impressions: 3500, ctr: 3.66, position: 10.1, change: 0.3 },
    { url: 'https://example.com/blog/content-strategy', clicks: 98, impressions: 2800, ctr: 3.5, position: 11.5, change: -0.2 },
    { url: 'https://example.com/τιμές', clicks: 85, impressions: 2400, ctr: 3.54, position: 12.2, change: 0.4 },
    { url: 'https://example.com/blog/technical-seo', clicks: 72, impressions: 2100, ctr: 3.43, position: 13.1, change: 0.1 },
    { url: 'https://example.com/σχετικά', clicks: 58, impressions: 1800, ctr: 3.22, position: 14.2, change: -0.3 },
  ],
};
