export default function PostTimeDifference({createdAt}) {
  let timeDifference = (new Date() - new Date(createdAt)) / 1000;
  let timeDifferenceString = 'a few seconds';

  // Minutes
  if (timeDifference >= 60) {
    timeDifference /= 60;
    let timeName = 'minute'
    
    // Hours
    if (timeDifference >= 60) {
      timeDifference /= 60;
      timeName = 'hour';
      
      // Days
      if (timeDifference >= 24) {
        timeDifference /= 24;
        timeName = 'day';
      }
    }

    // Removing the decimals
    timeDifference = parseInt(timeDifference);
    // Adding the number of time with its name
    timeDifferenceString = `${timeDifference} ${timeName}`;
    // Adding 's' if the timeDifference is more than 1
    // For example '1 minute' and '2 minutes'
    timeDifferenceString += timeDifference > 1 ? 's' : '';
  }

  return (
    <p>{timeDifferenceString} ago</p>
  )
}