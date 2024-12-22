const mongoose=require("mongoose");
const Listing=require("./models/listing.js")

async function main(){
    await mongoose.connect("mongodb://localhost:27017/airbnb");
}

main().then(res=>console.log("Successfully Connected")).catch(err=>console.log(err));

let sampleListings =[
  {
    "title": "Cozy Beachfront Cottage",
    "description": "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    "image": {
      "url": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "filename": "TqxwVI27w3.jpg"
    },
    "price": "1500",
    "location": "Malibu",
    "country": "United States"
  },
  {
    "title": "Modern Loft in Downtown",
    "description": "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    "image": {
      "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "filename": "ckQpItpIob.jpg"
    },
    "price": "1200",
    "location": "New York City",
    "country": "United States"
  },
  {
    "title": "Historic Villa in Tuscany",
    "description": "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    "image": {
      "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "filename": "rG7oSzIFZO.jpg"
    },
    "price": "2500",
    "location": "Florence",
    "country": "Italy"
  },
  {
    "title": "Secluded Treehouse Getaway",
    "description": "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    "image": {
      "url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "filename": "pStOLXGYIB.jpg"
    },
    "price": "800",
    "location": "Portland",
    "country": "United States"
  }
];

sampleListings=sampleListings.map(ele=>({...ele,owner:"676056e2747066670b823bcb"}));
Listing.insertMany(sampleListings).then(()=>console.log("saved")).catch(err=>console.log(err));