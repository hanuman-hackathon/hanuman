type TopBarProps = {
  label: string;
};

export default function TopBar({ label }: TopBarProps) {
  return (
    <div className="flex items-center h-16 bg-white border border-border-grey px-14">
      {label}
    </div>
  );
}
