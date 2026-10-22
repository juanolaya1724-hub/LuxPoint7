/* =========================================================================
   LUXPOINT7 — SCRIPT.JS
   Contiene: generación automática del inventario, renderizado dinámico
   de tarjetas, navegación por categorías, buscador predictivo en tiempo
   real y el envío de pedidos por WhatsApp.
   ========================================================================= */

/* =========================================================================
   1. GENERACIÓN AUTOMÁTICA DEL INVENTARIO (productosDB)
   -------------------------------------------------------------------------
   En vez de escribir 353 objetos a mano, tres bucles "for" arman el array
   por ti al cargar la página, siguiendo un patrón de nombre + ruta de
   imagen secuencial. El "id" se calcula automáticamente para que nunca se
   repita, sin importar cuántos productos tenga cada categoría.

   Estructura de carpetas esperada en tu proyecto:

   /index.html
   /estilos.css
   /script.js
   /img
     /perfumes/  -> perfume1.jpg, perfume2.jpg, ... perfume277.jpg
     /iphones/   -> iphone1.jpg, iphone2.jpg, ... iphone40.jpg
     /airpods/   -> airpods1.jpg, airpods2.jpg, airpods3.jpg, airpods4.jpg
     /combos/    -> combo1.jpg, combo2.jpg, combo3.jpg, combo4.jpg, combo5.jpg

   ------------------------------------------------------------------------
   ¿CÓMO PERSONALIZAR UN PRODUCTO GENERADO AUTOMÁTICAMENTE MÁS ADELANTE?
   ------------------------------------------------------------------------
   No necesitas tocar el bucle. Justo después de que los tres "for" terminan
   de llenar el array, puedes buscar cualquier producto por su "id" y
   sobrescribir sus datos. Ejemplo (déjalo comentado hasta que lo necesites):

     const p = productosDB.find(prod => prod.id === 45);
     if (p) {
       p.nombre = "Nombre real de esta fragancia";
       p.descripcion = "Descripción real de esta fragancia";
       p.precio = 195000;
     }

   Así vas reemplazando, uno por uno, los nombres genéricos por los reales,
   sin arriesgarte a romper la sintaxis del array completo.

   ------------------------------------------------------------------------
   ¿CÓMO CAMBIAR CUÁNTOS PRODUCTOS SE GENERAN?
   ------------------------------------------------------------------------
   Solo cambia el número en la condición del "for" correspondiente
   (por ejemplo "i <= 277" por "i <= 400") y los precios/ids se recalculan
   solos en cada carga de página.
   ========================================================================= */

const productosDB = [];

let siguienteId = 1;

/* ---------------------- PERFUMES (1 a 277) ---------------------- */
const TOTAL_PERFUMES = 276;
const PRECIO_BASE_PERFUME = 150000;

for (let i = 1; i <= TOTAL_PERFUMES; i++) {
  productosDB.push({
    id: siguienteId++,
    categoria: "perfumes",
    nombre: `Perfume ${i}`,
    descripcion: "Fragancia exclusiva 1.1 de alta fijación",
    precio: PRECIO_BASE_PERFUME + (i % 10) * 5000, // pequeña variación de ejemplo
    imagen: `img/perfumes/perfume${i}.jpg`
  });
}

/* ---------------------- IPHONE (1 a 40) ---------------------- */
const TOTAL_IPHONES = 39;
const PRECIO_BASE_IPHONE = 2500000;

for (let i = 1; i <= TOTAL_IPHONES; i++) {
  productosDB.push({
    id: siguienteId++,
    categoria: "iphones",
    nombre: `iPhone Modelo ${i}`,
    descripcion: "39 modelos, Máxima potencia, rendimiento garantizado y con Garantia",
    precio: PRECIO_BASE_IPHONE + (i % 5) * 200000, // pequeña variación de ejemplo
    imagen: `img/iphones/iphone${i}.jpg`
  });
}

/* ---------------------- AIRPODS (1 a 4) ---------------------- */
const TOTAL_AIRPODS = 4;
const PRECIO_BASE_AIRPODS = 700000;

for (let i = 1; i <= TOTAL_AIRPODS; i++) {
  productosDB.push({
    id: siguienteId++,
    categoria: "airpods",
    nombre: `AirPods Modelo ${i}`,
    descripcion: "Sonido original Apple, todas las generaciones",
    precio: PRECIO_BASE_AIRPODS + (i % 4) * 150000, // pequeña variación de ejemplo
    imagen: `img/airpods/airpods${i}.jpg`
  });
}

/* ---------------------- COMBOS (4, escritos a mano) ----------------------
   Estos 4 objetos NO se generan por bucle porque cada combo suele tener
   contenido comercial distinto (qué productos incluye, oferta, etc).
   Ya están listos con id, imagen y precio de ejemplo: solo entra aquí más
   adelante y cambia "nombre" y "descripcion" por el contenido real de
   cada paquete.
---------------------------------------------------------------------- */
productosDB.push(
  {
    id: siguienteId++,
    categoria: "combos",
    nombre: "EL PATRON",
    descripcion: "PERFUME + CARRIEL (lleva gratis: Perfumero 5ml + Obsequio Sorpresa)",
    precio: 189900,
    imagen: "img/combos/combo1.jpg"
  },
  {
    id: siguienteId++,
    categoria: "combos",
    nombre: "FLOW URBANO",
    descripcion: "AIRPODS PRO 2 + CARRIEL + OBSEQUIO SORPRESA",
    precio: 149900,
    imagen: "img/combos/combo2.jpg"
  },
  {
    id: siguienteId++,
    categoria: "combos",
    nombre: "DIAMANTE",
    descripcion: "AIRPODS PRO 2 + PERFUME + PERFUMERO 5ML (lleva gratis: Obsequio Sorpresa)",
    precio: 169900,
    imagen: "img/combos/combo3.jpg"
  },
  {
    id: siguienteId++,
    categoria: "combos",
    nombre: "IMPERIO",
    descripcion: "Arma tu combo de 3 PERFUMES. El precio de este combo varia de la eleccion del perfume que escoja. (PRECIO MINIMO: 209.900 / PRECIO MAXIMO: 359.900)",
    precio: 209900,
    imagen: "img/combos/combo4.jpg"
  },
);

// NOMBRO A CADA PRODUCTO CON SU NOMBRE REAL //

const p = productosDB.find(prod => prod.id === 1);
if (p) {
  p.nombre = "Ahli Karpos";
  p.descripcion = "Es una fragancia unisex fresca, frutal y elegante, con notas tropicales y un fondo cálido y envolvente.";
  p.precio = 100000;
}

const p2 = productosDB.find(prod => prod.id === 2);
if (p2) {
  p2.nombre = "Ahli Vega";
  p2.descripcion = "Es una fragancia unisex de la familia frutal, floral y dulce. Tiene un aroma dulce, fresco y sofisticado.";
  p2.precio = 100000;
}

const p3 = productosDB.find(prod => prod.id === 3);
if (p3) {
  p3.nombre = "Aqua Dubai Cofre";
  p3.descripcion = "Es una fragancia unisex de la familia floral y dulce. Tiene un aroma suave, fresco y envolvente.";
  p3.precio = 130000;
}

const p4 = productosDB.find(prod => prod.id === 4);
if (p4) {
  p4.nombre = "Alharramain Amber Oud Cofre";
  p4.descripcion = "Es una fragancia unisex dulce, frutal y tropical con fondo amaderado-avainillado.";
  p4.precio = 130000;
}

const p5 = productosDB.find(prod => prod.id === 5);
if (p5) {
  p5.nombre = "Blue Seduction";
  p5.descripcion = "Es una fragancia masculina de la familia aromática acuática, conocida por su aroma fresco, limpio, juvenil y seductor.";
  p5.precio = 100000;
}

const p6 = productosDB.find(prod => prod.id === 6);
if (p6) {
  p6.nombre = "Go Mango";
  p6.descripcion = "Es una fragancia unisex de la familia oriental frutal y dulce, conocida por su aroma tropical, jugoso y cálido.";
  p6.precio = 115000;
}

const p7 = productosDB.find(prod => prod.id === 7);
if (p7) {
  p7.nombre = "Odyssey Marshmallow";
  p7.descripcion = "Es una fragancia unisex de la familia floral frutal gourmand, famosa por su aroma extremadamente dulce, cremoso y goloso que evoca el olor a golosinas.";
  p7.precio = 115000;
}

const p8 = productosDB.find(prod => prod.id === 8);
if (p8) {
  p8.nombre = "Odyssey Artisto";
  p8.descripcion = "Es una fragancia unisex de la familia amaderada aromática y gourmand, muy reconocida por su aroma tropical, cremoso, especiado y exótico.";
  p8.precio = 115000;
}

const p9 = productosDB.find(prod => prod.id === 9);
if (p9) {
  p9.nombre = "Odyssey Tyrant";
  p9.descripcion = "Es una fragancia masculina de la familia cítrica, aromática y amaderada, conocida por su perfil vibrante, fresco y elegante con un toque especiado.";
  p9.precio = 115000;
}

const p10 = productosDB.find(prod => prod.id === 10);
if (p10) {
  p10.nombre = "Homme White";
  p10.descripcion = "Es una fragancia masculina de la familia fougère ambarada y acuática, apreciada por su perfil fresco, limpio, especiado y ligeramente dulce.";
  p10.precio = 115000;
}

const p11 = productosDB.find(prod => prod.id === 11);
if (p11) {
  p11.nombre = "Odyssey Mega";
  p11.descripcion = "Es una fragancia masculina de la familia amaderada aromática y cítrica.";
  p11.precio = 115000;
}

const p12 = productosDB.find(prod => prod.id === 12);
if (p12) {
  p12.nombre = "Odyssey Spectra";
  p12.descripcion = "Es una fragancia de la familia oriental especiada y dulzona, muy aclamada por su perfil nocturno, cálido, seductor y envolvente.";
  p12.precio = 115000;
}

const p13 = productosDB.find(prod => prod.id === 13);
if (p13) {
  p13.nombre = "Odyssey Homme";
  p13.descripcion = "Es una fragancia masculina de la familia oriental ambarada, muy popular por su aroma cálido, dulce, elegante y seductor.";
  p13.precio = 115000;
}

const p14 = productosDB.find(prod => prod.id === 14);
if (p14) {
  p14.nombre = "Mandarin Sky";
  p14.descripcion = "Es una fragancia masculina de la familia cítrica gourmand y amaderada.";
  p14.precio = 115000;
}

const p15 = productosDB.find(prod => prod.id === 15);  
if (p15) {
  p15.nombre = "Club de Nuit Intense";
  p15.descripcion = "Es una fragancia masculina de la familia amaderada especiada.";
  p15.precio = 110000;
}

const p16 = productosDB.find(prod => prod.id === 16);
if (p16) {
  p16.nombre = "Club de Nuit Sillage";
  p16.descripcion = "Es una fragancia unisex de la familia cítrica, metálica y floral-amaderada.";
  p16.precio = 110000;
}

const p17 = productosDB.find(prod => prod.id === 17);
if (p17) {
  p17.nombre = "Azzaro The Most Wanted";
  p17.descripcion = "Es una fragancia masculina de la familia ámbar amaderada fougère, reconocida por su aroma sumamente adictivo, cálido, dulce y nocturno.";
  p17.precio = 105000;
}

const p18 = productosDB.find(prod => prod.id === 18);
if (p18) {
  p18.nombre = "Bharara King Parfum Cofre";
  p18.descripcion = "Es una fragancia masculina de la familia oriental frutal y cítrica, famosa por su aroma sumamente potente, Dulce, fresco y de altísima proyección.";
  p18.precio = 140000;
}

const p19 = productosDB.find(prod => prod.id === 19); 
if (p19) {
  p19.nombre = "Bharara King";
  p19.descripcion = "Es una fragancia masculina de la familia oriental frutal y cítrica, famosa por su aroma sumamente intenso, fresco, dulce y de gran proyección.";
  p19.precio = 140000;
}

const p20 = productosDB.find(prod => prod.id === 20); 
if (p20) {
  p20.nombre = "Bharara Viking Dubai Cofre";
  p20.descripcion = "Es una fragancia unisex de la familia oriental amaderada y dulce, famosa por su aroma exótico, lujoso, cálido y de alta intensidad.";
  p20.precio = 140000;
}

const p21 = productosDB.find(prod => prod.id === 21); 
if (p21) {
  p21.nombre = "BVLGARI Aqua pour Homme";
  p21.descripcion = "Es una fragancia masculina de la familia aromática acuática, apreciada por su aroma marino, fresco, elegante y profundo.";
  p21.precio = 100000;
}

const p22 = productosDB.find(prod => prod.id === 22); 
if (p22) {
  p22.nombre = "BVLGARI Man in Black";
  p22.descripcion = "Es una fragancia masculina de la familia ámbar amaderada, aclamada por su aroma cálido, ahumado, especiado y sumamente seductor.";
  p22.precio = 100000;
}

const p23 = productosDB.find(prod => prod.id === 23); 
if (p23) {
  p23.nombre = "Calvin Klein Eternity";
  p23.descripcion = "Es una fragancia unisex de la familia floral, apreciada por su aroma fresco, elegante y romántico.";
  p23.precio = 100000;
}

const p24 = productosDB.find(prod => prod.id === 24); 
if (p24) {
  p24.nombre = "Calvin Klein CK One";
  p24.descripcion = "Es una fragancia unisex de la familia cítrica y floral, apreciada por su aroma fresco, juvenil y versátil.";
  p24.precio = 100000;
}

const p25 = productosDB.find(prod => prod.id === 25 ); 
if (p25) {
  p25.nombre = "Bad Boy";
  p25.descripcion = "Es una fragancia masculina de la familia oriental amaderada y dulce, famosa por su aroma exótico, lujoso, cálido y de alta intensidad.";
  p25.precio = 105000;
}

const p26 = productosDB.find(prod => prod.id === 26); 
if (p26) {
  p26.nombre = "212 Heroes";
  p26.descripcion = "Es una fragancia masculina de la familia fougère frutal y aromática, apreciada por su aroma juvenil, vibrante, fresco y desenfadado.";
  p26.precio = 105000;
}

const p27 = productosDB.find(prod => prod.id === 27); 
if (p27) {
  p27.nombre = "212 Men NYC";
  p27.descripcion = "Es una fragancia masculina de la familia resplandeciente amaderada y floral-almizclada, icónica por su aroma urbano, fresco, verde y elegante.";
  p27.precio = 110000;
}

const p28 = productosDB.find(prod => prod.id === 28); 
if (p28) {
  p28.nombre = "212 Sexy Men";
  p28.descripcion = "Es una fragancia masculina de la familia oriental ambarada y especiada, reconocida por su aroma misterioso, cálido, dulce y sumamente seductor.";
  p28.precio = 105000;
}

const p29 = productosDB.find(prod => prod.id === 29); 
if (p29) {
  p29.nombre = "CH Men";
  p29.descripcion = "Es una fragancia masculina de la familia oriental especiada y amaderada, muy célebre por su aroma refinado, cálido, acogedor y ligeramente dulce.";
  p29.precio = 100000;
}

const p30 = productosDB.find(prod => prod.id === 30); 
if (p30) {
  p30.nombre = "212 VIP Black";
  p30.descripcion = "Es una fragancia masculina de la familia aromática fougère, reconocida por su aroma moderno, nocturno, atrevido y sumamente embriagador.";
  p30.precio = 105000;
}

const p31 = productosDB.find(prod => prod.id === 31); 
if (p31) {
  p31.nombre = "212 VIP Men";
  p31.descripcion = "Es una fragancia masculina de la familia oriental amaderada, muy popular por su aroma festero, vibrante, moderno y nocturno.";
  p31.precio = 110000;
}

const p32 = productosDB.find(prod => prod.id === 32); 
if (p32) {
  p32.nombre = "212 VIP Men Wins";
  p32.descripcion = "Es una fragancia masculina de la familia fougère verde y aromática, apreciada por su aroma fresco, herbal, energizante y deportivo.";
  p32.precio = 105000;
}

const p33 = productosDB.find(prod => prod.id === 33); 
if (p33) {
  p33.nombre = "212 VIP Black Red";
  p33.descripcion = "Es una fragancia masculina de la familia amaderada especiada, reconocida por su aroma picante, dulce, vibrante y muy sensual.";
  p33.precio = 105000;
}

const p34 = productosDB.find(prod => prod.id === 34); 
if (p34) {
  p34.nombre = "EAU Cartier";
  p34.descripcion = "Es una fragancia unisex de la familia cítrica aromática y floral-amaderada, célebre por su aroma limpio, transparente, elegante y atemporal.";
  p34.precio = 100000;
}

const p35 = productosDB.find(prod => prod.id === 35); 
if (p35) {
  p35.nombre = "Cartier Declaration";
  p35.descripcion = "Es una fragancia masculina de la familia amaderada especiada, icónica por su aroma sofisticado, fresco, picante y de gran elegancia.";
  p35.precio = 100000;
}

const p36 = productosDB.find(prod => prod.id === 36); 
if (p36) {
  p36.nombre = "Bleu de Chanel";
  p36.descripcion = "Es una fragancia masculina de la familia amaderada aromática, aclamada por su aroma versátil, moderno, sofisticado y de elegancia atemporal.";
  p36.precio = 102000;
}

const p37 = productosDB.find(prod => prod.id === 37); 
if (p37) {
  p37.nombre = "Allure Homme Sport";
  p37.descripcion = "Es una fragancia masculina de la familia amaderada especiada y marina, aclamada por su aroma energizante, fresco, sensual y sumamente elegante.";
  p37.precio = 102000;
}

const p38 = productosDB.find(prod => prod.id === 38); 
if (p38) {
  p38.nombre = "Green Irish Tweed";
  p38.descripcion = "Es una fragancia masculina de la familia amaderada floral y almizclada, icónica por su aroma fresco, verde, refinado y de elegancia atemporal.";
  p38.precio = 105000;
}

const p39 = productosDB.find(prod => prod.id === 39); 
if (p39) {
  p39.nombre = "Creed Aventus";
  p39.descripcion = "Es una fragancia masculina de la familia chipre frutal y amaderada, aclamada mundialmente por su aroma potente, sofisticado, viril y de gran proyección.";
  p39.precio = 105000;
}

const p40 = productosDB.find(prod => prod.id === 40); 
if (p40) {
  p40.nombre = "Creed Silver Mountain";
  p40.descripcion = "Es una fragancia unisex de la familia aromática cítrica, célebre por su aroma gélido, puro, revitalizante y de gran sofisticación.";
  p40.precio = 105000;
}

const p41 = productosDB.find(prod => prod.id === 41); 
if (p41) {
  p41.nombre = "Creed Imperial";
  p41.descripcion = "Es una fragancia unisex de la familia amaderada floral y marina, aclamada por su aroma lujoso, fresco, radiante y elegante.";
  p41.precio = 105000;
}

const p42 = productosDB.find(prod => prod.id === 42); 
if (p42) {
  p42.nombre = "Diesel Plus";
  p42.descripcion = "Es una fragancia masculina de la familia oriental amaderada, muy popular por su aroma cremoso, limpio, dulce y reconfortante.";
  p42.precio = 100000;
}

const p43 = productosDB.find(prod => prod.id === 43); 
if (p43) {
  p43.nombre = "Diesel Tatto";
  p43.descripcion = "Es una fragancia masculina de la familia amaderada especiada y frutal, destacada por su aroma oscuro, dulce, misterioso y rebelde.";
  p43.precio = 100000;
}

const p44 = productosDB.find(prod => prod.id === 44); 
if (p44) {
  p44.nombre = "Sauvage Odyssee Rouge";
  p44.descripcion = "Es una fragancia masculina de la familia amaderada especiada y aromática, diseñada para ofrecer un aroma cálido, vibrante, sensual y sofisticado.";
  p44.precio = 100000;
}

const p45 = productosDB.find(prod => prod.id === 45); 
if (p45) {
  p45.nombre = "Dior Sauvage Elixir (ESTUCHE)";
  p45.descripcion = "Es una fragancia masculina de la familia amaderada especiada, aclamada por su aroma extremadamente denso, nocturno, sofisticado y de potencia opulenta.";
  p45.precio = 110000;
}

const p46 = productosDB.find(prod => prod.id === 46); 
if (p46) {
  p46.nombre = "Dior Sauvage";
  p46.descripcion = "Es una fragancia masculina de la familia aromática fougère, mundialmente célebre por su aroma ultra versátil, fresco, limpio y magnético.";
  p46.precio = 105000;
}

const p47 = productosDB.find(prod => prod.id === 47); 
if (p47) {
  p47.nombre = "Dior Fahrenheit";
  p47.descripcion = "Es una fragancia masculina de la familia amaderada floral almizclada, un clásico revolucionario célebre por su aroma audaz, cálido, característico y de fuerte personalidad.";
  p47.precio = 102000;
}

const p48 = productosDB.find(prod => prod.id === 48); 
if (p48) {
  p48.nombre = "K Parfum";
  p48.descripcion = "Es una fragancia masculina de la familia amaderada especiada, destacada por su aroma regio, cálido, intenso y sofisticado.";
  p48.precio = 105000;
}

const p49 = productosDB.find(prod => prod.id === 49); 
if (p49) {
  p49.nombre = "The One";
  p49.descripcion = "Es una fragancia masculina de la familia oriental especiada, aclamada mundialmente por su aroma cálido, acogedor, elegante y profundamente seductor.";
  p49.precio = 102000;
}

const p50 = productosDB.find(prod => prod.id === 50); 
if (p50) {
  p50.nombre = "Light Blue Dama";
  p50.descripcion = "Es una fragancia femenina de la familia cítrica frutal y floral, aclamada mundialmente por su aroma fresco, chispeante, juvenil y veraniego.";
  p50.precio = 102000;
}

const p51 = productosDB.find(prod => prod.id === 51); 
if (p51) {
  p51.nombre = "Ferrari Black";
  p51.descripcion = "Es una fragancia masculina de la familia aromática fougère, popular por su aroma accesible, cálido, frutal y dulce.";
  p51.precio = 105000;
}

const p52 = productosDB.find(prod => prod.id === 52); 
if (p52) {
  p52.nombre = "Stronger Intensely";
  p52.descripcion = "Es una fragancia masculina de la familia oriental fougère y gourmand, aclamada por su aroma profundamente dulce, cálido, adictivo y seductor.";
  p52.precio = 110000;
}

const p53 = productosDB.find(prod => prod.id === 53); 
if (p53) {
  p53.nombre = "Stronger With";
  p53.descripcion = "Es una fragancia masculina de la familia aromática fougère, célebre por su aroma moderno, cálido, frutal y dulce.";
  p53.precio = 110000;
}

const p54 = productosDB.find(prod => prod.id === 54); 
if (p54) {
  p54.nombre = "Acqua Di Gio Profondo";
  p54.descripcion = "Es una fragancia masculina de la familia aromática acuática, muy aclamada por su aroma marino, intenso, moderno y profundamente refrescante.";
  p54.precio = 102000;
}

const p55 = productosDB.find(prod => prod.id === 55); 
if (p55) {
  p55.nombre = "Acqua Di Gio Por Homme";
  p55.descripcion = "Es una fragancia masculina de la familia aromática acuática, un ícono mundial atemporal célebre por su aroma limpio, fresco, marino y mediterráneo.";
  p55.precio = 102000;
}

const p56 = productosDB.find(prod => prod.id === 56); 
if (p56) {
  p56.nombre = "Acqua Di Gio Profumo";
  p56.descripcion = "Es una fragancia masculina de la familia aromática acuática y amaderada, legendaria por su aroma elegante, ahumado, fresco y de profunda madurez.";
  p56.precio = 102000;
}

const p57 = productosDB.find(prod => prod.id === 57); 
if (p57) {
  p57.nombre = "Givenchy Blue Label";
  p57.descripcion = "Es una fragancia masculina de la familia amaderada especiada, célebre por su aroma dinámico, ultra fresco, relajado y elegante.";
  p57.precio = 100000;
}

const p58 = productosDB.find(prod => prod.id === 58); 
if (p58) {
  p58.nombre = "Hugo Boss Energise";
  p58.descripcion = "Es una fragancia masculina de la familia amaderada aromática, célebre por su aroma urbano, enérgico, cítrico y picante.";
  p58.precio = 100000;
}

const p59 = productosDB.find(prod => prod.id === 59); 
if (p59) {
  p59.nombre = "Hugo Boss Just Different";
  p59.descripcion = "Es una fragancia masculina de la familia aromática, célebre por su aroma moderno, vibrante, fresco y con un toque helado.";
  p59.precio = 100000;
}

const p60 = productosDB.find(prod => prod.id === 60); 
if (p60) {
  p60.nombre = "Hugo Boss Red"; 
  p60.descripcion = "Es una fragancia masculina de la familia amaderada especiada, célebre por su aroma audaz, dinámico y con un contraste térmico único (sensación fría y caliente).";
  p60.precio = 105000;
}

const p61 = productosDB.find(prod => prod.id === 61); 
if (p61) {
  p61.nombre = "Hugo Boss XY";
  p61.descripcion = "Es una fragancia masculina de la familia amaderada aromática, célebre por su aroma verde, fresco, moderno y sofisticado.";
  p61.precio = 100000;
}

const p62 = productosDB.find(prod => prod.id === 62); 
if (p62) {
  p62.nombre = "Hugo Boss Bottled Tonic";
  p62.descripcion = "Es una fragancia masculina de la familia amaderada especiada, aclamada por su aroma ligero, elegante, limpio y super refrescante.";
  p62.precio = 102000;
}

const p63 = productosDB.find(prod => prod.id === 63); 
if (p63) {
  p63.nombre = "Hugo Boss In Motion";
  p63.descripcion = "Es una fragancia masculina de la familia oriental fougère, célebre por su aroma dinámico, enérgico, cítrico y dulce.";
  p63.precio = 100000;
}

const p64 = productosDB.find(prod => prod.id === 64); 
if (p64) {
  p64.nombre = "Hugo Boss Unlimited";
  p64.descripcion = "Es una fragancia masculina de la familia aromática fougère, aclamada por su aroma verde, energizante, frutal y sumamente limpio.";
  p64.precio = 100000;
}

const p65 = productosDB.find(prod => prod.id === 65); 
if (p65) {
  p65.nombre = "Hugo Boss Night";
  p65.descripcion = "Es una fragancia masculina de la familia amaderada aromática, aclamada por su aroma seductor, nocturno, limpio y elegante.";
  p65.precio = 100000;
}

const p66 = productosDB.find(prod => prod.id === 66); 
if (p66) {
  p66.nombre = "Hugo Boss The Scent";
  p66.descripcion = "Es una fragancia masculina de la familia aromática especiada, aclamada por su aroma cálido, seductor, exótico y magnético.";
  p66.precio = 100000;
}

const p67 = productosDB.find(prod => prod.id === 67); 
if (p67) {
  p67.nombre = "Hugo Boss Bottled";
  p67.descripcion = "Es una fragancia masculina de la familia amaderada especiada, un clásico moderno de la perfumería célebre por su aroma versátil, sofisticado, cálido y refinado.";
  p67.precio = 100000;
}

const p68 = productosDB.find(prod => prod.id === 68); 
if (p68) {
  p68.nombre = "Oud For Happiness Initio";
  p68.descripcion = "Es una fragancia unisex de la familia amaderada especiada, aclamada por su aroma adictivo, brillante, exótico y profundamente reconfortante.";
  p68.precio = 125000;
}

const p69 = productosDB.find(prod => prod.id === 69); 
if (p69) {
  p69.nombre = "Il Min Kakuno COFRE";
  p69.descripcion = "Es una fragancia unisex de la firma de nicho Ilmin Parfums, perteneciente a la familia amaderada frutal y especiada, aclamada por su aroma opulento, exótico y profundamente refinado.";
  p69.precio = 120000;
}

const p70 = productosDB.find(prod => prod.id === 70); 
if (p70) {
  p70.nombre = "Issey Miyake Pour Homme";
  p70.descripcion = "Es una fragancia masculina de la familia amaderada acuática, un ícono atemporal célebre por su aroma extremadamente fresco, limpio, elegante y atemporal.";
  p70.precio = 100000;
}

const p71 = productosDB.find(prod => prod.id === 71); 
if (p71) {
  p71.nombre = "Jean Paul Gaultier Le Male";
  p71.descripcion = "Es una fragancia masculina de la familia oriental fougère, un icono de la perfumería célebre por su aroma seductor, cálido, limpio y sumamente característico.";
  p71.precio = 115000;
}

const p72 = productosDB.find(prod => prod.id === 72); 
if (p72) {
  p72.nombre = "Jean Paul Elixir";
  p72.descripcion = "El perfume Jean Paul Gaultier Le Male Elixir es una fragancia masculina de la familia oriental ambarada, aclamada por su aroma opulento, ultra seductor, cálido y profundamente dulce.";
  p72.precio = 120000;
}

const p73 = productosDB.find(prod => prod.id === 73); 
if (p73) {
  p73.nombre = "Jean Paul Ultra Male";
  p73.descripcion = "Es una fragancia masculina de la familia oriental fougère, célebre por su aroma Intenso, ultra jugoso, dulce y nocturno.";
  p73.precio = 115000;
}

const p74 = productosDB.find(prod => prod.id === 74); 
if (p74) {
  p74.nombre = "Jean Paul Le Parfum";
  p74.descripcion = "Es una fragancia masculina de la familia oriental ambarada, célebre por su aroma sofisticado, Intenso, cálido y elegante.";
  p74.precio = 115000;
}

const p75 = productosDB.find(prod => prod.id === 75); 
if (p75) {
  p75.nombre = "Le Beau Parfum Lata";
  p75.descripcion = "Fragancia intensa y amaderada con notas orientales. Destacan acordes de haba tonka, madera de coco y sándalo, ofreciendo un aroma cálido, dulzón, exótico y muy seductor.";
  p75.precio = 115000;
}

const p76 = productosDB.find(prod => prod.id === 76); 
if (p76) {
  p76.nombre = "Le Beau Jean Paul Gaultier";
  p76.descripcion = "Fragancia fresca, tropical y amaderada. Combina la frescura vibrante de la bergamota con la dulzura suave del coco y un fondo cálido de haba tonka.";
  p76.precio = 110000;
}

const p77 = productosDB.find(prod => prod.id === 77); 
if (p77) {
  p77.nombre = "Scandal Absolu";
  p77.descripcion = "Fragancia gourmet, cálida y opulenta. Destaca por sus notas intensas de castaña asada, sándalo cremoso y un toque de ciruela dulce.";
  p77.precio = 100000;
}

const p78 = productosDB.find(prod => prod.id === 78); 
if (p78) {
  p78.nombre = "Scandal Pour Homme";
  p78.descripcion = "fragancia masculina de la familia oriental amaderada, aclamada por su aroma goloso, energizante, sensual y profundamente adictivo.";
  p78.precio = 100000;
}

const p79 = productosDB.find(prod => prod.id === 79); 
if (p79) {
  p79.nombre = "Jean Pascal";
  p79.descripcion = "Clasico perfume amaderado y especiado. Combina notas herbales, musgo de roble, lavanda y maderas nobles con un carácter sobrio y tradicional.";
  p79.precio = 100000;
}

const p80 = productosDB.find(prod => prod.id === 80); 
if (p80) {
  p80.nombre = "Rouge de Lacoste";
  p80.descripcion = "Fragancia dinámica, especiada y energética. Presenta un inicio frutal y picante con té de rooibos, jengibre, pimienta negra y cardamomo sobre una base amaderada.";
  p80.precio = 100000;
}

const p81 = productosDB.find(prod => prod.id === 81); 
if (p81) {
  p81.nombre = "Lacoste Red";
  p81.descripcion = "Fragancia fresca, vibrante y afrutada. Destaca por sus notas de manzana verde, pino, jazmín y un toque amaderado de cedro y pachulí.";
  p81.precio = 100000;
}

const p82 = productosDB.find(prod => prod.id === 82); 
if (p82) {
  p82.nombre = "Lacoste Blanc";
  p82.descripcion = "Aroma limpio, fresco y herbal-floral. Combina pomelo, romero y cardamomo con notas de nardo y un fondo elegante de cedro y cuero.";
  p82.precio = 100000;
}

const p83 = productosDB.find(prod => prod.id === 83); 
if (p83) {
  p83.nombre = "Vert de Lacoste";
  p83.descripcion = "Aroma ultra fresco, cítrico y relajante. Domina la frescura de la bergamota, el bambú, la verbena y un toque sutil de tomillo.";
  p83.precio = 100000;
}

const p84 = productosDB.find(prod => prod.id === 84); 
if (p84) {
  p84.nombre = "Lacoste Noir";
  p84.descripcion = "Fragancia aromática y dulzona inspirada en una noche de verano. Destaca por notas de sandía jugosa, albahaca, lavanda y un toque cálido de chocolate negro.";
  p84.precio = 100000;
}

const p85 = productosDB.find(prod => prod.id === 85); 
if (p85) {
  p85.nombre = "Lacoste Essential";
  p85.descripcion = "Fragancia cítrica, ligera y muy fresca. Posee notas de hojas de tomate, clementina, bergamota y un fondo suave de pimienta y madera de sándalo.";
  p85.precio = 100000;
}

const p86 = productosDB.find(prod => prod.id === 86); 
if (p86) {
  p86.nombre = "Sehr Lattafa (Estuche)";
  p86.descripcion = "Fragancia unisex cálida, dulce y gourmand. Presenta notas cremosas de vainilla, almendra, especias suaves como el cardamomo y la canela, acompañadas de un toque elegante de flor de azahar y maderas Ámbar.";
  p86.precio = 140000;
}

const p87 = productosDB.find(prod => prod.id === 87); 
if (p87) {
  p87.nombre = "Asad Elixir";
  p87.descripcion = "Perfume amaderado, especiado e intenso. Destaca por sus acordes de pimienta negra, tabaco cálido, café y un fondo rico de ámbar y vainilla con matices ahumados.";
  p87.precio = 110000;
}

const p88 = productosDB.find(prod => prod.id === 88); 
if (p88) {
  p88.nombre = "Art of Universe LUJO";
  p88.descripcion = "Fragancia refinada y moderna con carácter oriental. Combina notas cítricas y afrutadas en la salida con un corazón aromático y un fondo rico en resinas, maderas y almizcle.";
  p88.precio = 130000;
}

const p89 = productosDB.find(prod => prod.id === 89); 
if (p89) {
  p89.nombre = "Ajwad";
  p89.descripcion = "Fragancia afrutada, floral y dulce. Combina la jugosidad de frutas tropicales con un toque elegante de rosa, jazmín, vainilla y madera de cedro sobre una base de almizcle suave.";
  p89.precio = 115000;
}

const p90 = productosDB.find(prod => prod.id === 90); 
if (p90) {
  p90.nombre = "Qaed Al Fursan";
  p90.descripcion = "Aroma tropical, ahumado y vibrante. Destaca intensamente por la nota dulce y fresca de piña madura combinada con azafrán, jazmín, abeto y maderas cálidas.";
  p90.precio = 105000;
}

const p91 = productosDB.find(prod => prod.id === 91); 
if (p91) {
  p91.nombre = "His Confession";
  p91.descripcion = "Fragancia masculina intensa y seductora. Presenta notas de lavanda, canela y iris con un fondo profundo de haba tonka, vainilla, ámbar y cedro.";
  p91.precio = 130000;
}

const p92 = productosDB.find(prod => prod.id === 92); 
if (p92) {
  p92.nombre = "Musamam";
  p92.descripcion = "Perfume potente y refinado estilo oud amaderado. Mezcla notas de mandarina, pimienta italiana, azafrán, madera de agar (oud) y notas de cuero y geranio.";
  p92.precio = 130000;
}

const p93 = productosDB.find(prod => prod.id === 93); 
if (p93) {
  p93.nombre = "Afeef";
  p93.descripcion = "Fragancia elegante, limpia y especiada. Ofrece notas de salida cítricas mezcladas con especias suaves, flores blancas y una base amaderada refinada de sándalo y ámbar.";
  p93.precio = 150000;
}

const p94 = productosDB.find(prod => prod.id === 94); 
if (p94) {
  p94.nombre = "Emeer ESTUCHE";
  p94.descripcion = "Fragancia cítrica, aromática y amaderada. Abre con notas muy frescas de limón (lima ácida) y bergamota, seguidas de un corazón de té negro y cardamomo, sobre una base cálida de sándalo, ámbar y madera de cedro.";
  p94.precio = 140000;
}

const p95 = productosDB.find(prod => prod.id === 95); 
if (p95) {
  p95.nombre = "Erba Pura (Estuche)";
  p95.descripcion = "Aroma frutal, dulce y exuberante. Destaca por una explosión vibrante de cítricos sicilianos y frutas maduras de la cuenca mediterránea, envueltas en un fondo duradero de almizcle blanco, ámbar y vainilla de Madagascar.";
  p95.precio = 130000;
}

const p96 = productosDB.find(prod => prod.id === 96); 
if (p96) {
  p96.nombre = "Khamrah ESTUCHE";
  p96.descripcion = "Aroma dulce, opulento y especiado. Combina canela, nuez moscada y bergamota con un corazón oriental de praliné, dátiles y nardos, descansando en un fondo cálido de maderas preciosas, vainilla y mirra.";
  p96.precio = 130000;
}

const p97 = productosDB.find(prod => prod.id === 97); 
if (p97) {
  p97.nombre = "Khamrah Qahwa ESTUCHE";
  p97.descripcion = "Fragancia cálida, especiada y gourmet. Ofrece intensas notas de café recién tostado acompañadas de cardamomo, canela, praliné y un fondo dulce y amaderado de haba tonka y vainilla.";
  p97.precio = 130000;
}

const p98 = productosDB.find(prod => prod.id === 98); 
if (p98) {
  p98.nombre = "Khamrah Dukhan ESTUCHE";
  p98.descripcion = "Aroma misterioso, ahumado y oriental. Añade un toque resinoso e inciensado a la base dulce y especiada característica de la línea Khamrah, con matices de madera quemada, ámbar y especias frías.";
  p98.precio = 130000;
}

const p99 = productosDB.find(prod => prod.id === 99); 
if (p99) {
  p99.nombre = "Asad Bourbon";
  p99.descripcion = "Fragancia rica, cálida y envolvente. Presenta acordes de licor ahumado, madera de roble, cacao, especias dulces y un fondo suave de vainilla y ámbar.";
  p99.precio = 110000;
}

const p100 = productosDB.find(prod => prod.id === 100); 
if (p100) {
  p100.nombre = "Asad Tradicional";
  p100.descripcion = "Fragancia masculina intensa y especiada. Sobresale por sus acordes de pimienta negra, piña dulce, tabaco aromático, café y una base de ámbar, vainilla y maderas oscuras.";
  p100.precio = 110000;
}

const p101 = productosDB.find(prod => prod.id === 101); 
if (p101) {
  p101.nombre = "Asad Zanzibar";
  p101.descripcion = "Fragancia tropical, exótica y cremosa. Fusiona notas de agua de coco, pimienta negra, iris elegante y sal marina sobre una base cálida de incienso y maderas suaves.";
  p101.precio = 110000;
}

const p102 = productosDB.find(prod => prod.id === 102); 
if (p102) {
  p102.nombre = "Oud for Glory (Estuche)";
  p102.descripcion = "Perfume amaderado, especiado y místico. Combina notas de azafrán, nuez moscada y lavanda con un corazón potente de madera de agar (oud) y un fondo terroso de pachulí y almizcle.";
  p102.precio = 115000;
}

const p103 = productosDB.find(prod => prod.id === 103); 
if (p103) {
  p103.nombre = "Amethys (Estuche)";
  p103.descripcion = "Fragancia floral-frutal profunda y sensual. Destaca por notas de rosa turca, pimienta rosa y bergamota con un corazón de moras dulces y un fondo cálido de ámbar y vainilla.";
  p103.precio = 120000;
}

const p104 = productosDB.find(prod => prod.id === 104); 
if (p104) {
  p104.nombre = "Sublime (Estuche)";
  p104.descripcion = "Perfume dulce, frutal y elegante. Combina notas vibrantes de manzana, lichi y ciruela con un bouquet floral de rosa y jazmín, sobre una base de vainilla cremosa y musgo.";
  p104.precio = 120000;
}

const p105 = productosDB.find(prod => prod.id === 105); 
if (p105) {
  p105.nombre = "Honor y Glory (Estuche)";
  p105.descripcion = "fragancia unisex de la familia oriental amaderada y golosa, muy aclamada por su aroma exótico, cremoso, cálido y refinado.";
  p105.precio = 115000;
}

const p106 = productosDB.find(prod => prod.id === 106); 
if (p106) {
  p106.nombre = "Maahir Gold";
  p106.descripcion = "Perfume oriental, cálido y dulce. Mezcla notas de melocotón (durazno), bergamota y jazmín con un corazón cremoso de rosa y caramelo, sobre un fondo profundo de ámbar, vainilla y haba tonka.";
  p106.precio = 110000;
}

const p107 = productosDB.find(prod => prod.id === 107); 
if (p107) {
  p107.nombre = "Maahir Legacy";
  p107.descripcion = "Aroma ultra fresco, cítrico y aromático. Destaca por una apertura efervescente de lima, menta fresca y pomelo, seguida de lavanda, piña y un fondo limpio de ambroxan y maderas suaves.";
  p107.precio = 110000;
}

const p108 = productosDB.find(prod => prod.id === 108); 
if (p108) {
  p108.nombre = "Maahir Black";
  p108.descripcion = "Fragancia ahumada, intensa y misteriosa. Presenta potentes notas de bergamota picante, pimienta negra, azafrán, cuero, humo de madera y un fondo denso de resinas y madera de agar.";
  p108.precio = 110000;
}

const p109 = productosDB.find(prod => prod.id === 109); 
if (p109) {
  p109.nombre = "Fakhar Black Estuche";
  p109.descripcion = "Aroma masculino, aromático y dulce-especiado. Fusiona la frescura de la manzana verde, bergamota y jengibre con notas de salvia, lavanda, haba tonka y madera de cedro.";
  p109.precio = 125000;
}

const p110 = productosDB.find(prod => prod.id === 110); 
if (p110) {
  p110.nombre = "Shaheen Gold (Lujo)";
  p110.descripcion = "Perfume exótico, especiado y refinado. Combina notas de piña jugosa y hinojo con un corazón floral de higo y iris, cerrando con un fondo cálido de haba tonka, vainilla y madera de sándalo.";
  p110.precio = 125000;
}

const p111 = productosDB.find(prod => prod.id === 111); 
if (p111) {
  p111.nombre = "Shaheen Silver";
  p111.descripcion = "Fragancia fresca, elegante y ahumada. Abre con notas cítricas de bergamota y cassis (grosellero negro), evolucionando hacia un corazón de rosa y pachulí sobre una base de musgo de roble, ámbar y almizcle.";
  p111.precio = 125000;
}

const p112 = productosDB.find(prod => prod.id === 112); 
if (p112) {
  p112.nombre = "Bergamote 22";
  p112.descripcion = "Fragancia cítrica, fresca y efervescente. Combina la frescura chispeante de la bergamota y el pomelo con matices florales de azahar y un fondo elegante de ámbar, almizcle y madera de cedro.";
  p112.precio = 100000;
}

const p113 = productosDB.find(prod => prod.id === 113); 
if (p113) {
  p113.nombre = "Santal 33";
  p113.descripcion = "Aroma icónico amaderado, ahumado y terroso. Destaca por notas de sándalo australiano, papiro, madera de cedro, cuero, violeta y cardamomo con un toque cálido y especiado.";
  p113.precio = 100000;
}

const p114 = productosDB.find(prod => prod.id === 114); 
if (p114) {
  p114.nombre = "Loewe Solo";
  p114.descripcion = "Fragancia armónica, cítrica y especiada. Fusiona acordes de mandarina, guayaba, tomillo y lavanda con un corazón de pimienta rosa, canela y un fondo de ámbar y madera.";
  p114.precio = 105000;
}

const p115 = productosDB.find(prod => prod.id === 115); 
if (p115) {
  p115.nombre = "Summer Hammer";
  p115.descripcion = "Aroma tropical, frutal y veraniego. Ofrece una mezcla explosiva de mango, piña, coco y ron con matices marinos y un fondo cálido de sándalo y almizcle.";
  p115.precio = 115000;
}

const p116 = productosDB.find(prod => prod.id === 116); 
if (p116) {
  p116.nombre = "Louis Vuitton Ombre Nomade";
  p116.descripcion = "Mantiene el mismo perfil olfativo refinado de cuero cálido con especias, toques florales suaves y notas amaderadas-terrosas.";
  p116.precio = 105000;
}

const p117 = productosDB.find(prod => prod.id === 117); 
if (p117) {
  p117.nombre = "Baccarat Rouge 540";
  p117.descripcion = "Fragancia lujosa, cristalina y dulce-ambarada. Destaca por notas de azafrán, jazmín, madera de ámbar (ambroxan) y resina de abeto recien cortado.";
  p117.precio = 100000;
}

const p118 = productosDB.find(prod => prod.id === 118); 
if (p118) {
  p118.nombre = "Montale Tonka";
  p118.descripcion = "Aroma cálido, dulce y resinoso. Domina el haba tonka con sus matices acaramelados, vainilla, almendra amarga y toques ahumados de madera y tabaco.";
  p118.precio = 105000;
}

const p119 = productosDB.find(prod => prod.id === 119); 
if (p119) {
  p119.nombre = "Montale Intense Cafe";
  p119.descripcion = "Perfume gourmand, embriagador y seductor. Combina el aroma intenso de café tostado con rosas frescas en el corazón, envuelto en un fondo cremoso de vainilla, ámbar y almizcle blanco.";
  p119.precio = 105000;
}

const p120 = productosDB.find(prod => prod.id === 120); 
if (p120) {
  p120.nombre = "Montale Starry Nights";
  p120.descripcion = "Fragancia oriental, afrutada. Fusiona notas de bergamota, manzana y limón con un corazón denso de rosa y pachulí sobre una base de ámbar, polvo y almizcle blanco.";
  p120.precio = 105000;
}

const p121 = productosDB.find(prod => prod.id === 121); 
if (p121) {
  p121.nombre = "Mont Blanc Legend";
  p121.descripcion = "Aroma fresco, fougère y vibrante. Combina la frescura de la lavanda, la bergamota y la piña con un corazón floral de rosa y manzana, sobre un fondo de sándalo y tonka.";
  p121.precio = 100000;
}

const p122 = productosDB.find(prod => prod.id === 122); 
if (p122) {
  p122.nombre = "Mont Blanc Emblem";
  p122.descripcion = "Fragancia aromática, especiada y masculina. Abre con notas de toronja, cardamomo y salvia, seguidas de hojas de violeta, canela y una base de maderas nobles y haba tonka.";
  p122.precio = 100000;
}

const p123 = productosDB.find(prod => prod.id === 123); 
if (p123) {
  p123.nombre = "Mont Blanc Legend Spirit";
  p123.descripcion = "Fragancia fresca, acuática y amaderada. Abre con notas efervescentes de toronja (pomelo), pimienta rosa y bergamota, seguidas de un corazón acuático de lavanda y cardamomo sobre un fondo limpio de maderas blancas y almizcles.";
  p123.precio = 100000;
}

const p124 = productosDB.find(prod => prod.id === 124); 
if (p124) {
  p124.nombre = "Starwalker Mont Blanc";
  p124.descripcion = "Aroma limpio, terroso y relajante. Combina notas de bambú fresco, bergamota y mandarina con un corazón especiado de nuez moscada y jengibre sobre un fondo de madera de cedro y sándalo.";
  p124.precio = 100000;
}

const p125 = productosDB.find(prod => prod.id === 125); 
if (p125) {
  p125.nombre = "Moschino Toy Pearl";
  p125.descripcion = "Fragancia luminosa, frutal y floral. Ofrece una mezcla de notas cítricas vibrantes, dejos de fresia, jazmín y frutas jugosas sobre una base suave y envolvente de ámbar y madera.";
  p125.precio = 110000;
}

const p126 = productosDB.find(prod => prod.id === 126); 
if (p126) {
  p126.nombre = "Moschino Toy Boy";
  p126.descripcion = "Perfume picante, floral y amaderado. Destaca por una apertura de pimienta rosa, pera y nuez moscada, evolucionando hacia un corazón elegante de rosa de mayo y clavo, sobre una base rica de cashmeran y vetivers.";
  p126.precio = 110000;
}

const p127 = productosDB.find(prod => prod.id === 127); 
if (p127) {
  p127.nombre = "Nautica Voyage N-83";
  p127.descripcion = "Fragancia marina, aromática y picante. Presenta notas de brisa marina, menta picante y petitgrain con un toque de cardamomo, nuez moscada y un fondo de maderas nobles.";
  p127.precio = 100000;
}

const p128 = productosDB.find(prod => prod.id === 128); 
if (p128) {
  p128.nombre = "Nautica Voyage";
  p128.descripcion = "Aroma ultra fresco, acuático y verde. Sobresalen las notas de manzana verde crujiente y hojas verdes sobre un corazón de flor de loto y mimosa, cerrando con un fondo masculino de cedro, ámbar y almizcle.";
  p128.precio = 100000;
}

const p129 = productosDB.find(prod => prod.id === 129); 
if (p129) {
  p129.nombre = "Orientica Royal Amber (Estuche)";
  p129.descripcion = "Fragancia dulce, ambarada y gourmand. Combina notas vibrantes de frutas maduras y cítricos en la salida con un corazón denso de ámbar, melón y piña, apoyado en un fondo de vainilla, almizcle y madera.";
  p129.precio = 130000;
}

const p130 = productosDB.find(prod => prod.id === 130); 
if (p130) {
  p130.nombre = "Orientica Oud Saffron (Estuche)";
  p130.descripcion = "Perfume cálido, especiado y lujoso. Fusiona notas de azafrán exótico y especias ricas con un fondo profundo de madera de agar (oud) y toques dulzones de ámbar.";
  p130.precio = 120000;
}

const p131 = productosDB.find(prod => prod.id === 131); 
if (p131) {
  p131.nombre = "Orientica Amber Rouge (Estuche)";
  p131.descripcion = "Fragancia opulenta, ambarada y levemente dulce. Destaca por matices de azafrán, madera de cedro, resina de abeto y un fondo envolvente de ámbar gris.";
  p131.precio = 120000;
}

const p132 = productosDB.find(prod => prod.id === 132); 
if (p132) {
  p132.nombre = "Orientica Royal Bleu (Estuche)";
  p132.descripcion = "Fragancia elegante, fresca y aromática. Abre con notas cítricas y picantes como bergamota y manzana verde, evolucionando hacia lavanda, jazmín y una base amaderada de sándalo y guayaco.";
  p132.precio = 125000;
}

const p133 = productosDB.find(prod => prod.id === 133); 
if (p133) {
  p133.nombre = "Orientica Amber Noir (Estuche)";
  p133.descripcion = "Aroma oscuro, misterioso y especiado. Combina notas de salida amaderadas con matices aromáticos, resinas cálidas y un fondo de ámbar intenso y cuero suave.";
  p133.precio = 140000;
}

const p134 = productosDB.find(prod => prod.id === 134); 
if (p134) {
  p134.nombre = "Invictus Victory";
  p134.descripcion = "Fragancia intensa, dulce y seductora. Presenta un duelo entre la frescura efervescente de los cítricos y la pimienta rosa con la calidez cremosa de la vainilla, el haba tonka y el incienso.";
  p134.precio = 100000;
}

const p135 = productosDB.find(prod => prod.id === 135); 
if (p135) {
  p135.nombre = "Invictus Victory Absolu";
  p135.descripcion = "Perfume profundo, cálido y especiado. Destaca por notas de cardamomo picante, lavanda aromática y un fondo balsámico y dulce de ámbar, haba tonka y maderas ahumadas.";
  p135.precio = 100000;
}

const p136 = productosDB.find(prod => prod.id === 136); 
if (p136) {
  p136.nombre = "Invictus Victory Elixir";
  p136.descripcion = "Fragancia rica, concentrada y gourmand. Fusiona la calidez del cardamomo y la pimienta negra con notas de incienso, un corazón de vainilla cremosa y un fondo de maderas ricas y haba tonka.";
  p136.precio = 100000;
}

const p137 = productosDB.find(prod => prod.id === 137); 
if (p137) {
  p137.nombre = "Invictus Parfum";
  p137.descripcion = "Aroma potente, acuático y amaderado. Combina la frescura de la pimienta rosa y acordes marinos con lavanda aromática, jabón limpio y un fondo denso de madera de sándalo y almizcle.";
  p137.precio = 100000;
}

const p138 = productosDB.find(prod => prod.id === 138); 
if (p138) {
  p138.nombre = "Invictus Platinum";
  p138.descripcion = "Fragancia aromática, herbal y amaderada. Destaca por una nota intensa de absenta eufórica combinada con toronja fresca, lavanda aromática y un fondo limpio de menta, ciprés y pachulí.";
  p138.precio = 100000;
}

const p139 = productosDB.find(prod => prod.id === 139); 
if (p139) {
  p139.nombre = "Invictus Legend";
  p139.descripcion = "Fragancia marina, amaderada y salina. Combina notas de sal marina, pomelo (toronja) y especias cálidas con un corazón de laurel, geranio y un fondo intenso de ámbar rojo y madera de guayaco.";
  p139.precio = 100000;
}

const p140 = productosDB.find(prod => prod.id === 140); 
if (p140) {
  p140.nombre = "Invictus Tradicional";
  p140.descripcion = "Aroma fresco, acuático y efervescente. Abre con notas cítricas de mandarina y pomelo junto a acordes marinos, evolucionando hacia un corazón de hoja de laurel y jazmín sobre una base amaderada de musgo de roble, pachulí y ámbar gris.";
  p140.precio = 100000;
}

const p141 = productosDB.find(prod => prod.id === 141); 
if (p141) {
  p141.nombre = "Black XS";
  p141.descripcion = "Aroma dulce, amaderado y vibrante. Destaca por notas de salvia, limón de Calabria y un corazón goloso de praliné, canela y cardamomo negro, sobre una base suave de palo de rosa de Brasil, ámbar negro y pachulí.";
  p141.precio = 100000;
}

const p142 = productosDB.find(prod => prod.id === 142); 
if (p142) {
  p142.nombre = "Pure XS H";
  p142.descripcion = "Fragancia oriental, fresca y ardiente. Crea un contraste entre el calor del jengibre, la vainilla y el licor con la frescura de la savia vegetal, el tomillo y la canela sobre un fondo de mirra, cedro y azúcar.";
  p142.precio = 100000;
}

const p143 = productosDB.find(prod => prod.id === 143); 
if (p143) {
  p143.nombre = "Black XS L'Aphrodisia";
  p143.descripcion = "Perfume picante, frutal y rebelde. Mezcla la frescura ácida del limón y el azafrán con notas de canela, miel y cardamomo, cerrando con un fondo cálido de praliné, cuero y maderas oscuras.";
  p143.precio = 100000;
}

const p144 = productosDB.find(prod => prod.id === 144); 
if (p144) {
  p144.nombre = "Black XS L'Excès";
  p144.descripcion = "Fragancia amaderada, aromática e intensa. Destaca por notas efervescentes de limón (lima ácida) y lavanda en la salida, evolucionando hacia un corazón dulce de ciprés y ozono, sobre una base potente de ámbar negro y pachulí.";
  p144.precio = 100000;
}

const p145 = productosDB.find(prod => prod.id === 145); 
if (p145) {
  p145.nombre = "Phantom";
  p145.descripcion = "Aroma futurista, aromático y cremoso. Fusiona la frescura efervescente del limón de Amalfi y la lavanda con un corazón ahumado de tierra fresca y un fondo dulce y moderno de vainilla y vetiver.";
  p145.precio = 100000;
}

const p146 = productosDB.find(prod => prod.id === 146); 
if (p146) {
  p146.nombre = "One Million Parfum";
  p146.descripcion = "Perfume intenso, salado y solar. Combina acordes florales de tuberosa (nardo) y flor de azahar envueltos en sal marina con un fondo rico de cuero, aceite de monoi, ámbar y pino.";
  p146.precio = 100000;
}

const p147 = productosDB.find(prod => prod.id === 147); 
if (p147) {
  p147.nombre = "One Million Royal";
  p147.descripcion = "Aroma amaderado, aromático y fresco. Mezcla notas chispeantes de mandarina, bergamota y cardamomo con un corazón herbal de lavanda y salvia, cerrando con un fondo elegante de benjuí, cedro y pachulí.";
  p147.precio = 100000;
}

const p148 = productosDB.find(prod => prod.id === 148); 
if (p148) {
  p148.nombre = "One Million Elixir";
  p148.descripcion = "Fragancia rica, frutal y profundamente dulce. Presenta notas de manzana verde picante y davana, un corazón de rosa de Damasco y flor de osmanthus, sobre una base cálida de haba tonka, vainilla absoluta y madera de cedro.";
  p148.precio = 100000;
}

const p149 = productosDB.find(prod => prod.id === 149); 
if (p149) {
  p149.nombre = "One Million Tradicional";
  p149.descripcion = "Perfume icónico, especiado y dulce. Combina notas frescas de mandarina sangrina y menta con un corazón cálido de canela y rosa, sobre un fondo envolvente de cuero, ámbar y pachulí indio.";
  p149.precio = 100000;
}

const p150 = productosDB.find(prod => prod.id === 150); 
if (p150) {
  p150.nombre = "One Million Lucky";
  p150.descripcion = "Fragancia amaderada, gourmand y vibrante. Destaca por notas de avellana crujiente, ciruela, pomelo y bergamota con un corazón de miel y cedro sobre un fondo terroso de pachulí, ámbar y musgo de roble.";
  p150.precio = 100000;
}

const p151 = productosDB.find(prod => prod.id === 151); 
if (p151) {
  p151.nombre = "One Million Privé";
  p151.descripcion = "Aroma cálido, oriental y amaderado. Combina notas dulces de mandarina roja y canela en la salida con un corazón denso de tabaco de pipa y mirra, apoyado en un fondo de haba tonka y pachulí.";
  p151.precio = 100000;
}

const p152 = productosDB.find(prod => prod.id === 152); 
if (p152) {
  p152.nombre = "Parfums de Marly Pegasus";
  p152.descripcion = "Fragancia amaderada, oriental y elegante. Destaca por sus notas de almendra amarga, bergamota y heliotropo, acompañadas de un corazón de jazmín y lavanda, sobre una base de vainilla cremosa, ámbar y sándalo.";
  p152.precio = 115000;
}

const p153 = productosDB.find(prod => prod.id === 153); 
if (p153) {
  p153.nombre = "Parfums de Marly Kalan";
  p153.descripcion = "Fragancia oriental, especiada e intensa. Abre con notas picantes de pimienta negra, naranja sanguina y especias frías, seguidas de un corazón de flor de azahar y lavanda, cerrando con un fondo terroso de musgo de roble, maderas nobles y ámbar.";
  p153.precio = 115000;
}

const p154 = productosDB.find(prod => prod.id === 154); 
if (p154) {
  p154.nombre = "Parfums de Marly Layton";
  p154.descripcion = "Aroma oriental, amaderado y refinado. Combina notas crujientes de manzana, bergamota y lavanda con un corazón floral de jazmín, violeta y geranio, apoyado en un fondo rico y cálido de vainilla, pimienta, madera de guayaco y pachulí.";
  p154.precio = 115000;
}

const p155 = productosDB.find(prod => prod.id === 155); 
if (p155) {
  p155.nombre = "360 Red";
  p155.descripcion = "Fragancia cítrica, especiada y muy fresca. Destaca por notas efervescentes de lima, bergamota, mandarina y canela en la salida, evolucionando hacia un corazón de lavanda y cilantro sobre una base de madera de cedro, vetiver y almizcle.";
  p155.precio = 100000;
}

const p156 = productosDB.find(prod => prod.id === 156); 
if (p156) {
  p156.nombre = "360 For Men";
  p156.descripcion = "Perfume clásico, fresco y aromático. Combina notas cítricas de bergamota y limón con matices herbales de bayas de enebro, salvia y cardamomo, sobre una base limpia de madera de sándalo, vetiver y almizcle.";
  p156.precio = 100000;
}

const p157 = productosDB.find(prod => prod.id === 157); 
if (p157) {
  p157.nombre = "Polo Blue";
  p157.descripcion = "Aroma ultra fresco, acuático y herbal. Abre con notas de melón, pepino y mandarina, evolucionando hacia un corazón aromático de albahaca, salvia y geranio, sobre un fondo suave de gamuza, musgo y maderas blancas.";
  p157.precio = 100000;
}

const p158 = productosDB.find(prod => prod.id === 158); 
if (p158) {
  p158.nombre = "Polo Red";
  p158.descripcion = "Fragancia amaderada, especiada y enérgica. Destaca por la frescura ácida del pomelo rojo y el arándano, mezclados con azafrán picante, salvia y un fondo cálido de madera de cedro, ámbar y café recién tostado.";
  p158.precio = 100000;
}

const p159 = productosDB.find(prod => prod.id === 159); 
if (p159) {
  p159.nombre = "Swiss Army Classic";
  p159.descripcion = "Fragancia fresca, aromática y herbal. Destaca por sus notas vibrantes de menta, bergamota y hojas verdes, acompañadas de lavanda, flor de azahar y un fondo masculino de madera de cedro, ciprés y ámbar.";
  p159.precio = 100000;
}

const p160 = productosDB.find(prod => prod.id === 160); 
if (p160) {
  p160.nombre = "Lapidus";
  p160.descripcion = "Perfume clásico, potente, dulce y oriental-amaderado. Mezcla notas intensas de piña, lavanda y bergamota en la salida con miel, incienso, pino y un fondo denso de pachulí, tabaco y ámbar.";
  p160.precio = 100000;
}

const p161 = productosDB.find(prod => prod.id === 161); 
if (p161) {
  p161.nombre = "Tommy Classic";
  p161.descripcion = "Aroma ultra fresco, joven y frutal-cítrico. Fusiona la frescura de la menta, toronja y lavanda con notas crujientes de manzana verde, arándano y una base suave de flor de algodón, ámbar y cactus.";
  p161.precio = 100000;
}

const p162 = productosDB.find(prod => prod.id === 162); 
if (p162) {
  p162.nombre = "Born in Roma Uomo";
  p162.descripcion = "Perfume moderno, aromático y especiado. Destaca por acordes de notas salinas, violeta y salvia, combinados con un toque picante de jengibre y un fondo elegante de vetiver ahumado y maderas ricas.";
  p162.precio = 110000;
}

const p163 = productosDB.find(prod => prod.id === 163); 
if (p163) {
  p163.nombre = "Versace Eros Energy";
  p163.descripcion = "Fragancia efervescente, cítrica y revitalizante. Sobresale por una explosión de bergamota, pomelo y limón italiano mezclados con pimienta rosada, hojas de violeta y un fondo limpio de almizcle y ámbar.";
  p163.precio = 100000;
}

const p164 = productosDB.find(prod => prod.id === 164); 
if (p164) {
  p164.nombre = "Versace Eros Flame";
  p164.descripcion = "Fragancia amaderada, cítrica y cálida. Abre con notas de chinotto, limón y pimienta negra, seguidas de un corazón de romero, rosa y geranio sobre una base dulce de vainilla de Madagascar, haba tonka y cedro.";
  p164.precio = 100000;
}

const p165 = productosDB.find(prod => prod.id === 165); 
if (p165) {
  p165.nombre = "Versace Dylan Blue";
  p165.descripcion = "Aroma fresco, fougère y amaderado-misterioso. Combina notas de bergamota de Calabria, toronja y hojas de higuera con pimienta negra, ambroxan, pachulí y un fondo sensual de incienso, haba tonka y almizcle.";
  p165.precio = 100000;
}

const p166 = productosDB.find(prod => prod.id === 166); 
if (p166) {
  p166.nombre = "Versace Eau Fraiche";
  p166.descripcion = "Perfume ligero, cítrico y acuático. Abre con carambola (fruta de la estrella), limón dulce y palo de rosa de Brasil, evolucionando hacia hojas de cedro, estragón y un fondo suave de almizcle, ámbar y madera de sicómoro.";
  p166.precio = 100000;
}

const p167 = productosDB.find(prod => prod.id === 167); 
if (p167) {
  p167.nombre = "Versace Eros";
  p167.descripcion = "Fragancia fresca, dulce y seductora. Presenta notas de menta fresca, manzana verde crujiente y limón de Italia en la salida, con un corazón cálido de haba tonka, ambroxan y geranio sobre maderas y vainilla.";
  p167.precio = 100000;
}

const p168 = productosDB.find(prod => prod.id === 168); 
if (p168) {
  p168.nombre = "Spicebomb";
  p168.descripcion = "Fragancia explosiva, picante y especiada. Fusiona notas de bergamota y pomelo con un corazón ardiente de pimienta rosa, azafrán y canela, sobre un fondo masculino de tabaco, cuero y vetiver.";
  p168.precio = 100000;
}

const p169 = productosDB.find(prod => prod.id === 169); 
if (p169) {
  p169.nombre = "Yves Saint Laurent Y";
  p169.descripcion = "Aroma fresco, aromático y amaderado. Destaca por notas de salida de manzana verde, jengibre y bergamota, seguidas de salvia, enebro y geranio, apoyadas en una base elegante de madera de ámbar, haba tonka y cedro.";
  p169.precio = 110000;
}

const p170 = productosDB.find(prod => prod.id === 170); 
if (p170) {
  p170.nombre = "Ahli Corvus";
  p170.descripcion = "Fragancia oriental, cautivadora y sofisticada. Mezcla notas florales elegantes y acordes afrutados dulces con un fondo denso de maderas nobles, ámbar y almizcle.";
  p170.precio = 110000;
}

const p171 = productosDB.find(prod => prod.id === 171); 
if (p171) {
  p171.nombre = "9 PM Elixir Estuche";
  p171.descripcion = "Aroma intenso, ambarado y seductor. Una versión más concentrada que destaca por su apertura dulzona, acordes profundos de lavanda y especias, con un fondo cremoso y ahumado de haba tonka, resinas y vainilla.";
  p171.precio = 115000;
}

const p172 = productosDB.find(prod => prod.id === 172); 
if (p172) {
  p172.nombre = "9 AM";
  p172.descripcion = "Fragancia fresca, cítrica y revitalizante. Diseñada para el día, combina notas de mandarina, manzana, cardamomo y pimienta rosa con un corazón de lavanda y flor de azahar, cerrando con un fondo limpio de cedro, pachulí y almizcle.";
  p172.precio = 110000;
}

const p173 = productosDB.find(prod => prod.id === 173); 
if (p173) {
  p173.nombre = "9 PM Rebel";
  p173.descripcion = "Perfume audaz, frutal y dulce. Aporta una variante más vibrante de la línea con notas chispeantes de piña, mandarina y manzana en la salida, sobre un corazón especiado y una base cálida de vainilla, ámbar y maderas.";
  p173.precio = 110000;
}

const p174 = productosDB.find(prod => prod.id === 174); 
if (p174) {
  p174.nombre = "9 PM";
  p174.descripcion = "Perfume muy popular, dulce, oriental y gourmand. Sobresale por notas de manzana, canela, bergamota y lavanda en la salida, evolucionando hacia flor de azahar y un fondo envolvente de vainilla, haba tonka, ámbar y pachulí.";
  p174.precio = 110000;
}

const p175 = productosDB.find(prod => prod.id === 175); 
if (p175) {
  p175.nombre = "Club Nuit Women";
  p175.descripcion = "Aroma femenino, sofisticado y envolvente. Mezcla notas florales blancas con toques afrutados jugosos sobre una base cálida y cremosa de madera de sándalo, ámbar y almizcle.";
  p175.precio = 110000;
}

const p176 = productosDB.find(prod => prod.id === 176); 
if (p176) {
  p176.nombre = "Club Nuit Intense Women";
  p176.descripcion = "Fragancia floral-oriental intensa y elegante. Presenta acordes de rosa, azafrán y geranio en la salida, con un corazón de violeta y especias picantes sobre un fondo profundo de madera de agar (oud), pachulí, ámbar y vainilla.";
  p176.precio = 110000;
}

const p177 = productosDB.find(prod => prod.id === 177); 
if (p177) {
  p177.nombre = "Nitro Red";
  p177.descripcion = "Fragancia frutal, acuática y ultra vibrante. Abre con una nota prominente de sandía jugosa, manzana y lavanda, sobre un corazón fresco y un fondo cálido de ámbar, vainilla y maderas suaves.";
  p177.precio = 110000;
}

const p178 = productosDB.find(prod => prod.id === 178); 
if (p178) {
  p178.nombre = "Nitro Red Intensely";
  p178.descripcion = "Una versión más densa, dulce y seductora del Nitro Red original. Acentúa la jugosidad frutal con un toque especiado y un fondo ambarado más profundo y duradero.";
  p178.precio = 110000;
}

const p179 = productosDB.find(prod => prod.id === 179); 
if (p179) {
  p179.nombre = "Hawas Pour Homme";
  p179.descripcion = "Fragancia acuática, frutal y muy popular. Combina notas efervescentes de manzana, bergamota, canela y limón con un corazón acuático, lavanda y una base de ámbar gris, almizcle y madera de drina.";
  p179.precio = 115000;
}

const p180 = productosDB.find(prod => prod.id === 180); 
if (p180) {
  p180.nombre = "Hawas Ice";
  p180.descripcion = "Una versión aún más fresca y helada del Hawas tradicional. Añade un toque efervescente de menta helada, cítricos intensificados y manzana crujiente sobre la clásica base marina-ambarada.";
  p180.precio = 115000;
}

const p181 = productosDB.find(prod => prod.id === 181); 
if (p181) {
  p181.nombre = "Hawas Fire";
  p181.descripcion = "Fragancia cálida, especiada y ardiente. Destaca por notas picantes y amaderadas que se entrelazan con la firma acuática y afrutada de la colección Hawas.";
  p181.precio = 115000;
}

const p182 = productosDB.find(prod => prod.id === 182); 
if (p182) {
  p182.nombre = "Hawas Elixir";
  p182.descripcion = "Aroma concentrado, amaderado y oriental. Aporta mayor calidez y profundidad a la línea con notas especiadas, resinas ricas, toques dulzones y una potente base de ámbar y maderas.";
  p182.precio = 115000;
}

const p183 = productosDB.find(prod => prod.id === 183); 
if (p183) {
  p183.nombre = "Odyssey Candee";
  p183.descripcion = "Perfume dulce, divertido y gourmand. Destaca por notas de golosinas, frutas maduras, vainilla y algodón de azúcar sobre una base suave y cremosa de ámbar.";
  p183.precio = 115000;
}

const p184 = productosDB.find(prod => prod.id === 184); 
if (p184) {
  p184.nombre = "Island Bliss (Estuche)";
  p184.descripcion = "Mantiene el mismo perfil olfativo fresco, frutal y veraniego con acordes de coco, cítricos y maderas cremosas en una presentación en estuche.";
  p184.precio = 130000;
}

const p185 = productosDB.find(prod => prod.id === 185); 
if (p185) {
  p185.nombre = "Island Breeze (Lujo)";
  p185.descripcion = "Fragancia fresca, acuática y tropical. Destaca por notas cítricas efervescentes mezcladas con brisa marina, acordes florales suaves y un fondo limpio de almizcle y maderas blancas.";
  p185.precio = 125000;
}

const p186 = productosDB.find(prod => prod.id === 186); 
if (p186) {
  p186.nombre = "Bon Bon (Lujo)";
  p186.descripcion = "Aroma dulce, goloso y envolvente. Fusiona notas de caramelo, melocotón y mandarina con un corazón de flor de azahar y jazmín sobre una base cálida de madera de cedro, sándalo y ámbar.";
  p186.precio = 125000;
}

const p187 = productosDB.find(prod => prod.id === 187); 
if (p187) {
  p187.nombre = "Yum Yum (Estuche)";
  p187.descripcion = "Perfume gourmand, cremoso y tentador. Combina notas de frutos rojos dulces, vainilla y crema batida con matices florales suaves y un fondo de azúcar tostado y almizcle.";
  p187.precio = 130000;
}

const p188 = productosDB.find(prod => prod.id === 188); 
if (p188) {
  p188.nombre = "Marshmallow Blush (Estuche)";
  p188.descripcion = "Fragancia ultra dulce, esponjosa y femenina. Sobresalen las notas de malvavisco (masmelo), fresa madura y flor de vainilla con un toque sutil de almizcle empolvado.";
  p188.precio = 130000;
}

const p189 = productosDB.find(prod => prod.id === 189); 
if (p189) {
  p189.nombre = "Musamam White (Estuche)";
  p189.descripcion = "Aroma fresco, elegante y oriental. Destaca por notas cítricas luminosas de bergamota y naranja en la salida, acompañadas de flor de azahar, coco cremoso, sándalo y un fondo suave de ámbar y almizcle blanco.";
  p189.precio = 130000;
}

const p190 = productosDB.find(prod => prod.id === 190); 
if (p190) {
  p190.nombre = "Her Confession";
  p190.descripcion = "Perfume femenino, sensual y envolvente. Ofrece una rica combinación de notas florales blancas, misticismo especiado, vainilla cremosa, incienso y un fondo cálido de maderas preciosas.";
  p190.precio = 130000;
}

const p191 = productosDB.find(prod => prod.id === 191); 
if (p191) {
  p191.nombre = "Now Women";
  p191.descripcion = "Fragancia dulce, moderna y vibrante. Mezcla notas jugosas de frutos rojos y melocotón con un corazón floral elegante y un fondo cálido de vainilla, almizcle y maderas suaves.";
  p191.precio = 105000;
}

const p192 = productosDB.find(prod => prod.id === 192); 
if (p192) {
  p192.nombre = "Teriaq";
  p192.descripcion = "Fragancia gourmet, cálida y seductora. Mezcla notas intensas de caramelo, miel y almendra dulce con azafrán, cuero suave, vainilla y un fondo profundo de tonka y maderas.";
  p192.precio = 110000;
}

const p193 = productosDB.find(prod => prod.id === 193); 
if (p193) {
  p193.nombre = "Mallow Madness (Lujo)";
  p193.descripcion = "Aroma ultra dulce, cremoso y goloso. Ofrece notas destacadas de malvavisco (masmelo), crema batida y azúcar empolvado con matices suaves de vainilla y almizcle.";
  p193.precio = 125000;
}

const p194 = productosDB.find(prod => prod.id === 194); 
if (p194) {
  p194.nombre = "Choco Overdose (Lujo)";
  p194.descripcion = "Perfume intensamente gourmand y envolvente. Combina acordes ricos de chocolate negro, cacao tostado, praliné de avellana y una base cálida de vainilla y leche cremosa.";
  p194.precio = 125000;
}

const p195 = productosDB.find(prod => prod.id === 195); 
if (p195) {
  p195.nombre = "Berry On Top (Lujo)";
  p195.descripcion = "Fragancia frutal, dulce y jugosa. Destaca por una explosión de frutos rojos, moras y frambuesas con un toque de crema de vainilla y un fondo suave y almizclado.";
  p195.precio = 130000;
}

const p196 = productosDB.find(prod => prod.id === 196); 
if (p196) {
  p196.nombre = "Cookie Crave (Lujo)";
  p196.descripcion = "Perfume dulzón inspirador de repostería. Evoca el olor a galletas recién horneadas con notas de mantequilla, mantequilla de maní/avellana, chispas de chocolate y vainilla.";
  p196.precio = 130000;
}

const p197 = productosDB.find(prod => prod.id === 197); 
if (p197) {
  p197.nombre = "Vanilla Freak (Lujo)";
  p197.descripcion = "Aroma denso, cálido y reconfortante. Centrado en la vainilla pura mezclada con matices de haba tonka, azúcar moreno y un toque cremoso de sándalo.";
  p197.precio = 130000;
}

const p198 = productosDB.find(prod => prod.id === 198); 
if (p198) {
  p198.nombre = "Whipped Pleasure (Lujo)";
  p198.descripcion = "Fragancia cremosa, golosa y apetecible. Presenta acordes de nata montada, malvavisco, frutas almibaradas y un secado cálido de vainilla y ámbar dulce.";
  p198.precio = 125000;
}

const p199 = productosDB.find(prod => prod.id === 199); 
if (p199) {
  p199.nombre = "Mayar Natural";
  p199.descripcion = "Aroma limpio, luminoso y herbal-frutal. Destaca por acordes de agua de coco, cítricos suaves, flores blancas y un fondo de almizcle verde y maderas ligeras.";
  p199.precio = 105000;
}

const p200 = productosDB.find(prod => prod.id === 200); 
if (p200) {
  p200.nombre = "Mayar Traditional";
  p200.descripcion = "Fragancia femenina, fresca y frutal-floral. Combina lichi jugoso, frambuesa y hojas de violeta con un corazón elegante de rosa y peonía, sobre una base suave de vainilla y almizcle.";
  p200.precio = 105000;
}

const p201 = productosDB.find(prod => prod.id === 201); 
if (p201) {
  p201.nombre = "Haya Estuche";
  p201.descripcion = "Aroma elegante, femenino y frutal-floral. Combina notas de fresa madura, champán efervescente y mandarina con un corazón de rosa, jazmín y gardenia sobre una base suave de vainilla, praliné y sándalo.";
  p201.precio = 130000;
}

const p202 = productosDB.find(prod => prod.id === 202); 
if (p202) {
  p202.nombre = "Eclaire";
  p202.descripcion = "Fragancia cremosa, dulce y gourmand. Destaca por intensas notas de leche de caramelo, miel y azúcar tostado con un corazón de flores blancas suaves y un fondo cálido de vainilla y praliné.";
  p202.precio = 110000;
}

const p203 = productosDB.find(prod => prod.id === 203); 
if (p203) {
  p203.nombre = "Noble Blush (Estuche)";
  p203.descripcion = "Fragancia empolvada, delicada y romántica. Fusiona notas de leche de almendras, pétalos de rosa y peonía con un toque sutil de merengue dulce y un fondo envolvente de almizcle blanco y madera de sándalo.";
  p203.precio = 120000;
}

const p204 = productosDB.find(prod => prod.id === 204); 
if (p204) {
  p204.nombre = "Bharara Rose (Estuche)";
  p204.descripcion = "Aroma floral, frutal y radiante. Sobresale por una combinación elegante de rosas frescas de mayo, lichi jugoso y bergamota en la salida, evolucionando hacia un fondo rico de ámbar, vainilla y almizcle.";
  p204.precio = 130000;
}

const p205 = productosDB.find(prod => prod.id === 205); 
if (p205) {
  p205.nombre = "Niche Femme (Estuche)";
  p205.descripcion = "Fragancia sofisticada, floral y amaderada. Destaca por un inicio de cítricos luminosos y frutas suaves, evolucionando hacia un corazón de rosa elegante y jazmín, sobre una base rica de ámbar, vainilla y maderas preciosas.";
  p205.precio = 130000;
}

const p206 = productosDB.find(prod => prod.id === 206); 
if (p206) {
  p206.nombre = "Velvet Gold (Estuche)";
  p206.descripcion = "Aroma opulento, dulce y empolvado. Fusiona acordes de violeta, rosa y pimienta rosa en la salida con un corazón cálido de pachulí y caramelo, cerrando con un fondo suave de almizcle blanco, vainilla y ámbar.";
  p206.precio = 120000;
}

const p207 = productosDB.find(prod => prod.id === 207); 
if (p207) {
  p207.nombre = "Delina Royal Essence";
  p207.descripcion = "Fragancia floral, elegante y refinada. Combina la frescura ácida del lichi, ruibarbo y bergamota con un corazón majestuoso de rosa turca y peonía, asentado en una base sensual de madera de cachemira, incienso y vainilla.";
  p207.precio = 100000;
}

const p208 = productosDB.find(prod => prod.id === 208); 
if (p208) {
  p208.nombre = "Ariana Grande ARI";
  p208.descripcion = "Fragancia ultra femenina, dulce y frutal-gourmand. Abre con notas chispeantes de frambuesa, pera y pomelo, con un corazón floral de orquídea de vainilla y lirio de los valles, sobre un fondo cremoso de malvavisco (masmelo), almizcle y maderas claras.";
  p208.precio = 100000;
}

const p209 = productosDB.find(prod => prod.id === 209); 
if (p209) {
  p209.nombre = "Ariana Grande Sweet Candy";
  p209.descripcion = "Perfume goloso, divertido y juvenil. Sobresalen las notas de algodón de azúcar, moras maduras, bergamota y vainilla sobre un fondo suavemente almizclado.";
  p209.precio = 100000;
}

const p210 = productosDB.find(prod => prod.id === 210); 
if (p210) {
  p210.nombre = "Yara Tradicional";
  p210.descripcion = "Fragancia dulce, cremosa y tropical. Presenta notas de orquídea, heliotropo y mandarina en la salida, evolucionando hacia un corazón irresistible de acorde goloso y frutas tropicales, sobre una base de vainilla, sándalo y almizcle.";
  p210.precio = 110000;
}

const p211 = productosDB.find(prod => prod.id === 211); 
if (p211) {
  p211.nombre = "Yara Elixir";
  p211.descripcion = "Versión más intensa, cálida y envolvente. Acentúa las notas de frutas almibaradas y flores exóticas con un fondo profundo y persistente de resinas dulzonas, vainilla concentrada y maderas cremosas.";
  p211.precio = 110000;
}

const p212 = productosDB.find(prod => prod.id === 212); 
if (p212) {
  p212.nombre = "Yara Candy";
  p212.descripcion = "Perfume jugoso, frutal y acaramelado. Destaca por matices de grosella negra, fresa silvestre y golosinas cítricas con un toque esponjoso de vainilla y almizcle blanco.";
  p212.precio = 110000;
}

const p213 = productosDB.find(prod => prod.id === 213); 
if (p213) {
  p213.nombre = "Yara Moi";
  p213.descripcion = "Fragancia dulce, amaderada y cremosa. Combina notas de melocotón (durazno) jugoso y jazmín en la salida con un corazón suave de caramelo y ámbar, sobre una base elegante de pachulí y sándalo.";
  p213.precio = 110000;
}

const p214 = productosDB.find(prod => prod.id === 214); 
if (p214) {
  p214.nombre = "Yara Tous";
  p214.descripcion = "Perfume exótico, tropical y frutal. Destaca por notas vibrantes de mango, coco y maracuyá (fruta de la pasión) con un corazón de flor de azahar y jazmín, cerrando con un fondo cálido de vainilla y almizcle.";
  p214.precio = 110000;
}

const p215 = productosDB.find(prod => prod.id === 215); 
if (p215) {
  p215.nombre = "Mod Blush";
  p215.descripcion = "Fragancia moderna, frutal-floral y delicada. Abre con maracuyá, frambuesa y pimienta rosa, evoluciona hacia un corazón de rosa de mayo y magnolia, y se asienta en un fondo suave de almizcle y maderas claras.";
  p215.precio = 105000;
}

const p216 = productosDB.find(prod => prod.id === 216); 
if (p216) {
  p216.nombre = "Ariana Grande Moonlight";
  p216.descripcion = "Fragancia dulce, frutal y sensual. Mezcla grosellas negras y ciruela madura con un corazón cremoso de malvavisco (masmelo) y peonía, sobre un fondo envolvente de ámbar, sándalo y vainilla.";
  p216.precio = 100000;
}

const p217 = productosDB.find(prod => prod.id === 217); 
if (p217) {
  p217.nombre = "Ariana Grande R.E.M";
  p217.descripcion = "Aroma dulce, cósmico y empolvado. Presenta notas de caramelo salado, zefir (merengue) y lavanda relajante en la salida, con un fondo reconfortante de haba tonka, sándalo y almizcle blanco.";
  p217.precio = 110000;
}

const p218 = productosDB.find(prod => prod.id === 218); 
if (p218) {
  p218.nombre = "Ariana Grande Thank U, Next 2.0";
  p218.descripcion = "Perfume fresco, juvenil y afrutado. Destaca por matices de fresa silvestre, jugo de pera y maracuyá con un corazón floral ligero y una base dulce de almizcle blanco y madera suave.";
  p218.precio = 110000;
}

const p219 = productosDB.find(prod => prod.id === 219); 
if (p219) {
  p219.nombre = "Ariana Grande Thank U, Next";
  p219.descripcion = "Fragancia dulce, jugosa y coqueta. Abre con notas de pera blanca y frambuesa silvestre, un corazón cremoso de coco y pétalos de rosa, apoyado en una base de azúcar rosado y almizcle velouté.";
  p219.precio = 110000;
}

const p220 = productosDB.find(prod => prod.id === 220); 
if (p220) {
  p220.nombre = "Ariana Grande Cloud";
  p220.descripcion = "Fragancia icónica, dulce, gourmand y envolvente. Combina notas efervescentes de bergamota, pera y lavanda con un corazón cremoso de crema de coco, praliné y orquídea de vainilla sobre maderas y almizcle.";
  p220.precio = 110000;
}

const p221 = productosDB.find(prod => prod.id === 221); 
if (p221) {
  p221.nombre = "Ariana Grande Cloud Pink";
  p221.descripcion = "Aroma frutal, esponjoso y soñador. Añade un toque jugoso de fruta de la pasión (maracuyá) y piña a la firma cremosa de agua de coco, orquídea de vainilla, praliné y maderas ambaradas.";
  p221.precio = 110000;
}

const p222 = productosDB.find(prod => prod.id === 222); 
if (p222) {
  p222.nombre = "Bleecker Street";
  p222.descripcion = "Fragancia fresca, amaderada y verde. Fusiona notas de violeta, hojas de grosellero negro y tomillo con un corazón de jazmín y canela, sobre un fondo elegante de musgo de roble, gamuza, madera de cedro y ámbar.";
  p222.precio = 130000;
}

const p223 = productosDB.find(prod => prod.id === 223); 
if (p223) {
  p223.nombre = "Fantasy";
  p223.descripcion = "Perfume dulzón, gourmand y frutal. Destaca por notas de kiwi, lichi rojo y membrillo jugoso en la salida, evolucionando hacia chocolate blanco, orquídea y pastelito (cupcake), sobre una base suave de almizcle y maderas.";
  p223.precio = 100000;
}

const p224 = productosDB.find(prod => prod.id === 224); 
if (p224) {
  p224.nombre = "Burberry Her";
  p224.descripcion = "Fragancia frutal, moderna y vibrante. Abre con una explosión de frutos rojos y oscuros (fresa, frambuesa, mora y grosella negra), un corazón floral de jazmín y violeta, y un fondo de ámbar y almizcle blanco.";
  p224.precio = 105000;
}

const p225 = productosDB.find(prod => prod.id === 225); 
if (p225) {
  p225.nombre = "La Bomba";
  p225.descripcion = "Fragancia frutal, tropical y seductora. Sobresalen las notas de fruta de la pasión (maracuyá), toronja jugosa y peonía amarilla sobre una base cálida de orquídea de vainilla y maderas solares.";
  p225.precio = 115000;
}

const p226 = productosDB.find(prod => prod.id === 226); 
if (p226) {
  p226.nombre = "212 VIP Dama Metálica";
  p226.descripcion = "Perfume festivo, glamuroso y dulce. Destaca por acordes de ron, fruta de la pasión y flores blancas con un fondo cremoso de vainilla, tonka y almizcle.";
  p226.precio = 110000;
}

const p227 = productosDB.find(prod => prod.id === 227); 
if (p227) {
  p227.nombre = "212 VIP Rosé Red";
  p227.descripcion = "Aroma especiado, frutal y vibrante. Combina el toque picante del tomate cherry y el licor de frambuesa con especias dulces, tiramisú, rosa elegante y un fondo amaderado de pachulí.";
  p227.precio = 100000;
}

const p228 = productosDB.find(prod => prod.id === 228); 
if (p228) {
  p228.nombre = "212 Heroes Dama";
  p228.descripcion = "Fragancia efervescente, juvenil y floral-frutal. Mezcla notas chispeantes de frambuesa y mandarina con un corazón floral de jazmín y flor de azahar, asentadas en un fondo de sándalo y cedro.";
  p228.precio = 100000;
}

const p229 = productosDB.find(prod => prod.id === 229); 
if (p229) {
  p229.nombre = "212 NYC Dama";
  p229.descripcion = "Perfume urbano, fresco y floral. Presenta notas de flor de azahar, bergamota y mandarina en la salida, un corazón elegante de lirio, gardenia y camelia, sobre un fondo suave de madera de sándalo y almizcle.";
  p229.precio = 100000;
}

const p230 = productosDB.find(prod => prod.id === 230); 
if (p230) {
  p230.nombre = "212 Sexy Dama";
  p230.descripcion = "Perfume seductor, dulce y especiado. Abre con pimienta rosa, mandarina y bergamota, un corazón de algodón de azúcar, gardenia y flores, y un fondo envolvente de vainilla, sándalo y almizcle.";
  p230.precio = 100000;
}

const p231 = productosDB.find(prod => prod.id === 231); 
if (p231) {
  p231.nombre = "Dazzling Garden";
  p231.descripcion = "Fragancia sensual, floral y oriental. Destaca por notas de almendra y café en la salida, un corazón luminoso de nardos (tuberosa) y jazmín sambac, con una base dulce de haba tonka y cacao.";
  p231.precio = 100000;
}

const p232 = productosDB.find(prod => prod.id === 232); 
if (p232) {
  p232.nombre = "Blush Good Girl";
  p232.descripcion = "Aroma floral, empolvado y romántico. Mezcla notas frescas de bergamota y mandarina con un corazón pastel de peonía y agua de rosas, cerrando con una base cremosa de vainilla y haba tonka.";
  p232.precio = 100000;
}

const p233 = productosDB.find(prod => prod.id === 233); 
if (p233) {
  p233.nombre = "Good Girl Gold";
  p233.descripcion = "Aroma glamuroso, oriental y brillante. Presenta notas ricas de almendra, tuberosa y jazmín realzadas por una calidez dulce de haba tonka, ámbar y acordes cremosos de cacao.";
  p233.precio = 100000;
}

const p234 = productosDB.find(prod => prod.id === 234); 
if (p234) {
  p234.nombre = "Good Girl Tradicional";
  p234.descripcion = "Fragancia icónica, sofisticada y audaz. Fusiona la frescura del jazmín y el nardo con la calidez profunda del cacao, café y haba tonka sobre un fondo amaderado y dulce.";
  p234.precio = 100000;
}

const p235 = productosDB.find(prod => prod.id === 235); 
if (p235) {
  p235.nombre = "Good Girl Fantastic";
  p235.descripcion = "Variación deslumbrante y alegre de la firma Good Girl. Conserva el contraste de flores blancas elegantes (nardo, jazmín) con matices de café, almendra y un fondo dulce y atrayente de praliné y vainilla.";
  p235.precio = 100000;
}

const p236 = productosDB.find(prod => prod.id === 236); 
if (p236) {
  p236.nombre = "Good Girl Supreme";
  p236.descripcion = "Aroma intenso, gourmand y extravagante. Combina jugosas bayas silvestres y jazmín egipcio en la salida, con un corazón goloso de haba tonka y un fondo moderno de vetiver.";
  p236.precio = 100000;
}

const p237 = productosDB.find(prod => prod.id === 237); 
if (p237) {
  p237.nombre = "Good Girl Legere";
  p237.descripcion = "Versión más luminosa, fresca y moderna del clásico Good Girl. Añade notas de ylang-ylang, dulce de leche y cítricos a la combinación floral de nardo y jazmín con fondo de haba tonka.";
  p237.precio = 100000;
}

const p238 = productosDB.find(prod => prod.id === 238); 
if (p238) {
  p238.nombre = "CH Women";
  p238.descripcion = "Fragancia elegante, atemporal y frutal-amaderada. Destaca por notas de toronja, bergamota y limón en la salida, un corazón de praliné, rosa y jazmín, y un fondo de cuero, pachulí, sándalo y madera de cedro.";
  p238.precio = 100000;
}

const p239 = productosDB.find(prod => prod.id === 239); 
if (p239) {
  p239.nombre = "Chanel Nº 5";
  p239.descripcion = "El clásico atemporal por excelencia. Destaca por su apertura icónica de aldehídos luminosos y neroli, un corazón floral denso de ylang-ylang, rosa de mayo y jazmín, asentado en una base empolvada y cálida de sándalo, vainilla y vetiver.";
  p239.precio = 100000;
}

const p240 = productosDB.find(prod => prod.id === 240); 
if (p240) {
  p240.nombre = "Coco Mademoiselle";
  p240.descripcion = "Fragancia sofisticada, oriental y moderna. Abre con notas cítricas efervescentes de naranja y bergamota, un corazón elegante de rosa de mayo y jazmín, y un fondo envolvente de pachulí, vetiver, vainilla y almizcle blanco.";
  p240.precio = 100000;
}


const p241 = productosDB.find(prod => prod.id === 241); 
if (p241) {
  p241.nombre = "Miss Dior";
  p241.descripcion = "fragancia femenina de la familia ámbar floral, aclamada por su aroma romántico, elegante, luminoso y aterciopelado.";
  p241.precio = 100000;
}

const p242 = productosDB.find(prod => prod.id === 242); 
if (p242) {
  p242.nombre = "J'adore";
  p242.descripcion = "Fragancia icónica, opulenta y deslumbrantemente floral. Combina notas de salida de melón, durazno, pera y bergamota con un corazón majestuoso de jazmín, rosa de Damasco, orquídea y nardo, asentadas en un fondo suave de almizcle, vainilla y cedro.";
  p242.precio = 100000;
}

const p243 = productosDB.find(prod => prod.id === 243); 
if (p243) {
  p243.nombre = "Devotion";
  p243.descripcion = "Perfume dulce, gourmand y luminoso. Abre con una adictiva nota de limones confitados (cítricos acaramelados), evoluciona hacia un corazón radiante de flor de azahar y se asienta en una base cálida y cremosa de vainilla.";
  p243.precio = 105000;
}

const p244 = productosDB.find(prod => prod.id === 244); 
if (p244) {
  p244.nombre = "Dolce y Gabbana Q";
  p244.descripcion = "Fragancia frutal, cítrica y leñosa. Combina la efervescencia de la cereza ácida y el limón de Sicilia con un corazón floral de heliotropo sobre un fondo elegante de madera de cedro y almizcle.";
  p244.precio = 100000;
}

const p245 = productosDB.find(prod => prod.id === 245); 
if (p245) {
  p245.nombre = "Light Blue";
  p245.descripcion = "Aroma chispeante, fresco y mediterráneo. Destaca por notas de manzana verde Granny Smith, limón siciliano y campanilla, combinadas con un corazón de bambú, rosa blanca y jazmín, sobre una base limpia de madera de cedro, ámbar y almizcle.";
  p245.precio = 100000;
}

const p246 = productosDB.find(prod => prod.id === 246); 
if (p246) {
  p246.nombre = "The One Dama";
  p246.descripcion = "Perfume cálido, oriental y envolvente. Destaca por notas de salida de lichi, durazno, mandarina y bergamota, seguidas de un corazón de azucena, ciruela y jazmín, apoyado en una base rica de vainilla, ámbar, almizcle y vetiver.";
  p246.precio = 100000;
}

const p247 = productosDB.find(prod => prod.id === 247); 
if (p247) {
  p247.nombre = "Sorbetto Rosso";
  p247.descripcion = "Fragancia ultra fresca, jugosa y veraniega. Evoca una brisa marina y tropical dominada por notas de sandía crujiente, cítricos, sal marina y manzana verde, con un fondo suave de almizcle y ámbar.";
  p247.precio = 100000;
}

const p248 = productosDB.find(prod => prod.id === 248); 
if (p248) {
  p248.nombre = "The Scent Dama";
  p248.descripcion = "Fragancia seductora, dulce y elegante. Destaca por notas de salida de durazno (melocotón) acaramelado y flor de freesia, un corazón de flor de osmanthus exótico y un fondo profundo y adictivo de cacao tostado.";
  p248.precio = 100000;
}

const p249 = productosDB.find(prod => prod.id === 249); 
if (p249) {
  p249.nombre = "Hugo XX";
  p249.descripcion = "Fragancia moderna, floral y amaderada. Abre con notas cítricas y afrutadas de mandarina, arándano y lichi, evolucionando hacia un corazón de jazmín, con un fondo sofisticado de sándalo y ámbar.";
  p249.precio = 100000;
}

const p250 = productosDB.find(prod => prod.id === 250); 
if (p250) {
  p250.nombre = "Issey Miyake L'Eau d'Issey Dama";
  p250.descripcion = "Aroma acuático, floral y atemporal. Combina la frescura de la flor de loto, agua de rosas, freesia y melón con un corazón de lirios acuáticos y peonía, asentado en una base de maderas preciosas, clavel y almizcle.";
  p250.precio = 100000;
}

const p251 = productosDB.find(prod => prod.id === 251); 
if (p251) {
  p251.nombre = "Divine (Cilindro)";
  p251.descripcion = "Fragancia marina, floral y gourmand. Mezcla una nota salada de brisa marina con flor de azahar, jazmín y ylang-ylang, sobre un fondo dulce e irresistible de merengue y almizcle.";
  p251.precio = 115000;
}

const p252 = productosDB.find(prod => prod.id === 252); 
if (p252) {
  p252.nombre = "La Belle";
  p252.descripcion = "Aroma dulce, ultra femenino y oriental-gourmand. Abre con notas jugosas de pera verde, evoluciona hacia un corazón especiado de bergamota y se apoya en una base muy cálida y adictiva de vainilla pod.";
  p252.precio = 110000;
}

const p253 = productosDB.find(prod => prod.id === 253); 
if (p253) {
  p253.nombre = "Scandal Dama";
  p253.descripcion = "Perfume sensual, goloso y vibrante. Destaca por notas de miel dorada y naranja sanguina en la salida, acompañadas de gardenia y melocotón, sobre un fondo profundo de pachulí y caramelo.";
  p253.precio = 100000;
}

const p254 = productosDB.find(prod => prod.id === 254); 
if (p254) {
  p254.nombre = "Halloween";
  p254.descripcion = "Perfume misterioso, floral y semioriental. Presenta notas marinas, violeta y hoja de plátano en la salida, con un corazón de tuberosa, lirio de los valles y pimienta, sobre una base suave de vainilla de Madagascar y sándalo.";
  p254.precio = 100000;
}

const p255 = productosDB.find(prod => prod.id === 255); 
if (p255) {
  p255.nombre = "Meow";
  p255.descripcion = "Fragancia dulce, suave y juguetona. Combina notas de tangerina, pera, gardenia y jazmín con un corazón cremoso de flor de azahar y lirio de los valles, asentadas en un fondo de vainilla, ámbar y sándalo.";
  p255.precio = 100000;
}

const p256 = productosDB.find(prod => prod.id === 256); 
if (p256) {
  p256.nombre = "Purrs";
  p256.descripcion = "Aroma dulce, frutal-floral y coqueto. Destaca por la jugosidad del melocotón (durazno), la manzana verde y el bambú, envueltos en rosas, orquídea de vainilla y un fondo suave de coco y almizcle.";
  p256.precio = 100000;
}

const p257 = productosDB.find(prod => prod.id === 257); 
if (p257) {
  p257.nombre = "La Vida Es Bella Elixir";
  p257.descripcion = "Versión más intensa, concentrada y sensual. Acentúa la flor de iris y la rosa con un acorde profundo de licor de frambuesa, cuero suave y una base envolvente de manteca de cacao y vainilla.";
  p257.precio = 100000;
}

const p258 = productosDB.find(prod => prod.id === 258); 
if (p258) {
  p258.nombre = "La Vida Es Bella Tradicional";
  p258.descripcion = "Fragancia icónica, dulce y elegante. Fusiona notas de grosella negra y pera en la salida con un corazón de iris, jazmín y flor de azahar, sobre una rica base gourmand de praliné, vainilla, haba tonka y pachulí.";
  p258.precio = 100000;
}

const p259 = productosDB.find(prod => prod.id === 259); 
if (p259) {
  p259.nombre = "Montale Roses Musk";
  p259.descripcion = "Fragancia elegante, intensa y cautivadora. Combina la pureza de la rosa fresca recién cortada con la calidez del almizcle blanco y un sutil toque de ámbar y jazmín.";
  p259.precio = 105000;
}

const p260 = productosDB.find(prod => prod.id === 260); 
if (p260) {
  p260.nombre = "Moschino Bubble Gum";
  p260.descripcion = "Fragancia divertida, dulce y golosa. Destaca por notas de chicle de frutas, cítricos confitados y melocotón, envueltos en un corazón floral de rosa de Bulgaria y un fondo suave de canela, almizcle y cedro.";
  p260.precio = 110000;
}

const p261 = productosDB.find(prod => prod.id === 261); 
if (p261) {
  p261.nombre = "Moschino Toy 2 Dama";
  p261.descripcion = "Aroma fresco, floral y amaderado. Abre con notas chispeantes de manzana verde, mandarina y magnolia, con un corazón de peonía y grosella blanca sobre un fondo limpio de sándalo, ámbar y almizcle.";
  p261.precio = 110000;
}

const p262 = productosDB.find(prod => prod.id === 262); 
if (p262) {
  p262.nombre = "Lady Million";
  p262.descripcion = "Perfume glamour, frutal y floral-amaderado. Mezcla neroli, frambuesa y naranja amarga en la salida con un corazón de flor de azahar y jazmín sambac, asentado en un fondo rico de miel de azahar y pachulí.";
  p262.precio = 100000;
}

const p263 = productosDB.find(prod => prod.id === 263); 
if (p263) {
  p263.nombre = "Olympea";
  p263.descripcion = "Aroma icónico, fresco y salado-dulce. Mezcla la efervescencia de la mandarina verde, el jazmín acuático y la flor de jengibre con un corazón adictivo de vainilla salada sobre un fondo de ámbar gris y madera de cachemira.";
  p263.precio = 100000;
}

const p264 = productosDB.find(prod => prod.id === 264); 
if (p264) {
  p264.nombre = "Fame";
  p264.descripcion = "Fragancia moderna, tropical y luminosa. Destaca por notas jugosas de mango maduro, bergamota, un corazón elegante de jazmín puro y un fondo cálido y cremoso de incienso y sándalo.";
  p264.precio = 100000;
}

const p265 = productosDB.find(prod => prod.id === 265); 
if (p265) {
  p265.nombre = "Paris Hilton Gold Rush";
  p265.descripcion = "Perfume cálido, oriental y gourmand. Abre con notas de bergamota, limón y nectarina, evoluciona hacia orquídea de vainilla y pétalos de rosa, y cierra con un fondo adictivo de praliné, granos de vainilla y madera de cachemira.";
  p265.precio = 100000;
}

const p266 = productosDB.find(prod => prod.id === 266); 
if (p266) {
  p266.nombre = "Paris Hilton Heiress";
  p266.descripcion = "Fragancia juvenil, dulzona y efervescente. Presenta notas de maracuyá, granizado de naranja, durazno y mimosas, con un corazón floral y un fondo cremoso de tonka, granita de mora y maderas claras.";
  p266.precio = 100000;
}

const p267 = productosDB.find(prod => prod.id === 267); 
if (p267) {
  p267.nombre = "Paris Hilton Tradicional";
  p267.descripcion = "Aroma coqueto, frutal y vibrante. Destaca por la jugosidad de la manzana congelada, el melocotón y el néctar de mimosa, combinados con freesia, jazmín y un fondo limpio de sándalo y musgo.";
  p267.precio = 100000;
}

const p268 = productosDB.find(prod => prod.id === 268); 
if (p268) {
  p268.nombre = "Can Can";
  p268.descripcion = "Aroma dulce, coqueto y oriental-frutal. Destaca por notas de clementina, grosella negra y nectarina en la salida, un corazón floral de orquídea silvestre y flor de azahar, sobre un fondo cálido de ámbar, almizcle y maderas suaves.";
  p268.precio = 100000;
}

const p269 = productosDB.find(prod => prod.id === 269); 
if (p269) {
  p269.nombre = "Ralph";
  p269.descripcion = "Fragancia fresca, jovial y frutal-floral. Abre con notas efervescentes de manzana verde, osmanthus japonés y mandarina italiana, evolucionando hacia freesia y boronia sobre una base suave de almizcle y magnolia blanca.";
  p269.precio = 100000;
}

const p270 = productosDB.find(prod => prod.id === 270); 
if (p270) {
  p270.nombre = "Tommy Girl";
  p270.descripcion = "Perfume clásico, fresco, energizante y limpio. Combina notas de flor del manzano, camelia, grosella negra y mandarina en la salida, con un corazón de menta fresca, toronja, lirio y rosa, asentadas en una base de sándalo, jazmín y cedro.";
  p270.precio = 100000;
}

const p271 = productosDB.find(prod => prod.id === 271); 
if (p271) {
  p271.nombre = "Versace Donna The Gold";
  p271.descripcion = "Perfume opulento, cálido y envolvente. Destaca por notas de salida frutales y especiadas, un corazón radiante de flor de azahar y nardos, con un fondo rico y cremoso de vainilla dorada, ámbar y sándalo.";
  p271.precio = 110000;
}

const p272 = productosDB.find(prod => prod.id === 272); 
if (p272) {
  p272.nombre = "Versace Donna";
  p272.descripcion = "Fragancia sofisticada, moderna y oriental-floral. Mezcla la elegancia del jazmín de la India y notas de té de jazmín con una salida chispeante de pimienta rosa, sobre una rica base de vainilla de Madagascar y maderas nobles.";
  p272.precio = 110000;
}

const p273 = productosDB.find(prod => prod.id === 273); 
if (p273) {
  p273.nombre = "Versace Bright Crystal";
  p273.descripcion = "Aroma radiante, fresco y floral. Abre con acordes helados de yuzu y granada, evolucionando hacia un corazón sutil de peonía, magnolia y flor de loto, para cerrar con un fondo sensual de ámbar, almizcle y caoba.";
  p273.precio = 100000;
}

const p274 = productosDB.find(prod => prod.id === 274); 
if (p274) {
  p274.nombre = "Versace Eros Femme";
  p274.descripcion = "Perfume sensual, luminoso y amaderado-floral. Fusiona notas de limón siciliano, bergamota de Calabria y granada con un corazón de flor de limón, jazmín sambac y peonía, apoyado en un fondo de sándalo, ambroxan y maderas almizcladas.";
  p274.precio = 100000;
}

const p275 = productosDB.find(prod => prod.id === 275); 
if (p275) {
  p275.nombre = "Versace Yellow Diamond";
  p275.descripcion = "Fragancia brillante, limpia y cítrica-floral. Combina la frescura del limón de Amalfi, bergamota, sorbete de pera y neroli con un corazón de flor de azahar, freesia y lirio de agua, sobre una base suave de almizcle y madera de guayaco.";
  p275.precio = 100000;
}

const p276 = productosDB.find(prod => prod.id === 276); 
if (p276) {
  p276.nombre = "Bombshell Intense";
  p276.descripcion = "Aroma vibrante, provocativo y frutal. Destaca por la jugosidad prominente de la cereza decadente en la salida, un corazón elegante de peonía roja y un fondo cálido y reconfortante de vainilla.";
  p276.precio = 100000;
}

///// COLOCO DESCRPCION A LOS IPHONE///////////////////////////////////////////////////////////////////////////////////


const ip277 = productosDB.find(prod => prod.id === 277);
if (ip277) {
  ip277.nombre = "iPhone 13 128GB";
  ip277.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip277.precio = 1720000;
}

const ip278 = productosDB.find(prod => prod.id === 278);
if (ip278) {
  ip278.nombre = "iPhone 13 256GB";
  ip278.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip278.precio = 1880000;
}

const ip279 = productosDB.find(prod => prod.id === 279);
if (ip279) {
  ip279.nombre = "iPhone 13 Pro 128GB";
  ip279.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip279.precio = 2020000;
}

const ip280 = productosDB.find(prod => prod.id === 280);
if (ip280) {
  ip280.nombre = "iPhone 13 Pro 256GB";
  ip280.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip280.precio = 2120000;
}

const ip281 = productosDB.find(prod => prod.id === 281);
if (ip281) {
  ip281.nombre = "iPhone 13 Pro 512GB";
  ip281.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip281.precio = 2320000;
}

const ip282 = productosDB.find(prod => prod.id === 282);
if (ip282) {
  ip282.nombre = "iPhone 13 Pro Max 128GB";
  ip282.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip282.precio = 2230000;
}

const ip283 = productosDB.find(prod => prod.id === 283);
if (ip283) {
  ip283.nombre = "iPhone 13 Pro Max 256GB";
  ip283.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip283.precio = 2320000;
}

const ip284 = productosDB.find(prod => prod.id === 284);
if (ip284) {
  ip284.nombre = "iPhone 13 Pro Max 512GB";
  ip284.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip284.precio = 2520000;
}

const ip285 = productosDB.find(prod => prod.id === 285);
if (ip285) {
  ip285.nombre = "iPhone 14 Pro 128GB";
  ip285.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip285.precio = 2530000;
}

const ip286 = productosDB.find(prod => prod.id === 286);
if (ip286) {
  ip286.nombre = "iPhone 14 Pro 256GB";
  ip286.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip286.precio = 2720000;
}

const ip287 = productosDB.find(prod => prod.id === 287);
if (ip287) {
  ip287.nombre = "iPhone 14 Pro 512GB";
  ip287.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip287.precio = 2920000;
}

const ip288 = productosDB.find(prod => prod.id === 288);
if (ip288) {
  ip288.nombre = "iPhone 14 Pro Max 256GB";
  ip288.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip288.precio = 2930000;
}

const ip289 = productosDB.find(prod => prod.id === 289);
if (ip289) {
  ip289.nombre = "iPhone 14 Pro Max 512GB";
  ip289.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip289.precio = 3080000;
}

const ip290 = productosDB.find(prod => prod.id === 290);
if (ip290) {
  ip290.nombre = "iPhone 14 Pro Max 1TERA";
  ip290.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip290.precio = 3180000;
}

const ip291 = productosDB.find(prod => prod.id === 291);
if (ip291) {
  ip291.nombre = "iPhone 15 128GB";
  ip291.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip291.precio = 2110000;
}

const ip292 = productosDB.find(prod => prod.id === 292);
if (ip292) {
  ip292.nombre = "iPhone 15 256GB";
  ip292.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip292.precio = 2420000;
}

const ip293 = productosDB.find(prod => prod.id === 293);
if (ip293) {
  ip293.nombre = "iPhone 15 PRO 128GB";
  ip293.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip293.precio = 2450000;
}

const ip294 = productosDB.find(prod => prod.id === 294);
if (ip294) {
  ip294.nombre = "iPhone 15 PRO 256GB";
  ip294.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip294.precio = 3020000;
}

const ip295 = productosDB.find(prod => prod.id === 295);
if (ip295) {
  ip295.nombre = "iPhone 15 PRO 512GB";
  ip295.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip295.precio = 3120000;
}

const ip296 = productosDB.find(prod => prod.id === 296);
if (ip296) {
  ip296.nombre = "iPhone 15 PRO 1TERA";
  ip296.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip296.precio = 3220000;
}

const ip297 = productosDB.find(prod => prod.id === 297);
if (ip297) {
  ip297.nombre = "iPhone 15 PRO MAX 256GB";
  ip297.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip297.precio = 3230000;
}

const ip298 = productosDB.find(prod => prod.id === 298);
if (ip298) {
  ip298.nombre = "iPhone 15 Pro Max 512GB";
  ip298.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip298.precio = 3420000;
}

const ip299 = productosDB.find(prod => prod.id === 299);
if (ip299) {
  ip299.nombre = "iPhone 16 128GB ";
  ip299.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip299.precio = 2820000;
}

const ip300 = productosDB.find(prod => prod.id === 300);
if (ip300) {
  ip300.nombre = "iPhone 16 256GB";
  ip300.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip300.precio = 3020000;
}

const ip301 = productosDB.find(prod => prod.id === 301);
if (ip301) {
  ip301.nombre = "iPhone 16 PRO 128GB";
  ip301.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip301.precio = 3420000;
}

const ip302 = productosDB.find(prod => prod.id === 302);
if (ip302) {
  ip302.nombre = "iPhone 16 PRO 256GB";
  ip302.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip302.precio = 3520000;
}

const ip303 = productosDB.find(prod => prod.id === 303);
if (ip303) {
  ip303.nombre = "iPhone 16 PRO 512GB";
  ip303.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip303.precio = 3620000;
}

const ip304 = productosDB.find(prod => prod.id === 304);
if (ip304) {
  ip304.nombre = "iPhone 16 PRO MAX 256GB";
  ip304.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip304.precio = 3920000;
}

const ip305 = productosDB.find(prod => prod.id === 305);
if (ip305) {
  ip305.nombre = "iPhone 16 PRO MAX 512GB";
  ip305.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip305.precio = 4020000;
}

const ip306 = productosDB.find(prod => prod.id === 306);
if (ip306) {
  ip306.nombre = "iPhone 16 PRO MAX 1TERA";
  ip306.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip306.precio = 4220000;
}

const ip307 = productosDB.find(prod => prod.id === 307);  ////AQUI VAN LOS IPHONE NUEVOS////////////////////////////////////////
if (ip307) {
  ip307.nombre = "iPhone 15 128GB";
  ip307.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip307.precio = 2670000;
}

const ip308 = productosDB.find(prod => prod.id === 308);
if (ip308) {
  ip308.nombre = "iPhone 16 128GB";
  ip308.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip308.precio = 3120000;
}

const ip309 = productosDB.find(prod => prod.id === 309);
if (ip309) {
  ip309.nombre = "iPhone 17 256GB";
  ip309.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip309.precio = 3570000;
}

const ip310 = productosDB.find(prod => prod.id === 310);
if (ip310) {
  ip310.nombre = "iPhone 17 AIR 256GB";
  ip310.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip310.precio = 3830000;
}

const ip311 = productosDB.find(prod => prod.id === 311);
if (ip311) {
  ip311.nombre = "iPhone 17 PRO 256GB";
  ip311.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip311.precio = 4470000;
}

const ip312 = productosDB.find(prod => prod.id === 312);
if (ip312) {
  ip312.nombre = "iPhone 17 PRO MAX 256GB";
  ip312.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip312.precio = 4970000;
}

const ip313 = productosDB.find(prod => prod.id === 313);
if (ip313) {
  ip313.nombre = "iPhone 18 PRO 256GB";
  ip313.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip313.precio = 5770000;
}

const ip314 = productosDB.find(prod => prod.id === 314);
if (ip314) {
  ip314.nombre = "iPhone 18 PRO 512GB";
  ip314.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip314.precio = 6130000;
}

const ip315 = productosDB.find(prod => prod.id === 315);
if (ip315) {
  ip315.nombre = "iPhone 18 PRO MAX 256GB";
  ip315.descripcion = "INCLUYE: Cabeza Cargador ORIGINAL + Cable Cargador + AirPods Pro2 1.1 + Estuche AirPods + Vidrio Protector + Estuche Celular.";
  ip315.precio = 6480000;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function marcarEstado(idInicio, idFin, estado) {
  productosDB.forEach(prod => {
    if (prod.categoria === "iphones" && prod.id >= idInicio && prod.id <= idFin) {
      prod.estado = estado;
    }
  });
}

marcarEstado(277, 306, "SEMINUEVO");
marcarEstado(307, 315, "NUEVO");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////PERSONALIZO LOS AIRPODS/////////////////////////

const ap1 = productosDB.find(prod => prod.id === 316);
if (ap1) {
  ap1.nombre = "AirPods Pro 2";
  ap1.descripcion = "TE INCLUYE: 1 Obsequio Misterioso.";
  ap1.precio = 85000;
}

const ap2 = productosDB.find(prod => prod.id === 317);
if (ap2) {
  ap2.nombre = "AirPods Pro 3";
  ap2.descripcion = "TE INCLUYE: 1 Obsequio Misterioso.";
  ap2.precio = 105000;
}

const ap3 = productosDB.find(prod => prod.id === 318);
if (ap3) {
  ap3.nombre = "AirPods  Series 4";
  ap3.descripcion = "TE INCLUYE: 1 Obsequio Misterioso.";
  ap3.precio = 95000;
}

const ap4 = productosDB.find(prod => prod.id === 319);
if (ap4) {
  ap4.nombre = "AirPods Max";
  ap4.descripcion = "TE INCLUYE: 1 Obsequio Misterioso.";
  ap4.precio = 140000;
}


productosDB.forEach(prod => {
  prod.imagen = prod.imagen.split("/").pop().replace(/\.png$/i, ".jpg");
});












/* =========================================================================
   2. ESTADO Y REFERENCIAS AL DOM
   ========================================================================= */

const estado = {
  vista: "inicio",
  terminoBusqueda: "",
  orden: "original"
};

const selectOrden = document.getElementById("selectOrden");

const vistaInicio      = document.getElementById("vistaInicio");
const vistaCatalogo    = document.getElementById("vistaCatalogo");
const gridProductos    = document.getElementById("gridProductos");
const catalogoTitulo   = document.getElementById("catalogoTitulo");
const catalogoContador = document.getElementById("catalogoContador");
const sinResultados    = document.getElementById("sinResultados");

const inputBusqueda = document.getElementById("inputBusqueda");
const btnLimpiar    = document.getElementById("btnLimpiar");
const buscadorInfo  = document.getElementById("buscadorInfo");

const menu       = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");

const NOMBRES_CATEGORIA = {
  inicio:   "Inicio",
  perfumes: "Perfumes 1.1",
  iphones:  "iPhone",
  airpods:  "AirPods",
  combos:   "Combos"
};

const NUMERO_WHATSAPP = "573142998752";


/* =========================================================================
   3. FORMATO DE PRECIO (COP, sin decimales)
   ========================================================================= */

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CO");
}


/* =========================================================================
   4. RENDERIZADO DE TARJETAS DE PRODUCTO
   ========================================================================= */

function crearTarjetaProducto(producto) {
  const card = document.createElement("article");
  card.className = "producto-card";

  const badgeHTML = producto.estado
    ? `<span class="badge-estado ${producto.estado === "NUEVO" ? "badge-nuevo" : "badge-seminuevo"}">${producto.estado}</span>`
    : "";

  card.innerHTML = `
    <div class="producto-imagen-wrap">
      ${badgeHTML}
      <img
        class="img-producto"
        src="${producto.imagen}"
        alt="${producto.nombre}"
        loading="lazy"
        decoding="async"
        onerror="this.src='https://via.placeholder.com/300x300/16181d/f0c24d?text=LuxPoint7'"
      >
    </div>
    <div class="producto-info">
      <p class="producto-categoria">${NOMBRES_CATEGORIA[producto.categoria]}</p>
      <h3 class="producto-nombre">${producto.nombre}</h3>
      <p class="producto-desc">${producto.descripcion}</p>
      <div class="producto-footer">
        <span class="producto-precio">${formatearPrecio(producto.precio)}</span>
        <button class="btn-whatsapp" data-nombre="${producto.nombre}">
          WhatsApp
        </button>
      </div>
    </div>
  `;

  card.querySelector(".btn-whatsapp").addEventListener("click", () => {
    enviarWhatsApp(producto);
  });

  return card;
}




function renderizarProductos(lista) {
  lista = ordenarProductos(lista);
  gridProductos.innerHTML = "";
  // ...el resto queda igual

  if (lista.length === 0) {
    sinResultados.style.display = "block";
    catalogoContador.textContent = "";
    return;
  }

  sinResultados.style.display = "none";
  catalogoContador.textContent = lista.length + (lista.length === 1 ? " producto" : " productos");

  // Se usa un DocumentFragment para insertar todas las tarjetas de una sola
  // vez en el DOM (una sola repintada), en vez de una por una. Esto es lo
  // que mantiene fluida la galería incluso con cientos de productos.
  const fragmento = document.createDocumentFragment();
  lista.forEach(producto => fragmento.appendChild(crearTarjetaProducto(producto)));
  gridProductos.appendChild(fragmento);
  gridProductos.scrollTop = 0;
}


/* =========================================================================
   5. CAMBIO DE VISTA (Inicio / Categoría / Resultados de búsqueda)
   ========================================================================= */

function mostrarVista(nombreVista) {
  estado.vista = nombreVista;

  if (nombreVista === "inicio") {
    vistaInicio.style.display = "block";
    vistaCatalogo.style.display = "none";
    actualizarMenuActivo("inicio");
    return;
  }

  vistaInicio.style.display = "none";
  vistaCatalogo.style.display = "block";

  if (nombreVista === "busqueda") {
    catalogoTitulo.textContent = `Resultados para "${estado.terminoBusqueda}"`;
    renderizarProductos(buscarProductos(estado.terminoBusqueda));
    actualizarMenuActivo(null);
  } else {
    catalogoTitulo.textContent = NOMBRES_CATEGORIA[nombreVista];
    renderizarProductos(filtrarPorCategoria(nombreVista));
    actualizarMenuActivo(nombreVista);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function actualizarMenuActivo(vista) {
  document.querySelectorAll(".menu-link").forEach(link => {
    link.classList.toggle("activo", link.dataset.vista === vista);
  });
}


/* =========================================================================
   6. FILTRADO POR CATEGORÍA Y ORDEN
   ========================================================================= */

function filtrarPorCategoria(categoria) {
  return productosDB.filter(producto => producto.categoria === categoria);
}

function ordenarProductos(lista) {
  const copia = [...lista];   // copia, para no alterar el orden original

  switch (estado.orden) {
    case "precio-asc":
      copia.sort((a, b) => a.precio - b.precio);
      break;
    case "precio-desc":
      copia.sort((a, b) => b.precio - a.precio);
      break;
    case "nombre":
      copia.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      break;
  }

  return copia;
}
/* =========================================================================
   7. BUSCADOR PREDICTIVO EN TIEMPO REAL
   -------------------------------------------------------------------------
   Busca coincidencias en "nombre" y "descripcion", sin distinguir mayúsculas
   ni tildes. Con 353 productos, la búsqueda sigue siendo instantánea porque
   recorrer un array de ese tamaño con .filter() toma microsegundos; el
   pequeño "debounce" de abajo solo evita relanzar la búsqueda en cada tecla
   mientras el usuario todavía está escribiendo.
   ========================================================================= */

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita tildes/acentos
}

function buscarProductos(termino) {
  const terminoNormalizado = normalizarTexto(termino.trim());
  if (terminoNormalizado === "") return [];

  return productosDB.filter(producto => {
    const nombreNorm = normalizarTexto(producto.nombre);
    const descNorm    = normalizarTexto(producto.descripcion);
    return nombreNorm.includes(terminoNormalizado) || descNorm.includes(terminoNormalizado);
  });
}

let debounceTimer = null;

inputBusqueda.addEventListener("input", (e) => {
  const valor = e.target.value;
  estado.terminoBusqueda = valor;
  btnLimpiar.style.display = valor ? "inline-block" : "none";

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (valor.trim() === "") {
      buscadorInfo.textContent = "";
      mostrarVista("inicio");
      return;
    }
    const resultados = buscarProductos(valor);
    buscadorInfo.textContent = `${resultados.length} resultado(s) encontrados en tiempo real`;
    mostrarVista("busqueda");
  }, 120); // alta velocidad: 120ms de espera antes de filtrar
});

btnLimpiar.addEventListener("click", () => {
  inputBusqueda.value = "";
  estado.terminoBusqueda = "";
  buscadorInfo.textContent = "";
  btnLimpiar.style.display = "none";
  mostrarVista("inicio");
  inputBusqueda.focus();
});


/* =========================================================================
   8. NAVEGACIÓN (menú superior + tarjetas de categoría en Inicio)
   ========================================================================= */

document.querySelectorAll("[data-vista]").forEach(elemento => {
  elemento.addEventListener("click", () => {
    const vista = elemento.dataset.vista;
    inputBusqueda.value = "";
    estado.terminoBusqueda = "";
    buscadorInfo.textContent = "";
    btnLimpiar.style.display = "none";
    mostrarVista(vista);
         estado.orden = "original";
    selectOrden.value = "original";
    mostrarVista(vista);
    menu.classList.remove("abierto");
  });
});

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("abierto");
});
selectOrden.addEventListener("change", (e) => {
  estado.orden = e.target.value;
  mostrarVista(estado.vista);
});

/* =========================================================================
   9. ENVÍO DE PEDIDO POR WHATSAPP
   ========================================================================= */

function enviarWhatsApp(producto) {
  const lineas = [
    "Hola LuxPoint7, quiero este producto:",
    "",
    `*${producto.nombre}*`,
    `Categoría: ${NOMBRES_CATEGORIA[producto.categoria]}`
  ];

  if (producto.estado) {
    lineas.push(`Estado: ${producto.estado}`);
  }

  lineas.push(`Precio: ${formatearPrecio(producto.precio)}`);
  lineas.push("", "¿Lo tienen disponible?");

  const mensaje = lineas.join("\n");
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}


/* =========================================================================
   10. INICIALIZACIÓN
   ========================================================================= */

mostrarVista("inicio");
