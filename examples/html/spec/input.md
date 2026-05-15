# API Rate Limiting System - Technical Specification

Author: Team Platform
Date: 2026-05-10
Status: Draft

## Overview

This document specifies the rate limiting system for our public API. The system needs to handle 10,000+ requests per second while maintaining fairness across tenants.

## Background

Our current API has no rate limiting. This has led to several incidents where a single tenant consumed all available resources, causing degradation for other users. We need a fair, transparent, and configurable rate limiting system.

Key requirements from stakeholder meetings:
- Must support per-tenant limits
- Must support per-endpoint limits  
- Must provide clear feedback when limits are hit
- Must not add more than 5ms latency per request
- Must be observable and auditable

## Architecture

The rate limiter sits between the API gateway and the application layer. It uses a sliding window counter algorithm stored in Redis for distributed state management.

### Components

1. **Rate Limiter Middleware**: Express middleware that intercepts all API requests
2. **Redis Cluster**: Stores sliding window counters with TTL-based expiry
3. **Config Service**: Manages per-tenant and per-endpoint rate limit configurations
4. **Metrics Collector**: Emits rate limiting metrics to our observability stack

### Data Flow

Request → API Gateway → Rate Limiter Middleware → Redis (check/increment) → Response (200 or 429)

### Redis Key Schema

```
ratelimit:{tenant_id}:{endpoint}:{window_start}
```

Example: `ratelimit:acme-corp:/api/users:1715337600`

### Sliding Window Algorithm

We use a sliding window counter approach:

1. Calculate the current window timestamp (floor to window size)
2. Calculate the weight of the previous window based on how far we are into the current window
3. Weighted count = current_window_count + (previous_window_count × overlap_percentage)
4. If weighted count >= limit, reject with 429

This provides smoother rate limiting than fixed windows while being more memory-efficient than true sliding window logs.

## Rate Limit Tiers

| Tier | Requests/min | Requests/hour | Burst | Price |
|------|-------------|---------------|-------|-------|
| Free | 60 | 1,000 | 10 | $0 |
| Pro | 600 | 50,000 | 50 | $49/mo |
| Enterprise | 6,000 | 500,000 | 200 | Custom |

## Response Format

When rate limited, return HTTP 429 with:

```json
{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Try again in 23 seconds.",
  "retry_after": 23,
  "limit": 600,
  "remaining": 0,
  "reset_at": "2026-05-10T14:30:00Z"
}
```

Also include headers:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when the window resets
- `Retry-After`: Seconds until the client should retry

## Configuration

Rate limits are configured via YAML:

```yaml
default_limits:
  requests_per_minute: 60
  requests_per_hour: 1000
  burst_size: 10

tenant_overrides:
  acme-corp:
    requests_per_minute: 600
    requests_per_hour: 50000

endpoint_overrides:
  /api/search:
    requests_per_minute: 30
    burst_size: 5
  /api/bulk:
    requests_per_minute: 10
    burst_size: 2
```

## Error Handling

- Redis down: Fail open (allow requests, log alert)
- Config service down: Use cached config, expire after 5 minutes
- Counter overflow: Cap at 2x limit, log anomaly

## Monitoring

Key metrics:
- `rate_limit_total`: Total rate limit checks
- `rate_limit_rejected`: Total 429 responses  
- `rate_limit_latency_ms`: P50/P95/P99 latency of rate limit check
- `rate_limit_redis_errors`: Redis connection failures

Dashboard: rate-limits.internal/observability

## Migration Plan

Phase 1 (Week 1-2): Deploy in shadow mode — log what would be rejected but don't actually reject
Phase 2 (Week 3-4): Enable for Free tier only, monitor
Phase 3 (Week 5-6): Enable for all tiers, with manual override capability
Phase 4 (Week 7+): Remove manual override, full enforcement

## Open Questions

1. Should we support sliding window per-second for burst protection?
2. How do we handle rate limits for webhook deliveries (different traffic pattern)?
3. Should rate limit headers be included on all responses or only on 429s?
