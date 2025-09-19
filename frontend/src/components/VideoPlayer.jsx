export default function VideoPlayer({ videoRef }) {
  return (
    <div className="border rounded overflow-hidden">
      <video ref={videoRef} className="w-full h-96 bg-black" playsInline muted />
    </div>
  );
}
