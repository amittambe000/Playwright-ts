#!/bin/bash

# Script to run Playwright tests in Kubernetes

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${YELLOW}🚀 Running Playwright Tests in Kubernetes${NC}"
echo ""

# Delete existing job if it exists
echo -e "${YELLOW}🗑️  Cleaning up previous job...${NC}"
kubectl delete job playwright-tests 2>/dev/null || true

# Apply the job
echo -e "${YELLOW}📦 Deploying test job...${NC}"
kubectl apply -f "$SCRIPT_DIR/playwright-job.yaml"

# Wait for pod to start
echo -e "${YELLOW}⏳ Waiting for pod to start...${NC}"
kubectl wait --for=condition=Ready pod -l app=playwright --timeout=120s 2>/dev/null || true

# Get pod name
POD_NAME=$(kubectl get pods -l app=playwright -o jsonpath='{.items[0].metadata.name}')
echo -e "${GREEN}✅ Pod started: $POD_NAME${NC}"
echo ""

# Stream logs
echo -e "${YELLOW}📜 Streaming test logs...${NC}"
echo "─────────────────────────────────────────"
kubectl logs -f $POD_NAME
echo "─────────────────────────────────────────"
echo ""

# Check job status
JOB_STATUS=$(kubectl get job playwright-tests -o jsonpath='{.status.succeeded}')
if [ "$JOB_STATUS" == "1" ]; then
    echo -e "${GREEN}✅ Tests completed successfully!${NC}"
else
    echo -e "${RED}❌ Tests failed or had errors${NC}"
fi

echo ""
echo -e "${YELLOW}📋 To copy results to local machine, run:${NC}"
echo "   $SCRIPT_DIR/copy-results.sh"
