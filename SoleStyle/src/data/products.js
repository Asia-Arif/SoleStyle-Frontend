export const COLORS={Black:'#161616',White:'#f7f7f2',Beige:'#d8c6a0',Grey:'#b5b5b5',Brown:'#7a5233',Navy:'#1f2a44',Red:'#b3202a'}
export const svg=c=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#efe7d8'/><ellipse cx='200' cy='250' rx='150' ry='12' fill='#00000018'/><path d='M60 190C60 150 90 118 130 118L190 118C210 150 250 160 330 175C358 181 358 215 330 215L80 215C65 215 60 205 60 190Z' fill='${c}' stroke='#222' stroke-width='3'/><rect x='55' y='205' width='305' height='24' rx='12' fill='#fff' stroke='#222' stroke-width='3'/><path d='M140 138L182 138M152 154L196 154M166 170L210 170' stroke='#888' stroke-width='5' stroke-linecap='round'/></svg>`)
const rows=[
['Air Stride Runner','Nike','Men','Running',18999,15,['Black','White'],4.6],['Court Classic','Adidas','Men','Sneakers',14999,10,['White','Navy'],4.5],
['Oxford Heritage','Bata','Men','Formal',8999,0,['Black','Brown'],4.3],['Urban Drift','Puma','Men','Casual',9999,20,['Grey','Beige'],4.2],
['Velocity Pro','Adidas','Men','Sports',16999,12,['Red','Black'],4.7],['Derby Executive','Servis','Men','Formal',6999,5,['Brown','Black'],4.1],
['Trail Blazer','Nike','Men','Running',20999,18,['Grey','Navy'],4.8],['Street Low','SoleStyle','Men','Sneakers',7499,25,['White','Beige'],4.4],
['Loafer Luxe','SoleStyle','Men','Formal',10999,0,['Brown','Beige'],4.5],['Flex Trainer','Puma','Men','Sports',11999,15,['Black','Grey'],4.3],
['Cloud Walk','Nike','Women','Casual',13999,10,['Beige','White'],4.6],['Aero Glide','Adidas','Women','Running',17999,20,['White','Red'],4.7],
['Satin Slip-On','SoleStyle','Women','Casual',5999,15,['Beige','Black'],4.2],['Pulse Sneaker','Puma','Women','Sneakers',12499,0,['White','Grey'],4.4],
['Ballet Flat Noir','Bata','Women','Formal',4999,10,['Black','Beige'],4.0],['Studio Train','Nike','Women','Sports',15499,12,['Navy','White'],4.5],
['Meadow Low','SoleStyle','Women','Sneakers',6999,30,['White','Beige'],4.3],['Stride Lite','Servis','Women','Running',5499,8,['Grey','Red'],4.1],
['Heritage Pump','Bata','Women','Formal',7499,0,['Black','Brown'],4.2],['Sunday Slides','SoleStyle','Women','Casual',3999,20,['Beige','Brown'],4.0],
['Mini Runner','Nike','Kids','Running',7999,10,['Red','Black'],4.6],['Junior Court','Adidas','Kids','Sneakers',6499,15,['White','Navy'],4.5],
['Playground Pro','Puma','Kids','Sports',5999,0,['Grey','Red'],4.3],['Tiny Steps','SoleStyle','Kids','Casual',3499,20,['Beige','White'],4.4],
['School Classic','Bata','Kids','Formal',3999,5,['Black','Brown'],4.2],['Zoom Kid','Nike','Kids','Running',8499,12,['Navy','Grey'],4.7],
['Skate Junior','Servis','Kids','Sneakers',3299,10,['Black','White'],4.0],['Bounce Sport','Puma','Kids','Sports',5499,18,['Red','White'],4.3],
['Cozy Casual','SoleStyle','Kids','Casual',2999,0,['Beige','Grey'],4.1],['Little Oxford','Bata','Kids','Formal',3799,10,['Brown','Black'],4.0]]
export default rows.map((r,i)=>{const [name,brand,category,type,orig,discount,colors,rating]=r
return {id:i+1,name,brand,category,type,originalPrice:orig,discount,price:Math.round(orig*(1-discount/100)),
images:[svg(COLORS[colors[0]]),svg(COLORS[colors[1]]),svg('#8a8a8a')],sizes:category==='Kids'?[28,30,32,34]:[39,40,41,42,43,44],
colors,rating,reviews:12+i*3,description:`${name} by ${brand}: a ${type.toLowerCase()} shoe for ${category.toLowerCase()} with cushioned comfort, breathable materials and a durable grip outsole.`,
stock:(i*7)%40+(i%6===0?0:3),featured:i%4===0,sold:(i*37)%200+20,createdAt:i}})
