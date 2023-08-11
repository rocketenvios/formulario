export const getTime = (time) => {
  const [h, m] = time.split(':');
  const ms = new Date().setHours(h, m);
  return new Date(ms);
};

export const isOnTime = (actual, minOrMax) => {
  if (
    (minOrMax === 'min' && actual === '09:00') ||
    (minOrMax === 'max' && actual === '18:00')
  ) {
    return true;
  } else {
    const actualTime = getTime(actual);
    const minTime = getTime('09:00');
    const maxTime = getTime('18:00');
    return actualTime > minTime && actualTime < maxTime;
  }
};

export const diffTime = (timeA, timeB) => {
  const timeStart = timeA.split(':');
  const timeEnd = timeB.split(':');

  const start = new Date(0, 0, 0, timeStart[0], timeStart[1]);
  const end = new Date(0, 0, 0, timeEnd[0], timeEnd[1]);

  const difference = start - end;
  const differenceInMinutes = (difference / 1000 / 60) * -1;
  return differenceInMinutes;
};
