#!/bin/bash
# Quick diagnostic script to test Render backend connectivity

set -e

echo "=== Bolzaa Backend Connectivity Test ==="
echo ""

BACKEND_URL="${1:-https://bolzaa-backend.onrender.com}"

echo "Testing backend at: $BACKEND_URL"
echo ""

# Test 1: Health endpoint
echo "1️⃣  Testing /api/health endpoint..."
if curl -s -X GET "$BACKEND_URL/api/health" -m 10 > /tmp/health.json; then
  echo "✅ Health check passed:"
  cat /tmp/health.json
  echo ""
else
  echo "❌ Health check failed - backend may not be running"
  echo ""
fi

# Test 2: Debug endpoint
echo "2️⃣  Testing /api/debug endpoint..."
if curl -s -X GET "$BACKEND_URL/api/debug" -m 10 > /tmp/debug.json; then
  echo "✅ Debug endpoint working:"
  cat /tmp/debug.json
  echo ""
else
  echo "❌ Debug endpoint failed"
  echo ""
fi

# Test 3: Send email endpoint (POST test)
echo "3️⃣  Testing /api/send-email endpoint (POST)..."
if curl -s -X POST "$BACKEND_URL/api/send-email" \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@test.com","instagram":"@test","channelLink":"https://youtube.com/test","niche":"tech","message":"test"}' \
  -m 10 > /tmp/sendmail.json; then
  echo "✅ Send email endpoint responding:"
  cat /tmp/sendmail.json
  echo ""
else
  echo "❌ Send email endpoint failed"
  echo ""
fi

echo "=== Summary ==="
echo "If all tests passed ✅, your backend is healthy"
echo "If any test failed ❌, check:"
echo "  - Render service is running (not sleeping)"
echo "  - Environment variables are set correctly"
echo "  - ADMIN_EMAIL and EMAIL_PASS are configured"
