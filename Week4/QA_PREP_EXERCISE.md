# Prep exercise week 4

As a preparation step for the upcoming Q&A, you need to work on the following exercise, which is based on the prep
exercise of the previous week.

## Exercise

Last week you updated your database to be normalized. Now that you have some more NoSQL knowledge, convert your database
to a document-based database. Think about the following:

- What are the collections?
1. `recipes` – the main collection that includes all recipe info.
2. `categories` – a separate collection for reusable categories like “Vegan”, “Dessert”, etc.

- What information will you embed in a document and which will you store normalised?
In the `recipes` collection, I would embed:
- the list of ingredients (with quantity),
- the list of steps (in order).

I would normalize the `categories` and store only their IDs inside the recipe, since categories can be reused by many recipes.

## Discussion (Try to write answers to these questions in text, provide queries and commands when necessary)

- What made you decide when to embed information? What assumptions did you make?
I chose to embed data that only makes sense inside one recipe – like ingredients and steps. These things don’t need to be shared across recipes, so embedding them makes it easier to read everything at once.
I normalized categories because they can be reused in many recipes. Also, if we ever want to update a category name (like renaming “Healthy” to “Healthy Food”), we only need to update it in one place.

- If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you
  choose and why?
  I would choose MongoDB because:
- It’s simpler to work with when one recipe holds everything.
- We don’t need complex joins to get a full recipe.
- All recipe details can be stored in one single document – easy and fast to read.

But if we had to do more complex things, like linking recipes to user accounts, ratings, or comments, MySQL might be better because of its strong structure and relational features.