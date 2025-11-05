const PromoBanner = () => {
  const promos = ["🎉 20% OFF on all ESP32 boards - Use code: ESP20", "🚀 Free shipping on orders above $50", "⚡ Flash Sale: Arduino Nano at $15.99 - Limited time!", "🎁 Buy 2 sensors, get 1 free", "💎 New arrivals: Raspberry Pi 5 now in stock", "🔥 Weekend Special: 15% off on all displays"];
  return <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 overflow-hidden">
      <div className="animate-scroll whitespace-nowrap">
        <span className="inline-block text-sm">
          {promos.map((promo, index) => <span key={index} className="mx-8 text-sm font-medium">
              {promo}
            </span>)}
          {/* Duplicate for seamless loop */}
          {promos.map((promo, index) => <span key={`dup-${index}`} className="mx-8 text-sm font-medium">
              {promo}
            </span>)}
        </span>
      </div>
    </div>;
};
export default PromoBanner;