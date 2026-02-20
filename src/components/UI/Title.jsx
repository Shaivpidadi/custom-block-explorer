const Title = ({ className = "", children }) => {
  return (
    <div className={`w-full ${className}`}>
      <h1 className="font-bold text-xl text-foreground">{children}</h1>
    </div>
  );
};

export default Title;
