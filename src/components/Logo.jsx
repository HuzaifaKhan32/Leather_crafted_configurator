export default function Logo() {
  return (
    <img 
      src="/model/logo.png" // Apni image ka path yahan dein
      alt="LeatherCrafted"
      style={{
        position: 'absolute',
        // backgroundColor: 'white', // Thoda transparent background
        top: '5px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '220px', // Apni zaroorat ke mutabiq size set karein
        // height: '200px',
        zIndex: 100
      }}
    />
  );
}