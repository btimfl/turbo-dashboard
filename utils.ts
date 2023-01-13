import { ChartWorkflow, Duration } from './enums';

export function resolveWorkflow(tabIndex: number): ChartWorkflow | null {
  // To make the API work for now
  return null;

  if (tabIndex === 0) return null;
  else if (tabIndex === 1) return ChartWorkflow.WITH_OTP;
  else return ChartWorkflow.WITHOUT_OTP;
}

export function resolveDuration(
  duration: Duration,
  from: string,
  to: string
): {
  from: string;
  to: string;
} {
  const toDate = Duration.CUSTOM ? new Date(to) : new Date();
  const fromDate = Duration.CUSTOM ? new Date(from) : new Date();

  switch (duration) {
    case Duration.LAST_WEEK:
      fromDate.setDate(fromDate.getDate() - 7);
      break;
    case Duration.LAST_MONTH:
      fromDate.setDate(fromDate.getDate() - 30);
      break;
    case Duration.LAST_90_DAYS:
      fromDate.setDate(fromDate.getDate() - 90);
      break;
  }

  return {
    from: fromDate.toLocaleDateString('en-CA'),
    to: toDate.toLocaleDateString('en-CA'),
  };
}
