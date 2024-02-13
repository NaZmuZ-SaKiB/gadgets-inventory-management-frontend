const Spinner = ({ className }: { className: string }) => {
  return (
    <div
      className={`size-full rounded-full border-x-transparent animate-spin border-[3px] ${className}`}
    />
  );
};

export default Spinner;
