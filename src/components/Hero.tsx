import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Левое фото */}
        <img src="/hero-bunner.webp" alt="" className="w-full  object-cover" />
        {/* <Image
          src="/hero-bunner.webp"
          alt=""
          className="w-full  object-cover"
        /> */}
        {/* Правое фото */}
        {/* <img 
          src="/hero-right.jpg" 
          alt="" 
          className="w-full md:w-1/2 object-cover"
        />*/}
      </div>

      {/* Текст поверх */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
        {/* <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
          Ми підбираємо про комфорт та красу твого тіла
        </h1> */}

        <a
          href="/catalog"
          className="mt-6 bg-green-800 text-white py-3 px-8 rounded-lg text-lg hover:bg-green-900 transition"
        >
          До каталогу
        </a>
      </div>
    </section>
  );
}
