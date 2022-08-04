interface TimerProps {
  time: number;
}
export default function Timer({ time }: TimerProps) {
  return (
    <div className="timer">
      <span>{"0" + Math.floor(time / 3600 / 1000)}:</span>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  );
}
