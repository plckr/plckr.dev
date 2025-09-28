'use client';

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount
} from '@/components/ui/kibo-ui/contribution-graph';
import { eachDayOfInterval, formatISO } from 'date-fns';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [result, setResult] = useState<{
    contributions: GithubActivityEntry[];
    total: number;
  } | null>(null);

  useEffect(() => {
    fetch('/api/github-contributions')
      .then((res) => res.json())
      .then(setResult);
  }, []);

  if (!result) {
    return (
      <div className="relative">
        <ContributionGraph
          data={dummyData}
          totalCount={0}
          blockMargin={3}
          blockRadius={2}
          blockSize={10}
          fontSize={14}
          labels={{ totalCount: ' ' }}
          className="animate-pulse"
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

        <Loader2Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
      </div>
    );
  }

  return (
    <ContributionGraph
      data={result.contributions}
      totalCount={result.total}
      blockMargin={3}
      blockRadius={2}
      blockSize={10}
      fontSize={14}
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
