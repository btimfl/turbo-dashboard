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

export enum ChartWorkflow {
  WITH_OTP = 'OTP',
  WITHOUT_OTP = 'WITHOUT_OTP',
}

export enum UnifillAPI {
  SUCCESSFUL = 'LookupStatus.FOUND(value=1)',
  UNSUCCESSFUL = 'LookupStatus.NOT_FOUND(value=2)',
}
