// Example of how the categories are now fetched and used in the Experience form

/\*
The Experience form now:

1. Uses useGetCategories() hook to fetch categories from the API
2. Transforms the categories data into the format expected by the select field
3. Shows loading state while categories are being fetched
4. Handles errors gracefully
5. Disables the select field when loading or on error

Key changes made:

1. Added import: import { useGetCategories } from "actions"
2. Added hook usage: const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetCategories()
3. Transformed data: const categoryOptions = Array.isArray(categories) ? categories.map(...) : []
4. Updated select field with dynamic options, loading state, and error handling
5. Added QueryProvider to root layout for React Query to work

The form will now automatically fetch categories when it loads and populate the dropdown with real data from your API.
\*/
