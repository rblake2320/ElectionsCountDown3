# Election Tracker Platform

## Overview

This is a comprehensive election tracking and candidate management platform designed to provide real-time election data, candidate management tools, voter analytics, and secure campaign portals. The platform integrates multiple data sources to deliver accurate, up-to-date election information with enterprise-grade security and compliance features. Its business vision is to be the leading platform for election transparency and candidate engagement, offering significant market potential in political technology.

**Current Status (January 2025):** Platform fully operational with 613 tracked elections and 173+ verified candidates. All critical tests passing (100% success rate). Key achievements:
- ✅ API error handling: Proper 404/400 status codes for invalid requests
- ✅ Congress data: 540 members (CA: 54, TX: 40) with voting member filtering
- ✅ Election API: Returns candidateCount field for all elections
- ✅ Candidate linkage: Fuzzy matching with ±1 day tolerance prevents stuck UI states
- ✅ Health endpoint: Comprehensive counts including congress_total
- ✅ Security: Helmet, CORS, compression middleware properly configured
- ✅ All target elections (Los Banos, AD-63, Louisiana) have candidates displayed
- ✅ Data Steward Bot: MCP framework with 31 detected issues and auto-fix capabilities

## User Preferences

Preferred communication style: Simple, everyday language.
Theme preference: Adaptive text visibility for both light and dark modes.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM
- **Authentication**: JWT-based authentication with bcrypt
- **API Structure**: RESTful APIs
- **Real-time Features**: Event-driven architecture
- **Data Integrity**: Temporal versioning system with append-only facts and truth tables
- **Bot Framework**: MCP (Monitoring Control Packs) policy-driven system with database-stored detectors and auto-fix verification

### Database Architecture
- **Primary Database**: PostgreSQL (Neon serverless)
- **Schema Management**: Drizzle ORM with migration system
- **Connection Pooling**: Neon serverless pool
- **Backup Strategy**: Automated PostgreSQL dumps

### Key Components
- **Election Management System**: Comprehensive election database, real-time result tracking, candidate management, multi-source data aggregation.
- **Candidate Portal System**: Secure authentication, subscription-based access control, campaign content management, voter interaction analytics, position statement management.
- **Security & Compliance Framework**: Multi-layer authentication/authorization, rate limiting, content validation, privacy regulation compliance (GDPR, CCPA), audit logging, bot prevention.
- **Data Integration Services**: Integration with government APIs, congressional data, third-party services for fact-checking, geographic services, real-time monitoring via web scraping and RSS feeds.
- **Analytics & Monitoring**: Production-grade analytics pipeline with event tracking (page views, candidate interactions, comparisons), health monitoring endpoints, performance metrics using partitioned PostgreSQL tables and materialized views, anonymous session tracking with UTM parameters.

### Data Flow
The system involves data ingestion from external APIs, AI-powered validation, storage in PostgreSQL, in-memory caching for performance, API delivery to frontends, real-time updates via an event-driven system, and analytics collection.

### Deployment Strategy
- **Development Environment**: Local Vite dev server, Neon development database.
- **Production Deployment**: Replit autoscale deployment, Neon production database, built-in monitoring.
- **Security Considerations**: Environment variables for secrets, CORS, rate limiting, CSP headers, SQL injection prevention.
- **Performance Optimization**: Database query optimization, multi-layer caching, connection pooling, automated data archival, CDN-ready static assets.

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit**: Development and deployment platform
- **WebSocket Support**: For real-time features

### API Integrations
- **ProPublica Congress API**: Congressional data
- **Google Civic Information API**: Election and candidate information
- **Data.gov APIs**: Government election data
- **Census Bureau API**: Demographic and district data
- **MapQuest API**: Geocoding and location services
- **Perplexity AI API**: Fact-checking and content validation
- **OpenStates API**: State legislature data
- **OpenFEC API**: Campaign finance data

### Development Tools
- **Drizzle Kit**: Database schema management
- **Vite**: Frontend build tool
- **ESBuild**: Backend JavaScript bundling
- **TypeScript**: Type safety
- **Puppeteer, Playwright, Selenium**: For browser automation and advanced data collection
- **Vitest**: Production-ready testing framework with comprehensive coverage
- **Testing Library**: React component testing with user interaction simulation
- **MSW**: API mocking for deterministic test environments