# 1.32.3

## Components
`CustomerDetail`
- **FIX** fault tolerant for `customer` being a null value (no longer throws an error when null)

## Page
`admin/opportunity-reports`
- **FIX** import the `FSavedSearchList` by non-specific path

# 1.32.2

## Pages
`opportunity-reports/saved`
- **MOD** Changes url names for deal types & statuses to reflect changes on https://github.com/FreshinUp/fresh-deals-api/pull/48/files
- **FIX** 'View saved reports' not redirecting to saved reports
- **FIX** 'Saved reports' tab not showing the list

# 1.32.1

## Components
`ReportFilter`
- **FIX** ReportFilter all filters now save when selected

# 1.32.0

## Components
- **MOD** DealCard layout
- **MOD** DealCardGrid column sizes for different viewports


# 1.31.3
- **MOD** opportunity reports to open Lead in new tab
- **FIX** DealCard and DealList using lodash/get to avoid JS errors

# 1.31.2
## Components
`DealFilterSorter`
- **FIX** `DealFilterSorter` salesrep and customer filters now save when selected

# 1.31.0
## Pages 
- **ADD** Default view mode in `/admin/sales-opportunities/{uuid}` is now with DealCardGrid component
- **ADD** to default includes of `/admin/sales-opportunities/{uuid}` api request for `api/deals/v1/deals` endpoint the status and the type

## Components
- **FIX** `DealCardGrid` and `DealCard` in order to fire events when a card is clicked

# 1.30.1
- **FIX** DealFilterSorter endpoint path

# 1.30.0

## Components
- **ADD** `CustomerDetails` with configurable `rows` (see component Story)
- **REMOVE** `CustomerCard` in favor of `CustomerDetails`

## Storybook
- **ADD** Enabled import consuming projects (e.g SmartMotors can import and directly display Components and Pages)

# 1.29.0
Removed dead code and code in favor of using Core UI and Activity UI

## Components
- **MOD** Removed several components that should be pulled in from `Core UI` and `Activity UI`
  - `ClearButton` use `FClearButton`
  - `ActivityCard`
  - Mixin `activitydate`

`DealHistory`  
- **MOD** Code Readability of Grouping by Day
- **MOD** While the icons may need to move to a State Machine or be externally controlled, the icons now match the `Types`

`DealInformation`
- **ADD** edit of some fields and styling a bit closer to the "Hi-Fi"  

## State Machine 
- **FIX** Naming of the Store Modules now follows convention (i.e. dropped the `api` prefix)
- **FIX** Removed the placeholder module `dealsHistory` in favor of the real `activities`

## Pages
`admin/sales-opportunities/_id`
- **ADD** Integrated DealInformation and Activity History and Activity Scheduled and general components
 
`/admin/opportunity-reports`
 

# 1.28.0
- **ADD** DealInformation Component

# 1.27.1
- **FIX** Storybook for DealCard component

# 1.27.0
## Pages and State Machine
`/admin/opportunity-reports`
- **MOD** Leveraging the `admin-list` `layout` 
- **ADD** Save Report modal integrated

`admin/sales-opportunities`
- **MOD** Leveraging the `admin-list` `layout`

## Components
- **MOD** opportunity reports page to include SaveReport component
- **MOD** opportunity reports page to show SuccessModal component when SaveReport button is clicked
- **MOD** define SuccessModal component to include redirecting path props and set the default value as `/admin/financials/saved`

# 1.26.0
- **ADD** Search for saved reports at Opp Reporting Page

# 1.25.0
- **ADD** History Component (timeline) in the Sales opportunity detail page

# 1.24.0
- **ADD** Added Sales Opportunity detail page with back button and title

# 1.23.0
- **ADD** DealHistory component

# 1.22.0
- **ADD** StatusPerSource component

# 1.21.0
- **ADD** InternetSalesFunnel component

# 1.20.0
- **ADD** List of saved reports in saved reports tab of the sales opportunity reports page 

# 1.19.1

### Maintenance
- **MOD** Code style updates
- **ADD** testing the `Provider` has the respective Store Modules

### CLI
- **MOD** `yarn test` now does both lint and test checks


# 1.19.0
- **MOD** Opportunity Reporting Page to have the expected header
- **ADD** Saved Opportunity Reporting Page and tests

# 1.18.0
- **MOD** DealList Component to receive visibility options as parameter and display view button only
- **MOD** Opportunity Reporting Page to include DealList Component

# 1.17.0
- **ADD** Overview card on opportunity reports page

# 1.16.0
- **MODIFY** Deal Card status name and type name

# 1.15.2
- **FIX** Storybook Titles and organized Categories

# 1.15.1
- **FIX** Fixed Component Getters

# 1.15.0
- **ADD** TextCustomer Component

# 1.14.0
- **ADD** Activity Card in Sales Opportunity Detail Page

# 1.13.0
- **ADD** Sales Opportunity List View/ Card View Switch
- **ADD** Sales Opportunity Grid Sort

# 1.12.0
- **ADD** Sales Opportunity Filter added

# 1.11.0
- **ADD** Sales Opportunity List Component added in page

# 1.10.0
- **ADD** Adding Provider and namespace

# 1.9.0
- **ADD** Single Sales opportunity Card Component
- **ADD** Sales opportunities Card View Component

# 1.8.0
- **ADD** Sales Opportunity Page List/Card View Switch added in Header

# 1.6.0
- **ADD** Deal Filter Component

# 1.5.0
- **ADD** Sales opportunities list view Component

# 1.4.0
- **ADD** Report Filter Component

# 1.3
- **ADD** Email Customer Component
- **ADD** View Customer Email Component

# 1.2.1
- **MOD** Opportunity Reporting Page to include Data Visibility Component
- **UPDATE** core/ui

# 1.2.0
- **MOD** Opportunity Reporting Page moved to `src` directory
- **CI** Able to run on CircleCI thanks to changes in the Circle CI config within this project
- **MOD** Linting and tests can run now

# 1.1.0

### Added

- Add Opp Reporting Page

# 1.0.0

### Added

- Everything
