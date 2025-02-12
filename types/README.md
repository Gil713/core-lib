# Types Folder Structure

This folder is structured to support exporting types as an independent library in the future. The types are divided into the following subfolders:

## Folder Structure

### 1. `services/`
Contains types related to APIs, such as:
- Request parameters
- Response structures
- Request bodies

### 2. `use-cases/`
Includes types related to business logic, such as:
- Composables
- Stores
- Utility functions

### 3. `ui/`
Dedicated to types used exclusively in:
- Templates
- UI components

### 4. `vendor/`
Declares types for third-party libraries that:
- Lack TypeScript definitions (`@types`)

## Notes
- Types in the `services` and `use-cases` folders are designed to be shared across multiple brands.
