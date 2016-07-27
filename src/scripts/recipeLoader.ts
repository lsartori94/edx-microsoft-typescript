/// <reference path="typings/jquery.d.ts" />

class RecipeLoader {

    constructor(public url: string) {}

    //TODO (GENERICS EXERCISE)
    //1. Change the load() function's return type to use the JQueryPromise<IRecipeData> generic
    //   This will provide the caller with much better code help as they work with the return value.
    //2. If you're in VS Code, right-click on JQueryPromise and select "Peek Definition" from the menu
    //3. Take a moment to explore how the JQueryPromise interface uses generics
    load() : JQueryPromise<IRecipeData> {
        return $.getJSON(this.url).then((data: any) => {
            var recipeData = this.mapData(data);
            return recipeData;
        });
    }

    mapData(data: any) : IRecipeData {
        if (data) {
            let categories: any[] = data.recipeCategories;

            //TODO (INTERFACES EXERCISE)
            //Pass IRecipeCategory as the type to the generic below
            var recipeCategories = new RecipeCategories<IRecipeCategory>();

            //TODO (INTERFACES EXERCISE)
            //Pass IRecipeCategorySummary as the type to the generic below
            var recipeCategoriesSummary = new RecipeCategories<IRecipeCategorySummary>();

            categories.forEach((category: any) => {

                //TODO (CONSTRUCTORS EXERCISE)
                //Change the RecipeCategory code below so that the property values are
                //passed into the constructor rather than set individually.

                /* category (the argument passed to RecipeCategories constructor) didn't
                   had the properties required by the class so they had to be created */
                category.name = category.title;
                category.foodGroups = this.getFoodGroups(category);
                category.description = category.details;
                category.examples = this.getExamples(category);
                let recipeCategory = new RecipeCategory(category);

                recipeCategories.items.push(recipeCategory);

                let recipeCategorySummary = new RecipeCategorySummary({
                    text: category.title,
                    title: category.details
                });
                recipeCategoriesSummary.items.push(recipeCategorySummary);
            });

            return {
               recipeCategories: recipeCategories,
               recipeCategoriesSummary: recipeCategoriesSummary
            };
        }
        else {
            return null;
        }
    }

    getFoodGroups(category: any) : FoodGroup[] {
        //Map foodgroups data to TS object
        return category.foodGroups.map((foodGroup: any) => {

            //TODO (CONSTRUCTORS EXERCISE)
            //Change the FoodGroup code below so that the property value is
            //passed into the constructor rather than set individually.
            var group = new FoodGroup(foodGroup.title);
            // group.name = foodGroup.title;
            return group;
        });
    }

    getExamples(category: any) : IExample[] {
        return category.examples.map((example: any) => {
            return new Example({
                name: example.name,
                ingredients: this.getIngredients(example),
                prepTime: example.prepTime
            });
        });
    }

    getIngredients(example: any): Ingredient[] {
        return example.ingredients.map((value: any) => {
            return new Ingredient(value);
        });
    }
}
