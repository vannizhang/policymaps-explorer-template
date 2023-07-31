import { IGroupCategory, IItem } from '@esri/arcgis-rest-portal';

type ItemsByCategory = {
    [key: string]: IItem[];
};

export const groupItemsByCategory = (
    items: IItem[],
    mainCategories: IGroupCategory[]
): ItemsByCategory => {
    const itemsByCategory: ItemsByCategory = {};

    for (const { title } of mainCategories) {
        itemsByCategory[title] = [];
    }

    for (const item of items) {
        const { groupCategories } = item;

        // if (item.title === 'National Bridge Inventory') {
        //     console.log(console.log(item));
        // }

        for (const categoryStr of groupCategories) {
            // the original groupCategories is a string looks like: "/Categories/Structures"
            const components = categoryStr.split('/');
            const mainCategory = components[2];
            // const subcategory = components[3];

            if (itemsByCategory[mainCategory]) {
                itemsByCategory[mainCategory].push(item);
            }
        }
    }

    return itemsByCategory;
};
