import { useState, useMemo } from 'react';
import { Section } from './SectionFeedback/SectionFeedback';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prev => (prev += 1));
        break;

      case 'bad':
        setBad(prev => (prev += 1));
        break;

      case 'neutral':
        setNeutral(prev => (prev += 1));
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = useMemo(
    () => good + bad + neutral,
    [good, neutral, bad]
  );

  const countPositiveFeedbackPercentage = useMemo(
    () => Math.round((good / countTotalFeedback) * 100) + '%',
    [good, countTotalFeedback]
  );

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'bad', 'neutral']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};
