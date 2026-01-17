

const DashboardTitle = ({
  title,
  details,
  className
}: {
  title: string;
  details: string;
  className?:string;
}) => {
  return (
    <div className={className}>
      {title && (
        <h1 className="text-xl md:text-4xl font-bold text-primary">
          {title}
        </h1>
      )}
      {details && <p className="text-muted-foreground mt-2">{details}</p>}
    </div>
  );
};

export default DashboardTitle;
