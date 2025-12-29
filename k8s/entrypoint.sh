#!/bin/bash

# Run Playwright tests
echo "🚀 Starting Playwright tests..."
xvfb-run --auto-servernum -- npx playwright test
TEST_EXIT_CODE=$?

echo ""
echo "✅ Tests completed with exit code: $TEST_EXIT_CODE"
echo ""

# List generated files
echo "📁 Generated files:"
ls -la /app/playwright-report/ 2>/dev/null || echo "  No playwright-report"
ls -la /app/test-results/ 2>/dev/null || echo "  No test-results"
ls -la /app/allure-results/ 2>/dev/null || echo "  No allure-results"

echo ""
echo "⏳ Keeping container alive for 5 minutes to allow copying results..."
echo "   Run: npm run k8s:copy-results"
echo ""

# Keep container alive for 5 minutes
sleep 300

echo "🔚 Container shutting down..."
exit $TEST_EXIT_CODE
