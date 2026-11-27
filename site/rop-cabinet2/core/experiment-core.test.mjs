import {experiment750,experimentFee1990} from './experiment-core.mjs';
function tests(a,b){
 let n=0;const eq=(x,y)=>{if(x!==y)throw Error(`${x} != ${y}`);n++};
 const amount=(x,expected)=>eq(BigInt(x.numerator),BigInt(expected)*BigInt(x.denominator));
 const base={origin:"import_non_eaeu",releaseDate:"2026-09-01",kind:"goods",productListed:true,classificationVerified:true};
 for(const [d,expected] of [["2026-08-31",false],["2026-09-01",true],["2027-08-31",true],["2027-09-01",false],["2027-12-31",false]])eq(a({...base,releaseDate:d}).beforeRelease,expected);
 eq(a({...base,releaseDate:"2028-01-01"}).status,"OUT_OF_SCOPE");
 eq(a({...base,releaseDate:"2026-02-30"}).status,"BLOCKED");
 eq(a({...base,origin:"import_eaeu"}).status,"OUT_OF_SCOPE");
 eq(a({...base,classificationVerified:false}).status,"BLOCKED");
 eq(a({...base,kind:"packaging_of_goods",packagingRopListed:true}).status,"APPLICABLE");
 eq(a({...base,kind:"packaging_of_goods",packagingRopListed:false}).status,"NOT_APPLICABLE");
 eq(a({...base,kind:"packaging_of_goods",productListed:false,packagingRopListed:true}).status,"NOT_APPLICABLE");
 eq(a({...base,releaseDate:"2025-09-01"}).status,"BLOCKED");
 eq(a(base).annualDueDate,"2027-04-15");
 const fee={requiredKg:10000,prepaidKg:2000,creditedKg:4000,rateKopecksPerTonne:1000000,guaranteeFeeKopecks:200000,keyRateBasisPoints:1500,verified:true,securityScope:"single_position"};
 eq(b(fee).remainingKg,4000);amount(b(fee).gross,4000000);amount(b(fee).deduction,100000);amount(b(fee).feeAfterDeduction,3900000);
 amount(b({...fee,guaranteeFeeKopecks:2000000}).deduction,400000);
 amount(b({...fee,creditedKg:8000}).feeAfterDeduction,0);
 amount(b({...fee,creditedKg:0}).deduction,0);
 eq(b({...fee,creditedKg:8001}).status,"BLOCKED");
 eq(b({...fee,verified:false}).status,"BLOCKED");
 eq(b({...fee,securityScope:"multiple_positions"}).status,"BLOCKED");
 amount(b({...fee,prepaidKg:10000,creditedKg:0}).feeAfterDeduction,0);
 eq(b({...fee,requiredKg:10000.5}).status,"BLOCKED");
 return n;
}
console.log('Passed:',tests(experiment750,experimentFee1990));
