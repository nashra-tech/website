export const  CATEGORY_COLORS = [
    { name: 'Light Gray', value: 'light-gray', class: 'bg-gray-100 text-gray-800' },
    { name: 'Gray', value: 'gray', class: 'bg-gray-200 text-gray-800' },
    { name: 'Cyan', value: 'cyan', class: 'bg-cyan-100 text-cyan-800' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-100 text-orange-800' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-100 text-yellow-800' },
    { name: 'Green', value: 'green', class: 'bg-green-100 text-green-800' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-100 text-blue-800' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-100 text-purple-800' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-100 text-pink-800' },
    { name: 'Red', value: 'red', class: 'bg-red-100 text-red-800' },
];

export function getCategoryColorClass(colorValue: string): string {
    return CATEGORY_COLORS.find(category=>category.value === colorValue)?.class||'bg-gray-200 text-gray-800';
}

