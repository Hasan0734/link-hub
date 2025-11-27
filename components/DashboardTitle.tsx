

const DashboardTitle = ({
  title,
  details,
}: {
  title: string;
  details: string;
}) => {
  return (
    <div>
      {title && (
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </h1>
      )}
      {details && <p className="text-muted-foreground mt-2">{details}</p>}
    </div>
  );
};

export default DashboardTitle;
