const { createCustomer , updateCustomerPasswordToken,resetCustomerPassword, deleteCustomerUsingEmail,getCustomerGroceryList} = require('./customer.js');
const {getMeals,getSuggestedMeals,getMealImages,removeSuggestedMeal,createMealFromSuggestion,addMealSuggestion,updateSuggestedMealItem} = require('./meal');


module.exports ={
    createCustomer,
    updateCustomerPasswordToken,
    resetCustomerPassword,
    deleteCustomerUsingEmail,
    getCustomerGroceryList,
    getMeals,
    getSuggestedMeals,
    getMealImages,
    removeSuggestedMeal,
    createMealFromSuggestion,
    addMealSuggestion,
    updateSuggestedMealItem,
    
}
