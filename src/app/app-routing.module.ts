import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'recipe', component: RecipesComponent, children: [
    {path: '', pathMatch: 'full', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':name/edit', component: RecipeEditComponent},
    {path: ':name', component: RecipeDetailComponent} ,
   ]},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
