export enum Duration {
  LAST_WEEK = 'Last 7 Days',
  LAST_MONTH = 'Last Month',
  LAST_90_DAYS = 'Last 90 Days',
  CUSTOM = 'Custom',
}

export enum Chart {
  LINE = 'LINE_CHART',
  PIE = 'PIE_CHART',
}

export const ChartWorkflow = {
  OTP: 1,
  WITHOUT_OTP: 2,
};

export enum UnifillAPI {
  SUCCESSFUL = 'LookupStatus.FOUND(value=1)',
  UNSUCCESSFUL = 'LookupStatus.NOT_FOUND(value=2)',
}

export enum ReportType {
  CONSOLIDATED = 'CONSOLIDATED',
}
