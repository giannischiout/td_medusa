// Product Scheduler API Test Script
// Run with: node test-api.js

const BASE_URL = "http://localhost:9000";

// Sample data for testing
const sampleData = {
	// Use an existing product ID from your database
	productId: "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",

	rules: [
		{
			name: "Morning Schedule",
			timeSlots: [
				{ start_time: "09:00", end_time: "12:00", capacity: 10 },
				{ start_time: "14:00", end_time: "17:00", capacity: 5 },
			],
		},
		{
			name: "Evening Schedule",
			timeSlots: [
				{ start_time: "18:00", end_time: "21:00", capacity: 8 },
				{ start_time: "21:00", end_time: "00:00", capacity: 6 },
			],
		},
		{
			name: "Weekend Special",
			timeSlots: [
				{ start_time: "08:00", end_time: "11:00", capacity: 25 },
				{ start_time: "11:00", end_time: "14:00", capacity: 30 },
				{ start_time: "14:00", end_time: "17:00", capacity: 20 },
			],
		},
	],
};

async function makeRequest(url, method = "GET", data = null) {
	const options = {
		method,
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (data) {
		options.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(url, options);
		const result = await response.json();

		console.log(`${method} ${url}`);
		console.log("Response:", JSON.stringify(result, null, 2));
		console.log("---");

		return result;
	} catch (error) {
		console.error(`Error ${method} ${url}:`, error.message);
		return null;
	}
}

async function testProductSchedulerAPI() {
	console.log("🚀 Testing Product Scheduler API");
	console.log("================================\n");

	const createdRules = [];

	// Test 1: Create Rules
	console.log("📝 Creating Rules...");
	for (const ruleData of sampleData.rules) {
		const rule = await makeRequest(`${BASE_URL}/admin/product-rule`, "POST", {
			product_id: sampleData.productId,
			rule_name: ruleData.name,
		});

		if (rule && rule.rule) {
			createdRules.push({
				...ruleData,
				id: rule.rule.id,
			});
			console.log(`✅ Created rule: ${ruleData.name} (ID: ${rule.rule.id})`);
		}
	}

	// Test 2: Create Time Slots for each rule
	console.log("\n⏰ Creating Time Slots...");
	for (const rule of createdRules) {
		const timeSlots = await makeRequest(`${BASE_URL}/admin/time-slots`, "POST", {
			rule_id: rule.id,
			product_id: sampleData.productId,
			time_slots: rule.timeSlots,
		});

		if (timeSlots && timeSlots.timeSlots) {
			console.log(`✅ Created ${timeSlots.timeSlots.length} time slots for rule: ${rule.name}`);
			rule.timeSlotIds = timeSlots.timeSlots.map((ts) => ts.id);
		}
	}

	// Test 3: Update a time slot
	if (createdRules[0] && createdRules[0].timeSlotIds && createdRules[0].timeSlotIds[0]) {
		console.log("\n✏️ Updating Time Slot...");
		const updateResult = await makeRequest(
			`${BASE_URL}/admin/time-slots/${createdRules[0].timeSlotIds[0]}`,
			"PUT",
			{
				start_time: "10:00",
				end_time: "13:00",
				capacity: 15,
			}
		);

		if (updateResult) {
			console.log("✅ Updated time slot successfully");
		}
	}

	// Test 4: Delete a time slot
	if (createdRules[1] && createdRules[1].timeSlotIds && createdRules[1].timeSlotIds[0]) {
		console.log("\n🗑️ Deleting Time Slot...");
		const deleteResult = await makeRequest(
			`${BASE_URL}/admin/time-slots/${createdRules[1].timeSlotIds[0]}`,
			"DELETE"
		);

		if (deleteResult) {
			console.log("✅ Deleted time slot successfully");
		}
	}

	console.log("\n🎉 API Testing Complete!");
	console.log(
		"Created Rules:",
		createdRules.map((r) => ({ name: r.name, id: r.id }))
	);
}

// Run the test if this file is executed directly
if (require.main === module) {
	testProductSchedulerAPI().catch(console.error);
}

module.exports = { testProductSchedulerAPI, sampleData };
