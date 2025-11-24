#!/usr/bin/env node
/*
  Simple cost estimator for FitAI Coach.
  Usage: node scripts/estimate-cost.js [options]
  You can also set environment variables to override defaults, e.g.:
    API_COST_PER_CALL=0.02 CALLS_PER_USER_PER_MONTH=20 INFRA_COST_PER_MONTH=100 MARKETING_COST_PER_MONTH=200 ACTIVE_USERS=1000 node scripts/estimate-cost.js
*/

const env = process.env;

const deepseekCostPerCall = Number(env.API_COST_PER_CALL || 0.02);
const callsPerUserPerMonth = Number(env.CALLS_PER_USER_PER_MONTH || 20);
const infraCostPerMonth = Number(env.INFRA_COST_PER_MONTH || 60);
const marketingCostPerMonth = Number(env.MARKETING_COST_PER_MONTH || 200);
const activeUsers = Number(env.ACTIVE_USERS || 500);
const paymentFeePercent = Number(env.PAYMENT_FEE_PERCENT || 0.1);
const revenuePerUserPerMonth = Number(env.REVENUE_PER_USER_PER_MONTH || 15);

const monthlyApiCostPerUser = deepseekCostPerCall * callsPerUserPerMonth;
const sharedInfraPerUser = infraCostPerMonth / Math.max(activeUsers, 1);
const sharedMarketingPerUser = marketingCostPerMonth / Math.max(activeUsers, 1);
const paymentFeesPerUser = revenuePerUserPerMonth * paymentFeePercent;

const totalMonthlyCostPerUser =
  monthlyApiCostPerUser +
  sharedInfraPerUser +
  sharedMarketingPerUser +
  paymentFeesPerUser;
const grossRevenuePerUser = revenuePerUserPerMonth;
const profitPerUser = grossRevenuePerUser - totalMonthlyCostPerUser;

console.log("FitAI Coach — Cost Estimator");
console.log("--------------------------------");
console.log(`DeepSeek cost per call: R$ ${deepseekCostPerCall.toFixed(4)}`);
console.log(`Calls per user / month: ${callsPerUserPerMonth}`);
console.log(
  `Monthly API cost per user: R$ ${monthlyApiCostPerUser.toFixed(4)}`,
);
console.log(`Shared infra per user: R$ ${sharedInfraPerUser.toFixed(2)}`);
console.log(
  `Shared marketing per user: R$ ${sharedMarketingPerUser.toFixed(2)}`,
);
console.log(`Payment fee per user: R$ ${paymentFeesPerUser.toFixed(2)}`);
console.log("--------------------------------");
console.log(
  `Total monthly cost per user: R$ ${totalMonthlyCostPerUser.toFixed(2)}`,
);
console.log(`Revenue per user per month: R$ ${grossRevenuePerUser.toFixed(2)}`);
console.log(`Profit per user: R$ ${profitPerUser.toFixed(2)}`);
console.log("--------------------------------");
console.log(
  `Assumptions: activeUsers=${activeUsers}, infraCostPerMonth=${infraCostPerMonth}, marketingCostPerMonth=${marketingCostPerMonth}`,
);

if (profitPerUser < 0) {
  console.warn(
    "Warning: negative profit per user — adjust pricing, reduce costs, or increase scaling to reach profitability",
  );
}

process.exit(0);
