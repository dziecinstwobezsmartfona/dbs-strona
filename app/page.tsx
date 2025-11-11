export default function Home() {
  return (
    <main className="container">
      {/* Title section */}
      <section className="relative w-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/leaves_background_loop.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-3/4 md:w-1/2 h-full mx-auto text-center text-white px-4">
          <p className="text-5xl md:text-8xl font-title mt-75 mb-4">Jednoczymy się dla</p>
          <p className="text-5xl md:text-8xl font-title mt-4 mb-4">naszych dzieci</p>
          <p className="text-xl md:text-3xl font-bold mt-8 mb-20">Dołącz do rosnącego ruchu rodzin wierzących, że dzieciństwo jest zbyt krótkie, by spędzić je ze smartfonem</p>
        </div>
      </section>

      {/* Large tiles section */}
      <section className="relative w-screen bg-(--background) py-20">
        <div className="flex flex-col md:flex-row items-center justify-center w-3/4 mx-auto">
          <div className="flex flex-col items-center justiy-center bg-(--secondary-background) text-(--main-accent) w-full h-100 m-8 py-16 rounded-3xl">
            <p className="text-3xl md:text-5xl font-title">Czym jest PAKT?</p>
          </div>
          <div className="flex flex-col items-center justiy-center bg-(--foreground) text-(--secondary-accent) w-full h-100 m-8 py-16 rounded-3xl">
            <p className="text-3xl md:text-5xl font-title">Dołącz na Whatsapp</p>
          </div>
        </div>
      </section>
    </main>
  );
}