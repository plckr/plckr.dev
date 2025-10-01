'use client';

import { useQuery } from '@tanstack/react-query';
import { eachDayOfInterval, formatISO } from 'date-fns';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount
} from '~/components/ui/kibo-ui/contribution-graph';
import { cn } from '~/lib/utils';

import { Button } from './ui/button';

const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);
const now = new Date();

const days = eachDayOfInterval({
  start: lastYear,
  end: now
});
const dummyData = days.map((date) => {
  return {
    date: formatISO(date, { representation: 'date' }),
    count: 0,
    level: 0
  };
});

type GithubActivityEntry = {
  date: string;
  count: number;
  level: number;
};

export default function GithubActivity() {
  const { data, isError, isLoading, refetch } = useQuery<{
    contributions: GithubActivityEntry[];
    total: number;
  }>({
    queryKey: ['github-contributions'],
    queryFn: () => fetch('/api/github-contributions').then((res) => res.json())
  });

  const commonProps = {
    blockMargin: 3,
    blockRadius: 2,
    blockSize: 10,
    fontSize: 14
  };

  if (isLoading || isError || !data) {
    return (
      <div className="relative">
        <ContributionGraph
          {...commonProps}
          data={dummyData}
          totalCount={0}
          labels={{ totalCount: ' ' }}
          className={cn(isLoading && 'animate-pulse', 'opacity-50')}
        >
          <ContributionGraphCalendar>
            {({ activity, dayIndex, weekIndex }) => (
              <ContributionGraphBlock
                activity={activity}
                dayIndex={dayIndex}
                weekIndex={weekIndex}
              />
            )}
          </ContributionGraphCalendar>
          <ContributionGraphFooter>
            <ContributionGraphTotalCount />
            <ContributionGraphLegend />
          </ContributionGraphFooter>
        </ContributionGraph>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {isLoading && <Loader2Icon className="animate-spin" />}

          {(isError || (!data && !isLoading)) && (
            <Button variant="outline" onClick={() => refetch()}>
              <TriangleAlertIcon className="text-amber-500" /> Try again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ContributionGraph
      {...commonProps}
      data={data.contributions}
      totalCount={data.total}
      labels={{ totalCount: '{{count}} contributions in the last year' }}
    >
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock activity={activity} dayIndex={dayIndex} weekIndex={weekIndex} />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <ContributionGraphTotalCount />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
