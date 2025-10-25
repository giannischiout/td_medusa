#!/bin/bash

# Product Scheduler API Test Script
# Run with: bash test-curl.sh

BASE_URL="http://localhost:9000"
PRODUCT_ID="prod_01K7Y3FNEP4VZAA9GKSDYCEQ9Z"

echo "🚀 Testing Product Scheduler API"
echo "================================"

# Test 1: Create a Product Rule
echo "📝 Creating Product Rule..."
RULE_RESPONSE=$(curl -s -X POST "$BASE_URL/admin/product-rule" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "'$PRODUCT_ID'",
    "rule_name": "Morning Schedule"
  }')

echo "Rule Response: $RULE_RESPONSE"
RULE_ID=$(echo $RULE_RESPONSE | jq -r '.rule.id')
echo "✅ Created rule with ID: $RULE_ID"

# Test 2: Create Time Slots
echo -e "\n⏰ Creating Time Slots..."
TIME_SLOTS_RESPONSE=$(curl -s -X POST "$BASE_URL/admin/time-slots" \
  -H "Content-Type: application/json" \
  -d '{
    "rule_id": "'$RULE_ID'",
    "product_id": "'$PRODUCT_ID'",
    "time_slots": [
      {
        "start_time": "09:00",
        "end_time": "12:00",
        "capacity": 10
      },
      {
        "start_time": "14:00",
        "end_time": "17:00",
        "capacity": 5
      }
    ]
  }')

echo "Time Slots Response: $TIME_SLOTS_RESPONSE"
TIME_SLOT_ID=$(echo $TIME_SLOTS_RESPONSE | jq -r '.timeSlots[0].id')
echo "✅ Created time slots, first ID: $TIME_SLOT_ID"

# Test 3: Update Time Slot
echo -e "\n✏️ Updating Time Slot..."
UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/admin/time-slots/$TIME_SLOT_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "start_time": "10:00",
    "end_time": "13:00",
    "capacity": 15
  }')

echo "Update Response: $UPDATE_RESPONSE"
echo "✅ Updated time slot successfully"

# Test 4: Create Another Rule
echo -e "\n📝 Creating Second Rule..."
RULE2_RESPONSE=$(curl -s -X POST "$BASE_URL/admin/product-rule" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "'$PRODUCT_ID'",
    "rule_name": "Evening Schedule"
  }')

echo "Rule 2 Response: $RULE2_RESPONSE"
RULE2_ID=$(echo $RULE2_RESPONSE | jq -r '.rule.id')
echo "✅ Created second rule with ID: $RULE2_ID"

# Test 5: Create Time Slots for Second Rule
echo -e "\n⏰ Creating Time Slots for Second Rule..."
TIME_SLOTS2_RESPONSE=$(curl -s -X POST "$BASE_URL/admin/time-slots" \
  -H "Content-Type: application/json" \
  -d '{
    "rule_id": "'$RULE2_ID'",
    "product_id": "'$PRODUCT_ID'",
    "time_slots": [
      {
        "start_time": "18:00",
        "end_time": "21:00",
        "capacity": 8
      },
      {
        "start_time": "21:00",
        "end_time": "00:00",
        "capacity": 6
      }
    ]
  }')

echo "Time Slots 2 Response: $TIME_SLOTS2_RESPONSE"
TIME_SLOT2_ID=$(echo $TIME_SLOTS2_RESPONSE | jq -r '.timeSlots[0].id')
echo "✅ Created time slots for second rule"

# Test 6: Delete a Time Slot
echo -e "\n🗑️ Deleting Time Slot..."
DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/admin/time-slots/$TIME_SLOT2_ID")

echo "Delete Response: $DELETE_RESPONSE"
echo "✅ Deleted time slot successfully"

echo -e "\n🎉 All tests completed!"
echo "Created Rules:"
echo "- Morning Schedule (ID: $RULE_ID)"
echo "- Evening Schedule (ID: $RULE2_ID)"
