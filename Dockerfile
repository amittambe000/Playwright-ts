FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Disable output buffering for real-time logs
ENV PYTHONUNBUFFERED=1
ENV FORCE_COLOR=1

WORKDIR /app

# Install xvfb for headed browser in Docker
RUN apt-get update && apt-get install -y xvfb && rm -rf /var/lib/apt/lists/*

# Copy package files first (better layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source files (node_modules excluded via .dockerignore)
COPY tests/ ./tests/
COPY pages/ ./pages/
COPY fixtures/ ./fixtures/
COPY utils/ ./utils/
COPY playwright.config.ts ./

# Create directory for auth state
RUN mkdir -p playwright/.auth

# Run with xvfb for headed mode (shell form for proper output)
CMD xvfb-run --auto-servernum -- npx playwright test
