#!/bin/bash

# Script to copy test results from Kubernetes pod to local machine

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Finding Playwright test pod...${NC}"

# Get the pod name
POD_NAME=$(kubectl get pods -l app=playwright -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)

if [ -z "$POD_NAME" ]; then
    echo -e "${RED}❌ No Playwright pod found. Make sure the job has run.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found pod: $POD_NAME${NC}"

# Check pod status
POD_STATUS=$(kubectl get pod $POD_NAME -o jsonpath='{.status.phase}')
echo -e "${YELLOW}📊 Pod status: $POD_STATUS${NC}"

# Get the script's directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${YELLOW}📁 Copying results to: $PROJECT_ROOT${NC}"

# Copy playwright-report
echo -e "${YELLOW}📋 Copying playwright-report...${NC}"
kubectl cp $POD_NAME:/app/playwright-report "$PROJECT_ROOT/playwright-report" 2>/dev/null || echo "  ⚠️  playwright-report not found or empty"

# Copy test-results
echo -e "${YELLOW}📋 Copying test-results...${NC}"
kubectl cp $POD_NAME:/app/test-results "$PROJECT_ROOT/test-results" 2>/dev/null || echo "  ⚠️  test-results not found or empty"

# Copy allure-results
echo -e "${YELLOW}📋 Copying allure-results...${NC}"
kubectl cp $POD_NAME:/app/allure-results "$PROJECT_ROOT/allure-results" 2>/dev/null || echo "  ⚠️  allure-results not found or empty"

echo ""
echo -e "${GREEN}✅ Done! Results copied to:${NC}"
echo "   - $PROJECT_ROOT/playwright-report"
echo "   - $PROJECT_ROOT/test-results"
echo "   - $PROJECT_ROOT/allure-results"
echo ""
echo -e "${YELLOW}💡 To view the HTML report, run:${NC}"
echo "   npm run report:html"
