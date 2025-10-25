# Product Scheduler API Testing Guide

## 🚀 Quick Start

### Prerequisites

-   Medusa server running on `http://localhost:9000`
-   Database migrations applied (already done)
-   Valid product ID in your database

## 📋 Available API Endpoints

### 1. Create Product Rule

**POST** `/admin/product-rule`

```json
{
	"product_id": "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",
	"rule_name": "Morning Schedule"
}
```

### 2. Create Time Slots

**POST** `/admin/time-slots`

```json
{
	"rule_id": "rule_123",
	"product_id": "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",
	"time_slots": [
		{
			"start_time": "09:00",
			"end_time": "12:00",
			"capacity": 10
		}
	]
}
```

### 3. Update Time Slot

**PUT** `/admin/time-slots/{id}`

```json
{
	"start_time": "10:00",
	"end_time": "13:00",
	"capacity": 15
}
```

### 4. Delete Time Slot

**DELETE** `/admin/time-slots/{id}`

## 🧪 Testing Methods

### Method 1: HTTP File (VS Code)

Use the `test-api-requests.http` file in VS Code with REST Client extension:

1. Open `test-api-requests.http`
2. Click "Send Request" above each request
3. Update the IDs in subsequent requests

### Method 2: cURL Script

```bash
# Make executable and run
chmod +x test-curl.sh
./test-curl.sh
```

### Method 3: Node.js Script

```bash
# Run the JavaScript test
node test-api.js
```

### Method 4: Manual cURL Commands

#### Create a Rule:

```bash
curl -X POST http://localhost:9000/admin/product-rule \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",
    "rule_name": "Morning Schedule"
  }'
```

#### Create Time Slots:

```bash
curl -X POST http://localhost:9000/admin/time-slots \
  -H "Content-Type: application/json" \
  -d '{
    "rule_id": "YOUR_RULE_ID_HERE",
    "product_id": "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",
    "time_slots": [
      {
        "start_time": "09:00",
        "end_time": "12:00",
        "capacity": 10
      }
    ]
  }'
```

## 📊 Sample Data for Testing

### Complete User Journey Example:

1. **Create Product** (use existing product or create new one)
2. **Create Rule**: "Morning Schedule"
3. **Add Time Slots**: 9AM-12PM (capacity: 10), 2PM-5PM (capacity: 5)
4. **Update Time Slot**: Change capacity to 15
5. **Create Another Rule**: "Evening Schedule"
6. **Add Evening Time Slots**: 6PM-9PM (capacity: 8), 9PM-12AM (capacity: 6)
7. **Delete a Time Slot**: Remove one of the evening slots

### Sample Time Slot Configurations:

#### Morning Schedule

```json
{
	"time_slots": [
		{ "start_time": "09:00", "end_time": "12:00", "capacity": 10 },
		{ "start_time": "14:00", "end_time": "17:00", "capacity": 5 }
	]
}
```

#### Evening Schedule

```json
{
	"time_slots": [
		{ "start_time": "18:00", "end_time": "21:00", "capacity": 8 },
		{ "start_time": "21:00", "end_time": "00:00", "capacity": 6 }
	]
}
```

#### Weekend Special

```json
{
	"time_slots": [
		{ "start_time": "08:00", "end_time": "11:00", "capacity": 25 },
		{ "start_time": "11:00", "end_time": "14:00", "capacity": 30 },
		{ "start_time": "14:00", "end_time": "17:00", "capacity": 20 },
		{ "start_time": "17:00", "end_time": "20:00", "capacity": 15 }
	]
}
```

## 🔍 Expected Responses

### Successful Rule Creation:

```json
{
	"rule": {
		"id": "rule_01K8BQGEMK5094D1HGMJ2E0BQ7",
		"product_id": "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",
		"title": "Morning Schedule",
		"created_at": "2025-10-25T10:54:21.644Z",
		"updated_at": "2025-10-25T10:54:21.644Z"
	}
}
```

### Successful Time Slots Creation:

```json
{
	"timeSlots": [
		{
			"id": "slot_01K8BQGEMK5094D1HGMJ2E0BQ8",
			"product_id": "prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z",
			"rule": "rule_01K8BQGEMK5094D1HGMJ2E0BQ7",
			"start_time": "09:00",
			"end_time": "12:00",
			"capacity": 10,
			"created_at": "2025-10-25T10:54:21.644Z",
			"updated_at": "2025-10-25T10:54:21.644Z"
		}
	]
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **404 Error**: Make sure Medusa server is running
2. **Database Error**: Run `npx medusa db:migrate` to ensure tables exist
3. **Invalid Product ID**: Use a real product ID from your database
4. **Validation Error**: Check that all required fields are provided

### Check Database Tables:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables
WHERE table_name IN ('product_rule', 'time_slot');

-- Check created data
SELECT * FROM product_rule;
SELECT * FROM time_slot;
```

## 🎯 Testing Checklist

-   [ ] Create product rule
-   [ ] Create time slots for rule
-   [ ] Update time slot (change time/capacity)
-   [ ] Delete time slot
-   [ ] Create multiple rules for same product
-   [ ] Test with different time formats
-   [ ] Test capacity limits
-   [ ] Test error handling (invalid IDs, missing fields)

## 📝 Notes

-   All time slots are linked to a rule via foreign key
-   Rules are linked to products via foreign key
-   Deleting a rule will cascade delete its time slots
-   Time format should be "HH:MM" (24-hour format)
-   Capacity must be a positive number
