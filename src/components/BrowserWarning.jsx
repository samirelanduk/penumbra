const BrowserWarning = () => {

  return (
    <div className="text-slate-500 text-xs px-4 pb-3 border-b">
      <span className="font-bold">Warning: </span>
      This browser doesn't support the File System Access API yet.
      You can still use this app, but you won't be able to open or save files.
      Try Chrome or Edge.
    </div>
  );
};

BrowserWarning.propTypes = {
  
};

export default BrowserWarning;