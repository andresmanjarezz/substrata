# TypeScript Koa Server for Microsoft Graph API

This project is a TypeScript-based Koa server application designed to authenticate users with the Microsoft Graph API and retrieve emails from their Microsoft Outlook mailbox. It uses OAuth2 for authentication and provides endpoints to sign in and fetch the last five emails from a user's Outlook inbox.

## Features
- Authentication with Microsoft Graph API.
- Fetching the last five emails from the authenticated user's Outlook inbox.
- Environment configuration for secure storage of credentials.
- Clean and readable TypeScript codebase.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install them:
- Node.js with a version >= 18.0 installed
- NPM (Node Package Manager) or Yarn installed
- A Microsoft Azure account with access to Microsoft Graph API

### Installation

Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Configuration

Create a .env file in the root of the project with the following content:

   ```plaintext
   MS_CLIENT_ID=your-client-id
   MS_CLIENT_SECRET=your-client-secret
   MS_TENANT_ID=your-tenant-id
   MS_SCOPE=Mail.Read
   ```

   Replace `your-client-id`, `your-client-secret`, `your-tenant-id`, and `your-scope` with your actual Azure AD configuration values.

## API Endpoints

- GET `/signin` - Generates a URL for signing into Microsoft Graph API.
- GET `/auth-response` - Endpoint for receiving authentication tokens.
- GET `/emails` - Fetches the last five emails from the authenticated user's Outlook inbox.

## Contact

For any questions, please contact [shtundamykyta@gmail.com](mailto:shtundamykyta@gmail.com).
