import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../Models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  Recipes_Dummy_List: Recipe[] = [
    {
      recipe_id: '1',
      user_id: '1',
      title: 'Spaghetti Bolognese',
      img_id: 'spaghetti_bolognese_image.jpg',
      subreddit_id: 'cooking',
      ingredients: 'Spaghetti\nGround beef\nTomato sauce',
      description: 'Classic spaghetti bolognese recipe with a rich tomato sauce.',
      cooking_time: '30 minutes',
      servings: 'Around 2 dozen cookies, depending on the size you make them',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Medium',
      instructions: `Heat olive oil in a large skillet over medium heat.\n
      Add chopped onions, carrots, and celery. Cook until softened, about 5 minutes.\n
      Add minced garlic and cook for an additional 1 minute.\n
      Increase heat to medium-high and add ground beef. Cook until browned, breaking it apart with a spoon.\n
      Stir in tomato paste and cook for 2 minutes.\n
      Pour in crushed tomatoes, beef broth, and red wine (if using). Season with salt, pepper, and Italian seasoning.\n
      Bring to a simmer, then reduce heat to low and let it simmer for at least 30 minutes, stirring occasionally.\n
      Meanwhile, cook spaghetti according to package instructions until al dente.\n
      Drain spaghetti and serve topped with the Bolognese sauce.\n
      Garnish with grated Parmesan cheese and fresh basil leaves, if desired.\n
      `
    },
    {
      recipe_id: '2',
      user_id: '2',
      title: 'Chicken Stir-Fry',
      img_id: 'chicken_stir_fry_image.jpg',
      subreddit_id: 'recipes',
      ingredients: 'Chicken breast\nVegetables\nSoy sauce',
      description: 'Quick and easy chicken stir-fry with fresh vegetables.',
      cooking_time: '20',
      servings: '3',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Easy',
      instructions: `Heat olive oil in a large pot over medium heat.\n
      Add chopped onions, bell peppers, and carrots. Cook until softened, about 5-7 minutes.\n
      Stir in minced garlic, chili powder, cumin, paprika, and oregano. Cook for 1 minute until fragrant.\n
      Add diced tomatoes, tomato paste, vegetable broth, and a can of rinsed and drained beans (such as kidney beans, black beans, and chickpeas).\n
      Bring the mixture to a simmer and let it cook for at least 20-30 minutes, stirring occasionally.\n
      If desired, mash some of the beans against the side of the pot to thicken the chili.\n
      `
    },
    {
      recipe_id: '3',
      user_id: '3',
      title: 'Vegetarian Chili',
      img_id: 'vegetarian_chili_image.jpg',
      subreddit_id: 'vegetarian',
      ingredients: 'Beans\nTomatoes\nOnions\nPeppers',
      description: 'Hearty and flavorful vegetarian chili packed with beans and vegetables.',
      cooking_time: '45',
      servings: '6',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Medium',
      instructions: `Heat olive oil in a large pot over medium heat.\n
      Add chopped onions, bell peppers, and carrots. Cook until softened, about 5-7 minutes.\n
      Stir in minced garlic, chili powder, cumin, paprika, and oregano. Cook for 1 minute until fragrant.\n
      Add diced tomatoes, tomato paste, vegetable broth, and a can of rinsed and drained beans (such as kidney beans, black beans, and chickpeas).\n
      Bring the mixture to a simmer and let it cook for at least 20-30 minutes, stirring occasionally.\n
      If desired, mash some of the beans against the side of the pot to thicken the chili.\n
      `
    },
    {
      recipe_id: '4',
      user_id: '2',
      title: 'Grilled Salmon',
      img_id: 'grilled_salmon_image.jpg',
      subreddit_id: 'seafood',
      ingredients: 'Salmon fillets\nLemon\nFresh dill',
      description: 'Delicious grilled salmon served with a tangy lemon dill sauce.',
      cooking_time: '20',
      servings: '4',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Medium',
      instructions: `Preheat grill to medium-high heat.\n
      Season salmon fillets with salt, pepper, and olive oil.\n
      Place salmon skin-side down on the grill and cook for 4-5 minutes.\n
      Carefully flip the salmon using a spatula and grill for an additional 4-5 minutes, or until cooked through and flaky.\n
      While the salmon is grilling, prepare the lemon dill sauce.\n
      In a small bowl, mix together Greek yogurt, lemon juice, chopped fresh dill, minced garlic, salt, and pepper.\n
      Adjust seasoning to taste.\n
      Once the salmon is cooked, remove it from the grill and transfer to serving plates.\n
      Drizzle the lemon dill sauce over the grilled salmon.\n
      Garnish with additional fresh dill and lemon slices if desired.\n
      Serve immediately with your favorite side dishes.\n
      Enjoy your delicious grilled salmon with lemon dill sauce!\n
      `
    },
    {
      recipe_id: '5',
      user_id: '1',
      title: 'Mushroom Risotto',
      img_id: 'mushroom_risotto_image.jpg',
      subreddit_id: 'italian',
      ingredients: 'Arborio rice\nMushrooms\nVegetable broth',
      description: 'Creamy and indulgent mushroom risotto cooked to perfection.',
      cooking_time: '40',
      servings: '4',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Hard',
      instructions: `Heat vegetable broth in a saucepan and keep it warm over low heat.\n
      In a separate large saucepan, melt butter over medium heat.\n
      Add finely chopped onions and minced garlic. Cook until softened, about 5 minutes.\n
      Add Arborio rice to the saucepan and stir to coat with the butter, onions, and garlic. Cook for 2 minutes until the rice is lightly toasted.\n
      Deglaze the pan with white wine, stirring constantly until the wine is absorbed.\n
      Begin adding warm vegetable broth to the rice mixture, one ladleful at a time, stirring constantly and allowing each addition to be absorbed before adding more. Continue until the rice is creamy and cooked al dente, about 18-20 minutes.\n
      In a separate skillet, heat olive oil over medium heat.\n
      Add sliced mushrooms and cook until they are golden brown and tender, about 5-7 minutes.\n
      Stir cooked mushrooms into the risotto, along with grated Parmesan cheese and chopped fresh parsley.\n
      Season with salt and pepper to taste.\n
      Remove from heat and let the risotto rest for a few minutes.\n
      Serve hot, garnished with additional grated Parmesan cheese and parsley if desired.\n
      Enjoy your delicious mushroom risotto!\n
      `
    },
    {
      recipe_id: '6',
      user_id: '3',
      title: 'Greek Salad',
      img_id: 'greek_salad_image.jpg',
      subreddit_id: 'salads',
      ingredients: 'Cucumbers\nTomatoes\nFeta cheese\nKalamata olives',
      description: 'Refreshing Greek salad with crisp vegetables and tangy feta cheese.',
      cooking_time: '15',
      servings: '2',
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Easy',
      instructions: `Start by washing and drying the vegetables.\n
      Chop fresh tomatoes into bite-sized chunks.\n
      Slice cucumbers into rounds or half-moons.\n
      Thinly slice red onions.\n
      Cut bell peppers into strips.\n
      Place all the chopped vegetables in a large salad bowl.\n
      Add pitted Kalamata olives to the bowl.\n
      Crumble feta cheese over the vegetables.\n
      Sprinkle dried oregano on top.\n
      Drizzle extra virgin olive oil over the salad.\n
      Squeeze fresh lemon juice over the salad.\n
      Season with salt and black pepper to taste.\n
      Toss everything together gently to combine.\n
      Garnish with fresh parsley leaves.\n
      Serve immediately as a refreshing side dish or light meal.\n
      Enjoy your delicious Greek Salad!\n
      `
    },
    {
      recipe_id: '7',
      user_id: '2',
      title: 'Beef Tacos',
      img_id: 'beef_tacos_image.jpg',
      subreddit_id: 'mexican',
      ingredients: 'Ground beef\nTaco seasoning\nTortillas\nSalsa',
      description: 'Classic beef tacos with seasoned ground beef and all your favorite toppings.',
      cooking_time: "25",
      servings: "4",
      date_posted: this.simulate_RandomDate(),
      cooking_difficulty: 'Easy',
      instructions: `Heat a skillet over medium-high heat.\n
      Add ground beef to the skillet and cook, breaking it apart with a spoon, until browned and cooked through.\n
      Drain excess fat from the skillet.\n
      Add taco seasoning to the cooked beef according to package instructions.\n
      Stir in a small amount of water and simmer for a few minutes until the seasoning is well combined.\n
      Warm soft taco shells in the oven or microwave according to package instructions.\n
      Prepare taco toppings: chop lettuce, dice tomatoes, grate cheese, and slice avocado.\n
      Assemble tacos by spooning the seasoned beef onto the warmed taco shells.\n
      Top with lettuce, tomatoes, cheese, avocado, and any other desired toppings.\n
      Optionally, garnish with fresh cilantro and squeeze lime juice on top.\n
      Serve hot and enjoy your delicious beef tacos!\n
`
    },
    
  ];

  getRecipes(): Recipe[]{
    return this.Recipes_Dummy_List;
  }

  getRecipeById(id: String): Recipe | undefined{
    let item1 = this.Recipes_Dummy_List.find(recipe => recipe.recipe_id === id);
    
    return item1;
  }

  simulate_RandomDate(): Date {
    const now = new Date();
    const randomInterval = Math.floor(Math.random() * 6); // Random number between 0 and 5

    switch (randomInterval) {
        case 0:
            return new Date(now.getTime() - 60000); // 1 minute ago
        case 1:
            return new Date(now.getTime() - (5 * 60000)); // 5 minutes ago
        case 2:
            return new Date(now.getTime() - (60 * 60000)); // 1 hour ago
        case 3:
            return new Date(now.getTime() - (3 * 60 * 60000)); // 3 hours ago
        case 4:
            return new Date(now.getTime() - (24 * 60 * 60000)); // 1 day ago
        case 5:
            return new Date(now.getTime() - (3 * 24 * 60 * 60000)); // 3 days ago
        default:
            return now;
    }
  }
  

}
