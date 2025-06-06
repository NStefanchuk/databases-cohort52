# Prep exercise week 4

As a preparation step for the upcoming Q&A, you need to work on the following exercise, which is based on the prep
exercise of the previous week.

## Exercise

Last week you updated your database to be normalized. Now that you have some more NoSQL knowledge, convert your database
to a document-based database. Think about the following:

- What are the collections?

  ```
  recipes
  categories
  ```
- What information will you embed in a document and which will you store normalised?

  ```
  Embed in recipes:
  - ingredients (with quantity)
  - steps

  Normalize:
  - categories (store as IDs)
  ```

## Discussion (Try to write answers to these questions in text, provide queries and commands when necessary)

- What made you decide when to embed information? What assumptions did you make?

  ```
  I embedded things that are only meaningful inside one recipe (like steps and ingredients). 
  They are specific to the recipe and don’t need to be reused.

  I normalized categories because they can be reused in many recipes and may need updating in one place.
  ```

- If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you
  choose and why?

    ```
  I’d choose MongoDB because it’s easier to store one recipe as a single document.
  We avoid joins and can read all recipe data at once.

  But if the app grows and we need users, ratings, or comments, MySQL might be better for relationships.
  ```