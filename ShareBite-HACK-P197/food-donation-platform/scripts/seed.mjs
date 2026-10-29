import mongoose from 'mongoose';
import {Organization,Listing} from '../lib/models.js';
if(!process.env.MONGODB_URI){console.error('Set MONGODB_URI before seeding.');process.exit(1)}
await mongoose.connect(process.env.MONGODB_URI);
const organizations=[
{name:'Green Leaf Kitchen',type:'donor',email:'greenleaf@example.test',phone:'000-000-0101',address:'Jubilee Hills, Hyderabad',description:'Community-minded vegetarian kitchen.'},
{name:'Sunrise Bakery',type:'donor',email:'sunrise@example.test',phone:'000-000-0102',address:'Madhapur, Hyderabad',description:'Local bakery sharing same-day surplus.'},
{name:'City Fresh Market',type:'donor',email:'cityfresh@example.test',phone:'000-000-0103',address:'Kondapur, Hyderabad',description:'Fresh produce retailer.'},
{name:'Hope Community Kitchen',type:'recipient',email:'hope@example.test',address:'Ameerpet, Hyderabad',description:'Meals for local families.'},
{name:'Neighbourhood Care Foundation',type:'recipient',email:'neighbourhood@example.test',address:'Kukatpally, Hyderabad',description:'Community food support.'},
{name:'Share & Smile Shelter',type:'recipient',email:'shareandsmile@example.test',address:'Secunderabad, Hyderabad',description:'Food assistance and shelter support.'}
];
const saved=[];for(const org of organizations){saved.push(await Organization.findOneAndUpdate({email:org.email},org,{upsert:true,new:true,setDefaultsOnInsert:true}))}
const donors=saved.filter(x=>x.type==='donor');const now=Date.now();const foods=[
['Fresh vegetable biryani','Prepared meals','Vegetarian biryani packed in food-safe containers.',35,'meals',0],['Bakery bread & buns','Bakery','Same-day unsold bread and buns; keep covered.',24,'boxes',1],['Fresh fruit packs','Produce','Seasonal fruit packs prepared this afternoon.',18,'portions',2],['Lentil rice lunch boxes','Prepared meals','Cooked lentil rice, labeled and packed.',20,'meals',0],['Whole wheat loaves','Bakery','Unsold whole wheat loaves from today.',15,'boxes',1],['Seasonal vegetable bundle','Produce','Clean, fresh vegetables suitable for cooking.',12,'kg',2],['Idli and chutney packs','Prepared meals','Morning surplus; keep chilled as noted by donor.',22,'meals',0],['Assorted muffins','Bakery','Individually packed assorted muffins.',30,'portions',1],['Banana and orange crate','Produce','Ripe fruit for same-day distribution.',10,'boxes',2],['Vegetable curry portions','Prepared meals','Vegetarian curry portions in sealed containers.',16,'meals',0]];
await Listing.deleteMany({title:{$in:foods.map(x=>x[0])}});
for(let i=0;i<foods.length;i++){const f=foods[i],start=new Date(now+(i+1)*3600000),end=new Date(now+(i+3)*3600000),expires=new Date(now+(i+5)*3600000);await Listing.create({donorId:donors[f[5]]._id,donorName:donors[f[5]].name,title:f[0],category:f[1],description:f[2],quantity:f[3],unit:f[4],preparedAt:new Date(now-3600000),expiresAt:expires,pickupAddress:donors[f[5]].address,pickupStart:start,pickupEnd:end,dietaryTags:f[1]==='Produce'?['Vegan']:['Vegetarian'],handlingNotes:'Demo data only. Verify safe handling and use-by guidance before collection.'})}
console.log('Seeded 6 organizations (3 donors, 3 recipients) and 10 food listings.');await mongoose.disconnect();
