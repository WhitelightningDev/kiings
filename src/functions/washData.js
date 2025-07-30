export const washTypes = [
  {
    name: "Wash n Go",
    price: 120,
    details: "Shampoo & Wax, Tire Shine",
    recommendedExtras: ["Polish Tyres", "Ceramic Infused Spray"]
  },
  {
    name: "Wash & Vacuum",
    price: 170,
    details: "Shampoo & Wax, Vacuum, Boot & Dash, Interior, Silicone Spray, Tyre Shine",
    recommendedExtras: ["Interior Cleans Only", "Polish Tyres"]
  },
  {
    name: "Wash & Vacuum: Large SUVs & Bakkies",
    price: 200,
    details: "Shampoo & Wax, Dash Interior, Silicone, Tyre Shine",
    recommendedExtras: ["Interior Cleans Only", "Polish Tyres"]
  },
  {
    name: "Engine Bay Clean",
    price: 180,
    details: "Engine bay cleaned with pressure wash, degreased to remove stains, and finished with Dash Interior Premium.",
    recommendedExtras: ["Engine Clean", "Polish Tyres"]
  },
  {
    name: "Full Interior Detail",
    price: 550,
    details: "Seat removal, roofliner clean, stain removal, dash treatment, exterior wash, and silicone spray.",
    recommendedExtras: ["Interior Cleans Only", "Polish Tyres"]
  },
  {
    name: "1-Step Compound Finish",
    price: 750,
    details: "Removes imperfections, scratches, swirl marks. Boosts gloss, enhances shine & paint clarity.",
    recommendedExtras: ["Ceramic Infused Spray", "Polish Tyres"]
  },
  {
    name: "2-Step Polish",
    price: 950,
    details: "Refines surface minor imperfections and amplifies shine.",
    recommendedExtras: ["Ceramic Infused Spray", "Headlight Restoration"]
  },
  {
    name: "Full Valet",
    price: 550,
    details: "Removal of seats, upholstery, and rooflining for a complete deep clean.",
    recommendedExtras: ["Interior Cleans Only", "Engine Clean"]
  },
];

export const additionalServices = [
  {
    name: "Polish Tyres",
    price: 30,
    details: "High-gloss finish on all tyres using premium polish.",
  },
  {
    name: "Interior Cleans Only",
    price: 100,
    details: "Vacuum, Air vent covers cleaned, Dashboard shine & Silicone Spray, Door pannel clean",
  },
  // {
  //   name: "Engine Clean",
  //   price: 40,
  //   details: "Degreasing and cleaning of engine bay. Safe and non-corrosive.",
  // },
  {
    name: "Ceramic Infused Spray",
    price: 100,
    details: "Adds a hydrophobic layer to enhance shine and protect paint.",
  },
  {
    name: "Headlight Restoration",
    price: 200,
    details: "Restores clarity to foggy or yellowed headlights.",
  },
  {
    name: "Body Gloss",
    price: 100,
    details: "Boost's shine, enhances paint depth, and leaves a slick, glossy finish on your car"
  }
];


export const reasonsByExtra = {
  "Polish Tyres": "Gives your tyres a rich, long-lasting shine and improves the final finish.",
  "Ceramic Infused Spray": "Adds a durable hydrophobic layer to protect your paint and boost shine.",
  "Interior Cleans Only": "Keeps your cabin spotless and smelling fresh with focused interior care.",
  "Engine Clean": "Removes dirt and grease from your engine bay to help it look and perform better.",
  "Headlight Restoration": "Restores brightness and clarity for better night-time visibility and style.",
};
