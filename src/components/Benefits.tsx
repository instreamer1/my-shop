export default function Benefits() {
  const items = [
    { title: "Оплата при отриманні", icon: "💳" },
    { title: "Доступна ціна", icon: "💰" },
    { title: "Швидка відправка", icon: "🚚" },
    { title: "Хороша якість", icon: "⭐" },
  ];

  return (
    <section className="bg-[#f7f7f7] py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
        {items.map((item) => (
          <div key={item.title} className="bg-white p-5 shadow rounded-xl">
            <div className="text-4xl mb-3">{item.icon}</div>
            <p className="font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

